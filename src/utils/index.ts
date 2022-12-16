import { Provider } from '@ethersproject/providers';
import { BigNumber, Contract, Signer } from 'ethers';
import { io, Socket } from 'socket.io-client';
import {
	API_BASEURL,
	API_ENDPOINT,
	API_PREFIX,
	CMC_API_KEY,
	REQUIRED_ETH_FOR_BET,
} from '../config/constants/env';
import {
	ChainIDs,
	GameEvent,
	GameEventCallback,
	GameType,
	IGameInfo,
	IGameProposal,
	INFTAsset,
} from '@config/types';
import { getAddress, getContract } from './contracts';
import { CHAINS, NFT_ENDPOINTS } from '@config/constants';

// Temporary Helper to Bypass the NFT API request throttling
let nftPromise: Promise<any> = Promise.resolve();
const requestNFTs = async (account: string, chain: ChainIDs) => {
	nftPromise = nftPromise.then(async () => {
		await delay(1000);
		return fetch(`${NFT_ENDPOINTS[chain]}?owner=${account}`, {
			cache: 'no-store',
			mode: 'cors',
		});
	});
	const res = await nftPromise;
	return res.json();
};

// Temporary Helper function to get the bypass browser caching issue
export const randomCase = (str: string) => {
	const chars = str.split('');
	const randChars = chars.map((char) => {
		const rand = Math.random();
		const upperCase = rand > 0.5;
		if (upperCase) {
			return char.toUpperCase();
		} else {
			return char.toLowerCase();
		}
	});
	return randChars.join('');
};

export const delay = (ms: number = 1000) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const getNFTPrice = async (
	address: string,
	nftId: number,
	chain: ChainIDs
) => {
	try {
		const res = await fetch(`${API_ENDPOINT}/nft/${chain}/${address}/${nftId}`);
		const json = await res.json();
		return BigNumber.from(json?.nftInfo?.price || '0');
	} catch {
		return BigNumber.from('0');
	}
};

export const getAccountNFTs = async (
	account: string,
	chain: ChainIDs
): Promise<INFTAsset[]> => {
	const owner = randomCase(account);
	const data = await requestNFTs(owner, chain);
	const nftsPromises: Promise<INFTAsset>[] =
		data?.assets?.map(async (nft: any) => {
			const tokenId = nft.token_id;
			const tokenAddress = nft.asset_contract.address;
			const ethPrice = await getNFTPrice(tokenAddress, tokenId, chain);
			const asset: INFTAsset = {
				id: nft.id,
				name: nft.name,
				imageUrl: nft.image_url,
				ethPrice,
				tokenAddress,
				tokenId,
			};
			return asset;
		}) || [];
	const nfts = await Promise.all(nftsPromises);
	return nfts;
};

export const getAccountDeposits = async (
	vaultContract: Contract,
	account: string,
	chain: ChainIDs
) => {
	if (!vaultContract.filters.DepositToken) throw 'Contract not supported';

	const allVaultNFTs = await getAccountNFTs(vaultContract.address, chain);
	const promises = allVaultNFTs.map(async (nft) => {
		const userTokens = (await vaultContract.getUserTokenIds(
			account,
			nft.tokenAddress
		)) as BigNumber[];
		const strTokens = userTokens.map((t) => t.toString());
		return strTokens.includes(nft.tokenId) ? nft : null;
	});
	const nfts = (await Promise.all(promises)).filter(
		(nft) => nft
	) as INFTAsset[];

	const totalBalance = (await vaultContract.ethBalance(account)) as BigNumber;

	const lockedBalance = (await vaultContract.lockedEthBalance(
		account
	)) as BigNumber;
	const eth = totalBalance.sub(lockedBalance);
	return { nfts, eth };
};

export const depositAssets = async (
	assets: INFTAsset[],
	eth: BigNumber,
	contract: Contract,
	account: string,
	library: any
) => {
	if (!contract.deposit) throw 'Contract not supported';
	try {
		const signer = library.getSigner();
		const chain = BigNumber.from(library.provider.chainId).toNumber();
		const promises = assets.map(async (asset) => {
			const tokenContract = getContract(
				'token',
				chain,
				signer,
				asset.tokenAddress
			);
			const isApproved = await tokenContract.isApprovedForAll(
				account,
				contract.address
			);
			if (!isApproved) {
				const approved = await tokenContract.setApprovalForAll(
					contract.address,
					true
				);
				return approved;
			}
		});

		await Promise.all(promises);
		const options = {
			from: account,
			value: eth,
			gasLimit: 5000000,
		};

		const res = await contract.deposit(
			assets.map((asset) => asset.tokenAddress),
			assets.map((asset) => asset.tokenId),
			options
		);
		await res.wait();
	} catch {
		throw 'Something went wrong while depositing the NFTs';
	}
};

export const withdrawAssets = async (
	assets: INFTAsset[],
	eth: BigNumber,
	contract: Contract,
	account: string
) => {
	try {
		const options = {
			from: account,
			gasLimit: 5000000,
		};

		const res = await contract.withdraw(
			assets.map((asset) => asset.tokenAddress),
			assets.map((asset) => asset.tokenId),
			eth,
			options
		);
		await res.wait();
	} catch {
		throw 'Something went wrong while withdrawing the NFTs';
	}
};

export const createGame = async (
	assets: INFTAsset[],
	eth: BigNumber,
	account: string,
	library: any,
	type = GameType.DICE
): Promise<IGameInfo> => {
	const signer = library.getSigner();
	const chain = BigNumber.from(library.provider.chainId).toNumber();
	const nftAssets = assets.map(({ tokenAddress, tokenId }) => ({
		tokenAddress,
		tokenId,
	}));
	const createGameApiData = {
		gameName: type,
		gameAddress: getAddress(
			type === GameType.DICE ? 'diceGame' : 'chessGame',
			chain
		),
		user: account,
		chainId: chain,
		bet: {
			type: 'nft_eth',
			ethAmount: eth.lt(REQUIRED_ETH_FOR_BET)
				? REQUIRED_ETH_FOR_BET
				: eth.toString(),
			nftAssets,
		},
	};
	const reqData = JSON.stringify(createGameApiData);
	const signature = await signer.signMessage(reqData);

	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', signature },
		body: reqData,
	};

	const res = await fetch(`${API_ENDPOINT}/games`, options);
	const data = await res.json();
	return data.gameInfo;
};

export const deleteGame = async (
	gameId: string,
	signer: Signer
): Promise<void> => {
	const url = `games/${gameId}`;
	const signature = await signer.signMessage(`DELETE /${API_PREFIX}/${url}`);

	const options = {
		method: 'DELETE',
		headers: { signature },
	};

	await fetch(`${API_ENDPOINT}/${url}`, options);
};

export const getGame = async (gameId: string): Promise<IGameInfo> => {
	const res = await fetch(`${API_ENDPOINT}/games/${gameId}`);
	const data = await res.json();
	return data.gameInfo;
};

export const startGame = async (
	gameId: string,
	user: string,
	signer: Signer
) => {
	const url = `games/${gameId}/actions/start`;
	const signature = await signer.signMessage(`POST /${API_PREFIX}/${url}`);

	const options = {
		method: 'POST',
		headers: { signature },
	};

	try {
		const res = await fetch(`${API_ENDPOINT}/${url}`, options);

		const data = await res.json();
		return data.gameInfo;
	} catch (e) {
		throw 'Something went wrong while starting the game';
	}
};

export const acceptGame = async (
	gameId: string,
	proposalId: string,
	signer: Signer
): Promise<IGameInfo> => {
	const url = `games/${gameId}/proposals/${proposalId}/approve`;
	const signature = await signer.signMessage(`PUT /api/v1/${url}`);

	const options = {
		method: 'PUT',
		headers: { signature },
	};

	const res = await fetch(`${API_ENDPOINT}/${url}`, options);
	const data = await res.json();
	return data.gameInfo;
};

export const declineGame = async (
	gameId: string,
	proposalId: string,
	signer: Signer
): Promise<IGameInfo> => {
	const url = `games/${gameId}/proposals/${proposalId}/reject`;
	const signature = await signer.signMessage(`PUT /api/v1/${url}`);

	const options = {
		method: 'PUT',
		headers: { signature },
	};

	const res = await fetch(`${API_ENDPOINT}/${url}`, options);
	const data = await res.json();
	return data.gameInfo;
};

export const getGameProposals = async (
	gameId: string
): Promise<IGameProposal[]> => {
	const res = await fetch(`${API_ENDPOINT}/games/${gameId}/proposals`);
	const data = await res.json();
	return data.proposals;
};

export const getGamesList = async (
	type = GameType.DICE
): Promise<IGameInfo[]> => {
	const res = await fetch(`${API_ENDPOINT}/games`);
	const data = await res.json();
	const games = data.games as IGameInfo[];
	const filteredGames = games.filter((game) => game.name === type);
	const createdGames = filteredGames.filter(
		(game) => game.status === 'created'
	);
	const activeGame = filteredGames.filter((game) => game.status === 'active');
	const finishedGame = filteredGames.filter(
		(game) => game.status === 'finished'
	);

	return [...createdGames, ...activeGame, ...finishedGame];
};

export const submitProposal = async (
	assets: INFTAsset[],
	eth: BigNumber,
	gameId: string,
	account: string,
	signer: Signer,
	type = GameType.DICE
) => {
	const nftAssets = assets.map(({ tokenAddress, tokenId }) => ({
		tokenAddress,
		tokenId,
	}));

	const createProposalApiData = {
		gameName: type,
		user: account,
		bet: {
			type: 'nft_eth',
			ethAmount: eth.lt(REQUIRED_ETH_FOR_BET)
				? REQUIRED_ETH_FOR_BET
				: eth.toString(),
			nftAssets,
		},
	};
	const reqData = JSON.stringify(createProposalApiData);
	const signature = await signer.signMessage(reqData);

	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', signature },
		body: reqData,
	};

	const res = await fetch(`${API_ENDPOINT}/games/${gameId}/proposals`, options);
	if (!res.ok) throw 'Asset(s) Locked';
	const data = await res.json();
	return data.gameInfo;
};

export const onGameEvent = (
	socket: Socket,
	eventType: GameEvent,
	onEvent: GameEventCallback
) => {
	socket.on(eventType, onEvent);
};

let socket: Socket;
export const getWebSocket = (): Socket => {
	if (socket) return socket;
	return (socket = io(API_BASEURL, { query: { token: 'socket-server' } }));
};

export const getChessSocket = async (
	gameId: string,
	signer?: Signer
): Promise<Socket> => {
	const message = `Join ${gameId}`;
	const signature = signer ? await signer.signMessage(message) : undefined;
	return io(API_BASEURL, {
		path: '/chess',
		auth: { signature },
		query: { gameId },
	});
};

/* Get My history */
export const getAccountHistory = async (
	account: string
): Promise<IGameInfo[]> => {
	const res = await fetch(`${API_ENDPOINT}/games?userIsParticipant=${account}`);
	const data = await res.json();
	const games = data.games as IGameInfo[];
	const filteredGames = games.filter((game) => game.status === 'finished');
	return filteredGames;
};

export const getAccountBalance = async (
	provider: Provider,
	account: string
): Promise<BigNumber> => {
	return provider.getBalance(account);
};

export const getETHPrice = async (): Promise<number> => {
	const res = await fetch(`${API_ENDPOINT}/prices/eth/usd`);
	const json = await res.json();
	return json.price;
};

export const getOnlineUsers = async (): Promise<number> => {
	const res = await fetch(`${API_ENDPOINT}/users/online/count`);
	const data = await res.json();
	return data.userCount;
};

export const setupNetwork = async (chainId: ChainIDs, provider: any) => {
	try {
		await provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: CHAINS[chainId].chainId }],
		});
		return true;
	} catch {
		try {
			await provider.request({
				method: 'wallet_addEthereumChain',
				params: [CHAINS[chainId]],
			});
			return true;
		} catch (error) {
			console.error('Failed to setup the chain:', error);
		}
	}
};
