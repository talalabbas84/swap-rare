import { useChessGame } from '@hooks';
import { SCROLLBAR } from '@utils/cx';
import { ChessPiece } from '@components';

export const MovesHistory = () => {
	const { game } = useChessGame();
	const allMoves = game.history({ verbose: true });
	const whiteMoves = allMoves.filter((_, idx) => !(idx % 2));
	const blackMoves = allMoves.filter((_, idx) => idx % 2);

	return (
		<div className='flex flex-col min-w-[275px] w-[40%] rounded-3xl text-white border-dark-soft border px-10 py-6 '>
			<h1 className='font-medium text-3xl mb-4'>History</h1>
			<div className={`flex justify-between font-thin text-md ${SCROLLBAR}`}>
				<ul>
					{whiteMoves.map((move, idx) => (
						<li key={idx} className='flex items-center py-0.5'>
							<div className='text-[#6F78A7] font-medium pr-3'>{idx + 1}.</div>
							<div className='relative w-[20px] h-[20px] px-4'>
								<ChessPiece piece={move.piece} color={move.color} />
							</div>
							<div>{move.san}</div>
						</li>
					))}
				</ul>
				<ol className='text-[#6F78A7]'>
					{blackMoves.map((move, idx) => (
						<li key={idx} className='flex justify-end items-center py-0.5'>
							<div>{move.san}</div>
							<div className='relative w-[20px] h-[20px] px-4'>
								<ChessPiece piece={move.piece} color={move.color} />
							</div>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export default MovesHistory;
