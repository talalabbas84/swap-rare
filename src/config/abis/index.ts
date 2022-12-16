import vault from './Vault.json';
import diceGame from './DiceGame.json';
import chessGame from './ChessGame.json';
import token from './Token.json';
import { ContractInterface } from 'ethers';
import { Contracts } from '@config/types';

type ABIs = {
	[key in Contracts]: ContractInterface;
};

const abis: ABIs = { token, vault, diceGame, chessGame };

export default abis;
