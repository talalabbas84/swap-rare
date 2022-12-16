import { ChainIDs, Contracts, IContractAddress } from '@config/types';

const vault: IContractAddress = {
  [ChainIDs.ETHEREUM]: '',
  [ChainIDs.RINKEBY]: ''
};

const diceGame: IContractAddress = {
  [ChainIDs.ETHEREUM]: '',
  [ChainIDs.RINKEBY]: ''
};

const chessGame: IContractAddress = {
  [ChainIDs.ETHEREUM]: '',
  [ChainIDs.RINKEBY]: ''
};

export const addresses = {
  vault,
  diceGame,
  chessGame
} as const;

export const ALL_CONTRACTS = Object.freeze(
  Object.keys(addresses)
) as Contracts[];

export default addresses;
