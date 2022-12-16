import {
	createContext,
	PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { depositAssets, getAccountDeposits, withdrawAssets } from '@utils';
import { IBalanceContext, IGameEventData, INFTAsset } from '@config/types';
import { useContracts, useGameEvents, useWallet } from '@hooks';
import { BigNumber } from 'ethers';
import { MINIMUM_ETH_BET } from '@config/constants/env';

export const BalanceContext = createContext<IBalanceContext | null>(null);

export const BalanceProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const {
		account,
		library,
		chain,
		updateBalance,
		updateNFTs,
		balance,
		nfts: walletNFTs,
		refreshBalance,
	} = useWallet();
	const gameEvents = useGameEvents();
	const { vault } = useContracts();
	const [loading, setLoading] = useState(true);
	const [nfts, setNFTs] = useState<INFTAsset[]>([]);
	const [eth, setETH] = useState<BigNumber>(BigNumber.from(0));

	const fetch = useCallback(async () => {
		if (!account || chain === undefined) {
			setNFTs([]);
			setETH(BigNumber.from(0));
		} else {
			try {
				setLoading(true);
				await getAccountDeposits(vault, account, chain).then(
					({ nfts: newNFTs, eth: newEth }) => {
						setNFTs(newNFTs);
						setETH(newEth);
					}
				);
			} catch {
				setNFTs([]);
				setETH(BigNumber.from(0));
			} finally {
				setLoading(false);
			}
		}
	}, [account, vault, chain]);

	const finished = useCallback(
		(data: IGameEventData) =>
			(data.gameInfo?.player1 === account ||
				data.gameInfo?.player2 === account) &&
			fetch(),
		[account, fetch]
	);

	const oldFinised = useRef(finished);

	useEffect(() => {
		if (!account) return;
		fetch();
		gameEvents.remove.gameFinished(oldFinised.current);
		gameEvents.add.gameFinished(finished);
		oldFinised.current = finished;
	}, [account, fetch, finished, gameEvents]);

	const deposit = useCallback(
		async (assets: INFTAsset[], eth: BigNumber) => {
			if (account && library) {
				await depositAssets(assets, eth, vault, account, library);
				setNFTs((prev) => [...prev, ...assets]);
				setETH((prev) => prev.add(eth));
				updateNFTs(
					walletNFTs.filter(
						(nft) => !assets.some((asset) => asset.id === nft.id)
					)
				);
				updateBalance(balance.sub(eth));
				refreshBalance();
			}
		},
		[
			account,
			balance,
			library,
			refreshBalance,
			updateBalance,
			updateNFTs,
			vault,
			walletNFTs,
		]
	);

	const withdraw = useCallback(
		async (assets: INFTAsset[], eth: BigNumber) => {
			if (account) {
				await withdrawAssets(assets, eth, vault, account);
				setNFTs((prev) =>
					prev.filter((nft) => !assets.some((a) => a.id === nft.id))
				);
				setETH((prev) => prev.sub(eth));
				updateBalance(balance.add(eth));
				updateNFTs([...walletNFTs, ...assets]);
				refreshBalance();
			}
		},
		[
			account,
			balance,
			refreshBalance,
			updateBalance,
			updateNFTs,
			vault,
			walletNFTs,
		]
	);

	const value = {
		loading,
		nfts,
		deposit,
		withdraw,
		fetch,
		eth: eth.lt(MINIMUM_ETH_BET) ? BigNumber.from(0) : eth,
	};

	return (
		<BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
	);
};

export default BalanceProvider;
