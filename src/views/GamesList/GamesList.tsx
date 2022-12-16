import { TopBottomOverlay } from '@components';
import cx, { SCROLLBAR } from '@utils/cx';
import { useRef } from 'react';
import { GameTile } from './components';
import { useGamesList } from '@hooks';

export const GamesList = () => {
	const { games } = useGamesList();
	const scrollRef = useRef<HTMLDivElement>(null!);
	return (
		<section
			className={cx('flex flex-col grow relative mt-6 md:mt-0 overflow-hidden')}
		>
			<h2 className='title p-[25px]'>
				All Rooms
				<span className='bg-blue px-3 py-0.5 rounded-[5px] text-[#0C3E83] inline-block ml-3'>
					{games.length}
				</span>
			</h2>
			<div className='relative flex overflow-hidden'>
				<div className={cx('grow', SCROLLBAR)} ref={scrollRef}>
					<div className={cx('grid grid-cols-1 md:grid-cols-2 gap-[20px]')}>
						{games.map((game) => (
							<GameTile game={game} key={game.id} />
						))}
					</div>
				</div>
				<TopBottomOverlay elmRef={scrollRef} />
			</div>
		</section>
	);
};

export default GamesList;
