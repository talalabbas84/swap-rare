import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { IWallet } from '@config/types';
import { CHAINS } from './chains';

const RPC = '';
const supportedChainIds = Object.keys(CHAINS).map((key) => +key);

export const injected = new InjectedConnector({
	supportedChainIds,
});

export const walletconnect = new WalletLinkConnector({
	url: RPC,
	appName: 'rareround',
	supportedChainIds,
});

export const walletLink = new WalletLinkConnector({
	url: RPC,
	appName: 'rareround',
	supportedChainIds,
});

export const fortmatic = new WalletLinkConnector({
	url: RPC,
	appName: 'rareround',
	supportedChainIds,
});

export const enum WalletTypes {
	Metamask,
	Walletconnect,
	WalletLink,
	Fortmatic,
}

export const WALLETS: { [key in WalletTypes]: IWallet } = {
	[WalletTypes.Metamask]: {
		connector: injected,
		name: 'Metamask',
		logoSrc: '/images/metamask.png',
		description: 'Easy-to-use browser extension.',
		color: '#E8831D',
	},
	[WalletTypes.Walletconnect]: {
		connector: walletconnect,
		name: 'WalletConnect',
		logoSrc: '/images/walletconnect.svg',
		description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
		color: '#4196FC',
	},
	[WalletTypes.WalletLink]: {
		connector: walletLink,
		name: 'Coinbase Wallet',
		logoSrc: '/images/coinbase-wallet.png',
		description: 'Use Coinbase Wallet app on mobile device',
		color: '#315CF5',
	},
	[WalletTypes.Fortmatic]: {
		connector: fortmatic,
		name: 'Fortmatic',
		logoSrc: '/images/fortmatic.svg',
		description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
		color: '#4196FC',
	},
};

export default WALLETS;
