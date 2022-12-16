import { ChessColor } from '@config/types';
import { PieceType } from 'chess.js';
import Image from 'next/image';

interface IProps {
	piece?: PieceType;
	color?: ChessColor;
}

export const ChessPiece: React.FC<IProps> = ({ piece, color }) => {
	const filter =
		color === 'b'
			? 'invert(49%) sepia(73%) saturate(221%) hue-rotate(193deg) brightness(84%) contrast(87%)'
			: undefined;
	return piece ? (
		<Image
			src={`/images/chess/pieces/${piece}.svg`}
			layout='fill'
			alt={piece}
			style={{
				filter,
			}}
			draggable={false}
		/>
	) : null;
};

export default ChessPiece;
