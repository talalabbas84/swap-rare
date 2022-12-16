import { useChessGame } from '@hooks';
import { ChessPiece } from '@components';
import { ChessColor } from '@config/types';

interface IProps {
	color: ChessColor;
}

export const CapturedPieces: React.FC<IProps> = ({ color }) => {
	const { game, players } = useChessGame();
	const player = players?.[color];
	const capturedPieces = game.get_captured_pieces(color);
	return (
		<div className='flex flex-row w-full h-full justify-center items-center p-2 text-white'>
			{capturedPieces.map((piece, idx) => (
				<div key={idx} className='relative w-[20px] h-[20px] px-3'>
					<ChessPiece piece={piece} color={player?.color === 'b' ? 'w' : 'b'} />
				</div>
			))}
		</div>
	);
};

export default CapturedPieces;
