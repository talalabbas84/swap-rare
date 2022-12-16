import { ChainIDs, IChain } from '@config/types';

export const CHAINS: { [chain in ChainIDs]: IChain } = {
	[ChainIDs.ETHEREUM]: {
		chainId: '0x1',
		chainName: 'Etherium Mainnet',
		rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
	},
	[ChainIDs.RINKEBY]: {
		chainId: '0x4',
		chainName: 'Rinkeby Testnet',
		rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
	},
};

export const NFT_ENDPOINTS = {
	[ChainIDs.ETHEREUM]: 'https://api.opensea.io/api/v1/assets',
	[ChainIDs.RINKEBY]: 'https://testnets-api.opensea.io/api/v1/assets',
};
