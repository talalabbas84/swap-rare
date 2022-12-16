import { TopBottomOverlay } from '@components';
import cx, { SCROLLBAR } from '@utils/cx';
import { useRef } from 'react';
import { useHistory } from './hooks';
import { GameTile } from './components';

export const History = () => {
	const scrollRef = useRef(null);
	const { games } = useHistory();
	return (
		<section className='h-full flex flex-col overflow-auto'>
			<h4 className='text-white text-xl font-medium mb-[30px]'>My History</h4>
			<div className='relative grow overflow-hidden'>
				<TopBottomOverlay elmRef={scrollRef} />
				<div
					ref={scrollRef}
					className={cx(
						SCROLLBAR,
						'w-full h-full md:absolute overflow-auto pb-1'
					)}
				>
					<table className='w-full text-left waiting_for_opponents_table whitespace-nowrap'>
						<thead className='sticky top-0 left-0 w-full bg-dark-hard z-50'>
							<tr className='text-dark-very-soft font-normal'>
								<th className='pl-[30px] pb-1'>BUY-IN</th>
								<th className='pb-1'>PLAYERS</th>
								<th className='pb-1'>BETS</th>
								<th className='pb-1'>VALUE</th>
								<th className='pb-1'>RESULT</th>
								<th className='pb-1'>TIMESTAMP</th>
							</tr>
							<tr className='h-1.5'></tr>
						</thead>
						<tbody>
							{games?.map((game) => (
								<GameTile key={game.id} game={game} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default History;
