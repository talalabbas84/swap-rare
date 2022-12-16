import { WalletTypes } from '@config/constants/wallets';
import { AbstractConnector } from '@web3-react/abstract-connector';
import addresses from '@config/constants/contracts';
import { BigNumber, BigNumberish, Contract } from 'ethers';
import { PieceType, ShortMove, Square } from 'chess.js';
import { ExtendedChess } from '@utils/chess';
import { RefObject } from 'react';

export enum ChainIDs {
	ETHEREUM = 1,
	RINKEBY = 4,
}

export enum GameType {
	CHESS = 'chess',
	DICE = 'dice',
}

export enum GameStatusType {
	CREATED = 'created',
	ACTIVE = 'active',
	FINISHED = 'finished',
}

export type Contracts = keyof typeof addresses | 'token';

export type ChessColor = 'w' | 'b';

export interface INFTAssetInfo {
	tokenAddress: string;
	tokenId: string;
	imageUrl: string;
}
export interface INFTAsset extends INFTAssetInfo {
	id: number;
	name: string;
	ethPrice: BigNumber;
}
export interface IWallet {
	connector: AbstractConnector;
	name: string;
	logoSrc: string;
	description: string;
	color: string;
}

export type IGameEventsContext = {
	add: {
		[key in GameEventNames]: (callBack: GameEventCallback) => void;
	};
	remove: {
		[key in GameEventNames]: (callBack: GameEventCallback) => void;
	};
};

export interface IWalletContext {
	connect: (type: WalletTypes | IWallet) => Promise<void>;
	disconnect: () => void;
	active: boolean;
	library?: any;
	chain?: ChainIDs;
	account?: string | null;
	loading: boolean;
	current?: IWallet;
	nfts: INFTAsset[];
	updateNFTs: (assets: INFTAsset[]) => void;
	updateBalance: (balance: BigNumber) => void;
	refreshBalance: () => Promise<void>;
	balance: BigNumber;
	ethPrice: number;
	ethToUSD: (amount: BigNumberish) => string;
}

export interface IBalanceContext {
	nfts: INFTAsset[];
	eth: BigNumber;
	loading: boolean;
	fetch: () => Promise<void>;
	deposit: (assets: INFTAsset[], eth: BigNumber) => Promise<void>;
	withdraw: (assets: INFTAsset[], eth: BigNumber) => Promise<void>;
}

export interface IGamesListContext {
	games: IGameInfo[];
	fetch: () => Promise<void>;
}

export type IContractsContext = {
	[key in Contracts]: Contract;
};

export type IContractAddress = {
	[key in ChainIDs]: string;
};

export interface INFTAssetWithSelect extends INFTAsset {
	selected: boolean;
}

export interface IUseETHSelection {
	eth: BigNumber;
	ethSelected: boolean;
	toggleETHSelection: (value?: boolean) => void;
	changeETH: (value: BigNumber) => void;
}

export interface IUseNFTSelection {
	nfts: INFTAssetWithSelect[];
	allNFTsSelected: boolean;
	toggleNFTSelection: (nft: INFTAsset, value?: boolean) => void;
	toggleNFTAllSelection: (value?: boolean) => void;
	selectedNFTs: INFTAsset[];
}

export interface IBalanceSelectionContext
	extends IUseETHSelection,
		IUseNFTSelection {
	allSelected: boolean;
	toggleAllSelection: () => void;
}

export interface IGameContext {
	game?: IGameInfo;
	bets: IBet[];
	proposals: IBet[];
	loading: boolean;
	updateGame: (game: IGameInfo) => void;
	fetch: () => Promise<void>;
}

export interface IBetInfo {
	id: string;
	type: string;
	ethAmount: string;
	nftAssets: INFTAssetInfo[];
}

export interface IBet extends IBetInfo {
	rolls?: number[];
	player: string;
	isHost?: boolean;
}

export interface IGameInfo {
	id: string;
	name: GameType;
	status: GameStatusType;
	createdAt: string;
	player1: string;
	player2?: string;
	finishedAt?: string;
	winner?: string;
	loser?: string;
	selectedProposal?: string;
	result: number[];
	bets: {
		player1: IBetInfo;
		player2?: IBetInfo;
	};
	scData: {
		signature: string;
		requestConfirmations: number;
		callbackGasLimit: number;
		nonce: number;
	};
}

export interface IGameProposal {
	id: string;
	user: string;
	status: string;
	createdAt: string;
	bet: IBetInfo;
}

export enum GameEvent {
	proposalCreated = 'proposalCreated',
	proposalRejected = 'proposalRejected',
	proposalApproved = 'proposalApproved',
	gameCreated = 'gameCreated',
	gameFinished = 'gameFinished',
	gameDeleted = 'gameDeleted',
	gameStarted = 'gameStarted',
}

export type GameEventNames = keyof typeof GameEvent;

export interface IGameEventData {
	eventName: GameEvent;
	gameId?: string;
	gameInfo?: IGameInfo;
	proposalInfo?: { _doc: IGameProposal; id: string };
}

export type GameEventCallback = (data: IGameEventData) => void;

export type NavItemType = {
	url: string;
	title?: string;
	icon?: string;
	label?: string;
};

export type ChatMessageType = {
	avatarSrc: string;
	name: string;
	message: string;
	label?: string;
	labelColor?: string;
	time: string;
};

export const enum ToastTypes {
	Success = 'success',
	Error = 'error',
	Info = 'info',
}

export interface IToast {
	id: string;
	type: ToastTypes;
	message: string;
}

export interface IToastContext {
	error: (message: string) => void;
	success: (message: string) => void;
	info: (message: string) => void;
	clear: () => void;
	addToast: (message: string, type?: ToastTypes) => void;
}

export interface ICurrency {
	symbol: string;
	name: string;
	decimals: number;
}

export interface IChain {
	chainId: string;
	chainName: string;
	rpcUrls: string[];
}

export interface BoardSquare {
	type?: PieceType;
	color?: ChessColor;
	square: Square;
	tile: 'dark' | 'light';
}

export interface Player {
	address: string;
	color: ChessColor;
	timeRemaining: number;
	totalTime: number;
}

export interface MoveEventData {
	move: ShortMove;
	players: Player[];
}

export interface IChessGameContext {
	gameId?: string;
	game: ExtendedChess;
	board: BoardSquare[];
	possibleSquares: Square[];
	selectSquare: (square: Square, elem?: HTMLElement | null) => void;
	selectedSquare?: Square;
	playerColor?: ChessColor;
	pieceRef: RefObject<HTMLDivElement>;
	players?: Record<ChessColor, Player>;
	status: 'active' | 'finished';
}
