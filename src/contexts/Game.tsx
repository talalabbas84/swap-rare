import {
	createContext,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useGameEvents, useToasts, useWallet } from '@hooks';
import {
	IGameContext,
	IGameEventData,
	IGameInfo,
	IGameProposal,
} from '@config/types';
import { getGame, getGameProposals } from '@utils';

export const GameContext = createContext<IGameContext | null>(null);

interface IProps extends PropsWithChildren {
	gameId?: string;
}

export const GameProvider: React.FC<IProps> = ({ children, gameId }) => {
	const gameEvents = useGameEvents();
	const [loading, setLoading] = useState(false);
	const { account } = useWallet();
	const [game, updateGame] = useState<IGameInfo | undefined>();
	const [proposals, setProposals] = useState<IGameProposal[]>([]);
	const { error, info } = useToasts();

	const fetch = useCallback(async () => {
		if (!gameId) return;
		setLoading(true);
		const gamePromise = getGame(gameId).then(updateGame);
		const proposalsPromise = getGameProposals(gameId).then(setProposals);
		await Promise.all([gamePromise, proposalsPromise]);
		setLoading(false);
	}, [gameId]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	const finished = useCallback(
		(data: IGameEventData) => updateGame(data.gameInfo!),
		[]
	);
	const created = useCallback(
		(data: IGameEventData) => {
			if (data.gameId === gameId && account) {
				setProposals((prev) => [
					...prev,
					{ ...data.proposalInfo?._doc!, id: data.proposalInfo?.id! },
				]);
				if (data.proposalInfo?._doc.user !== account) {
					info('You received a request from Cryptopathic');
				}
			}
		},
		[account, gameId, info]
	);
	const approved = useCallback(
		(data: IGameEventData) => {
			if (data.gameInfo!.id === gameId && account) {
				updateGame(data.gameInfo!);
				setProposals((prev) =>
					prev.filter((p) => p.id !== data.gameInfo!.selectedProposal)
				);
				if (data.gameInfo!.player2 === account) {
					info('Your request has been accepted, get ready!');
				}
			}
		},
		[account, gameId, info]
	);
	const started = useCallback(
		(data: IGameEventData) => {
			if (data.gameInfo!.id === gameId && account) {
				updateGame(data.gameInfo!);
				info('Game Started!');
				
			}
		},
		[account, gameId, info]
	);
	const rejected = useCallback(
		(data: IGameEventData) => {
			if (data.gameInfo!.id === gameId && account) {
				setProposals((prev) =>
					prev.filter((p) => p.id !== data.proposalInfo!.id)
				);
				if (data.proposalInfo?._doc.user !== account) {
					error('Sorry, your request was denied :(');
				}
			}
		},
		[account, error, gameId]
	);

	const oldCreated = useRef(created);
	const oldApproved = useRef(approved);
	const oldRejected = useRef(rejected);
	const oldStarted = useRef(started);

	useEffect(() => {
		if (!account) return;
		gameEvents.remove.gameFinished(finished);
		gameEvents.remove.proposalCreated(oldCreated.current);
		gameEvents.remove.proposalApproved(oldApproved.current);
		gameEvents.remove.proposalRejected(oldRejected.current);
		gameEvents.remove.gameStarted(oldStarted.current);

		gameEvents.add.gameFinished(finished);
		gameEvents.add.proposalCreated(created);
		gameEvents.add.proposalApproved(approved);
		gameEvents.add.proposalRejected(rejected);
		gameEvents.remove.gameStarted(started);

		oldCreated.current = created;
		oldApproved.current = approved;
		oldRejected.current = rejected;
		oldStarted.current = started;
	}, [
		gameId,
		gameEvents,
		account,
		info,
		error,
		finished,
		created,
		approved,
		rejected,
	]);

	const result = useMemo(() => {
		if (!game)
			return { game, proposals: [], bets: [], loading, fetch, updateGame };
		return {
			game,
			bets: Object.entries(game.bets).map(([key, bet]) => ({
				...bet,
				player: game[key as keyof IGameInfo] as string,
				rolls: game.result
					? key === 'player1'
						? game.result.filter((_, index) => !(index % 2))
						: game.result.filter((_, index) => index % 2)
					: undefined,
				isHost: key === 'player1',
			})),
			proposals: proposals
				.filter((proposal) => proposal.status === 'pending')
				.map((p) => ({ ...p.bet, player: p.user, id: p.id })),
			updateGame: updateGame,
			fetch,
			loading,
		};
	}, [fetch, game, loading, proposals]);
	return <GameContext.Provider value={result}>{children}</GameContext.Provider>;
};

export default GameProvider;
