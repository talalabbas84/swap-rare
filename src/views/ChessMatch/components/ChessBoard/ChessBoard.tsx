import { useChessGame } from '@hooks';
import { useLayoutEffect, useRef, useState } from 'react';
import GridIndicators from './GridIndicators';
import { BoardTile } from './BoardTile';

export const ChessBoard = () => {
	const { board, playerColor } = useChessGame();
	const ref = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);

	const allSquares = board.map((square) => (
		<BoardTile key={square.square} square={square} scale={scale} />
	));

	useLayoutEffect(() => {
		const rescale = () => {
			if (ref.current && containerRef.current) {
				const { clientHeight, clientWidth } = containerRef.current;
				const target = Math.min(clientHeight, clientWidth);
				const ratio =
					Math.floor((target / ref.current.clientWidth) * 100) / 100;
				ref.current.style.transform = `scale(${ratio})`;
				ref.current.style.transformOrigin = 'top left';
				setScale(ratio);
			}
		};
		window.addEventListener('resize', rescale);
		rescale();
		return () => window.removeEventListener('resize', rescale);
	});

	return (
		<div ref={containerRef} className='min-w-[50%] w-100% h-full'>
			<div
				ref={ref}
				className='relative w-fit border-dark-soft border-4 p-8 h-fit'
			>
				<GridIndicators player={playerColor} />
				<div className='grid grid-cols-8 border-dark-soft border-2'>
					{playerColor === 'b' ? allSquares.reverse() : allSquares}
				</div>
			</div>
		</div>
	);
};

export default ChessBoard;
