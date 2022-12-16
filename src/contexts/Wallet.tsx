import {
	createContext,
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { useWeb3React } from '@web3-react/core';
import { ChainIDs, INFTAsset, IWallet, IWalletContext } from '@config/types';
import { WalletTypes, WALLETS } from '@config/constants';
import { getAccountBalance, getAccountNFTs, getETHPrice } from '@utils';
import { BigNumber, BigNumberish } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { formatEther } from 'ethers/lib/utils';

export const WalletContext = createContext<IWalletContext | null>(null);

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { activate, account, active, deactivate, library, chainId } =
		useWeb3React();
	const [wasDisconnected, setWasDisconnected] = useState(true);
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState<IWallet | undefined>(undefined);
	const [nfts, setNFTs] = useState<INFTAsset[]>([]);
	const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
	const [ethPrice, setEthPrice] = useState<number>(0);
	const [chain, setChain] = useState<ChainIDs>();

	const ethToUSD = useCallback(
		(eth: BigNumberish) =>
			ethPrice ? (+formatEther(eth) * ethPrice).toFixed(2) : 'NA',
		[ethPrice]
	);

	const disconnect = useCallback(() => {
		deactivate();
		localStorage.setItem('wasDisconnected', 'true');
		setWasDisconnected(true);
		setCurrent(undefined);
	}, [deactivate]);

	const connect = useCallback(
		async (type: WalletTypes | IWallet) => {
			const wallet = typeof type === 'number' ? WALLETS[type] : type;
			setLoading(true);
			setCurrent(wallet);
			try {
				await activate(wallet.connector, undefined, true);
				localStorage.setItem('wasDisconnected', 'false');
			} catch (error) {
				setCurrent(undefined);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[activate]
	);

	const fetch = useCallback(async () => {
		if (!account || chain === undefined) {
			setBalance(BigNumber.from(0));
			setNFTs([]);
		} else {
			try {
				setLoading(true);
				const nfts = await getAccountNFTs(account, chain);
				const balance = await getAccountBalance(library, account);
				setNFTs(nfts);
				setBalance(balance);
			} catch {
				setBalance(BigNumber.from(0));
				setNFTs([]);
			} finally {
				setLoading(false);
			}
		}
	}, [account, library, chain]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	useEffect(() => {
		if (library) {
			setChain(BigNumber.from(chainId ?? library.provider.chainId).toNumber());
		} else {
			setChain(undefined);
		}
	}, [library, chainId]);

	useEffect(() => {
		getETHPrice().then(setEthPrice);
		setWasDisconnected(localStorage.getItem('wasDisconnected') === 'true');
	}, []);

	useEffect(() => {
		if (!(active || wasDisconnected)) {
			(WALLETS[WalletTypes.Metamask].connector as InjectedConnector)
				.isAuthorized()
				.then((isAuthorized) => {
					isAuthorized
						? connect(WalletTypes.Metamask).catch(() => {})
						: setCurrent(undefined);
				});
		}
	}, [active, connect, wasDisconnected]);

	const updateNFTs = useCallback((assets: INFTAsset[]) => setNFTs(assets), []);

	const updateBalance = useCallback(
		(balance: BigNumber) => setBalance(balance),
		[]
	);

	const refreshBalance = useCallback(async () => {
		if (!(account && library)) setBalance(BigNumber.from(0));
		else {
			try {
				const balance = await getAccountBalance(library, account);
				setBalance(balance);
			} catch {
				setBalance(BigNumber.from(0));
			}
		}
	}, [account, library]);

	const value = {
		account,
		active,
		connect,
		disconnect,
		loading,
		current,
		nfts,
		updateNFTs,
		updateBalance,
		balance,
		ethPrice,
		ethToUSD,
		chain,
		library,
		refreshBalance,
	};
	return (
		<WalletContext.Provider value={value}>{children}</WalletContext.Provider>
	);
};

export default WalletProvider;
