import { ChessPiece, LoaderCountDown, ModalHeader } from '@components';
import {
	IChessGameContext,
	MoveEventData,
	Player,
	ChessColor,
	GameStatusType,
} from '@config/types';
import { useBalance, useGame, useStartGame, useWallet } from '@hooks';
import { getChessSocket } from '@utils';
import { ExtendedChess, getDistance } from '@utils/chess';
import { Move, Square, SQUARES } from 'chess.js';
import {
	createContext,
	PropsWithChildren,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Socket } from 'socket.io-client';
import Modal from 'react-modal';
import { modalStyles } from '@utils/cx';

export const ChessGameContext = createContext<IChessGameContext | null>(null);

interface IProps extends PropsWithChildren {
	gameId?: string;
}

export const ChessGameProvider: React.FC<IProps> = ({ children, gameId }) => {
	const { fetch } = useBalance();
	const [game, setGame] = useState(new ExtendedChess());
	const { game: gameInfo } = useGame();
	const { start } = useStartGame();
	const [status, setStatus] = useState<'active' | 'finished'>('active');
	const [winner, setWinner] = useState<Player>();
	const [showModal, setShowModal] = useState(true);
	const { account, library } = useWallet();
	const [legalMoves, setLegalMoves] = useState<Move[]>([]);
	const [selectedSquare, setSelectedSquare] = useState<Square>();
	const [players, setPlayers] = useState<Record<ChessColor, Player>>();
	const pieceRef = useRef<HTMLDivElement>(null);
	const [playerColor, setPlayerColor] = useState<ChessColor>('w');
	const socketRef = useRef<Socket>();

	const isPlayer =
		account &&
		gameInfo?.status !== GameStatusType.FINISHED &&
		(gameInfo?.player1 === account || gameInfo?.player2 === account);

	useEffect(() => {
		if (!window || !gameInfo?.id) return;
		const setupSocket = async () => {
			socketRef.current?.disconnect();
			const signer = library?.getSigner();
			socketRef.current = await getChessSocket(
				gameInfo.id,
				isPlayer ? signer : undefined
			);

			socketRef.current.on('state', (data) => {
				const color =
					isPlayer && data.players.b.address === account ? 'b' : 'w';
				game.load_pgn(data.pgn);
				setPlayers(data.players);
				setPlayerColor(color);
				setGame({ ...game });
			});

			socketRef.current.on('move', (event: MoveEventData) => {
				game.move(event.move);
				setGame({ ...game });
			});

			socketRef.current.on('end', (data) => {
				fetch();
				setStatus('finished');
				setWinner(data.winner);
			});
		};
		setupSocket();
		return () => {
			socketRef.current?.disconnect();
		};
	}, [account, isPlayer, library, gameInfo?.id]);

	const board = useMemo(
		() =>
			game
				.board()
				.flat()
				.map((square, idx) => ({
					type: square?.type,
					square: SQUARES[idx],
					color: square?.color,
					tile: game.square_color(SQUARES[idx]),
					selected: SQUARES[idx] === selectedSquare,
				})),
		[game, selectedSquare]
	);
	const possibleSquares = useMemo(
		() => legalMoves.map((move) => move.to),
		[legalMoves]
	);

	const selectSquare = (square: Square, elem?: HTMLElement | null) => {
		if (!isPlayer) return;
		const move = legalMoves.find((move) => move.to === square);
		if (move) {
			socketRef.current?.emit('move', move);
			if (elem) {
				let { x, y } = getDistance(move.from, move.to);
				if (playerColor === 'b') y = -y;
				else x = -x;
				const transform = `translate(${x}px, ${y}px)`;
				// elem.animate([{ transform }, { transform: 'translate(0, 0)' }], {
				// 	duration: 300,
				// 	easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
				// });
			}
			setGame({ ...game });
			setLegalMoves([]);
			setSelectedSquare(undefined);
		} else {
			const newMoves = game.moves({ square, verbose: true });
			newMoves.length && setSelectedSquare(square);
			setLegalMoves(newMoves);
		}
	};

	const onCloseModal = () => setShowModal(false);

	const piece = selectedSquare && game.get(selectedSquare);

	const value = {
		gameId,
		game,
		board,
		possibleSquares,
		selectSquare,
		selectedSquare,
		playerColor,
		pieceRef,
		players,
		status,
	};

	return (
		<ChessGameContext.Provider value={value}>
			{children}
			{isPlayer && gameInfo?.status === GameStatusType.ACTIVE && (
				<LoaderCountDown
					countdown={10}
					onFinish={() => gameInfo.player1 === account && start()}
					text='Verify Identity by signing the message in MetaMask'
					endedText='Starting Game...'
				/>
			)}
			<Modal
				isOpen={showModal && status === 'finished'}
				style={modalStyles}
				onRequestClose={onCloseModal}
			>
				<div className='w-full text-white mx-auto sm:w-[500px] rounded-[20px] overflow-hidden border border-dark-border-soft bg-dark-medium p-[23px] flex flex-col max-h-[90vh]'>
					<ModalHeader
						title='Game Over'
						onClose={onCloseModal}
						className='shrink-0'
					/>
					<p>
						{winner
							? isPlayer
								? account === winner.address
									? 'You Win'
									: 'You Lose'
								: `${winner.color === 'b' ? 'Black' : 'White'} Won`
							: 'Its a draw'}
					</p>
				</div>
			</Modal>
			{piece && (
				<div
					className='fixed w-[35px] h-[35px] transition-transform pointer-events-none hidden'
					ref={pieceRef}
				>
					<ChessPiece piece={piece.type} color={piece.color} />
				</div>
			)}
		</ChessGameContext.Provider>
	);
};
