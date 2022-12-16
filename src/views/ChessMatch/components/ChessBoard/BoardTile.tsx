import { BoardSquare } from '@config/types';
import { useChessGame } from '@hooks';
import { ChessPiece } from '@components';
import { usePieceDrag } from '../../hooks';

interface IProps {
	square: BoardSquare;
	scale: number;
}

export const BoardTile: React.FC<IProps> = ({ square, scale }) => {
	const { possibleSquares, selectSquare, selectedSquare, game } =
		useChessGame();
	const { tile, type, color } = square;
	const highlight = possibleSquares.includes(square.square);
	const selected = selectedSquare === square.square;
	const { ref, containerRef, ...divProps } = usePieceDrag(
		square,
		scale,
		highlight
	);
	const colorVariant = tile === 'dark' ? 'medium' : 'soft';
	return (
		<div
			className={`flex justify-center items-center bg-dark-${colorVariant}${
				selected ? ' rounded-lg border-4 border-blue' : ''
			}`}
			style={{
				width: '50px',
				height: '50px',
				cursor: type || highlight ? 'pointer' : 'default',
			}}
			onClick={() => selectSquare(square.square, ref.current)}
			draggable={game.turn() === color}
			ref={containerRef}
			{...divProps}
		>
			<div
				className='relative w-[35px] h-[35px] transition-transform'
				ref={ref}
			>
				{highlight && (
					<div
						className='absolute bg-red top-0 bottom-0 left-0 right-0 m-[35%] rounded-full z-10'
						style={{ background: 'rgba(32, 114, 229, 0.5)' }}
					/>
				)}
				<ChessPiece piece={type} color={color} />
			</div>
		</div>
	);
};

export default BoardTile;
