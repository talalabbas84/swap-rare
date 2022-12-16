import { ChainIDs, Contracts, IContractAddress } from '@config/types';

const vault: IContractAddress = {
	[ChainIDs.ETHEREUM]: '0xE71074e1F97a1188692765ff4013bA5d9D7EF310',
	[ChainIDs.RINKEBY]: '0xE71074e1F97a1188692765ff4013bA5d9D7EF310',
};

const diceGame: IContractAddress = {
	[ChainIDs.ETHEREUM]: '0x19B4c26C3c3C000b0dFc2Ee681Fb96bd371a3AEF',
	[ChainIDs.RINKEBY]: '0x19B4c26C3c3C000b0dFc2Ee681Fb96bd371a3AEF',
};

const chessGame: IContractAddress = {
	[ChainIDs.ETHEREUM]: '0x5903eecECb220a3b4CeC2939022f0191b4F1575E',
	[ChainIDs.RINKEBY]: '0x5903eecECb220a3b4CeC2939022f0191b4F1575E',
};

export const addresses = {
	vault,
	diceGame,
	chessGame,
} as const;

export const ALL_CONTRACTS = Object.freeze(
	Object.keys(addresses)
) as Contracts[];

export default addresses;
