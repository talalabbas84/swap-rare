import { GameProvider } from '@contexts';
import cx, { SCROLLBAR } from '@utils/cx';
import { useRouter } from 'next/router';
import { Dice3D } from '..';
import { GameControls, ProposalsAndBets, ResultScreen } from './components';

export const GameRoom = () => {
	const {
		query: { gameId },
	} = useRouter();
	return (
		<GameProvider gameId={gameId as string}>
			<div className='h-full overflow-hidden'>
				<div className='h-full flex flex-col'>
					<div className='grid grid-cols-1 md:grid-cols-[auto,40%] gap-1 shrink-0 items-center'>
						<Dice3D />
						<GameControls />
					</div>
					<div
						className={cx(
							'grow relative mt-6 md:mt-0 overflow-auto',
							SCROLLBAR
						)}
					>
						<ProposalsAndBets />
					</div>
				</div>
			</div>
			<ResultScreen />
		</GameProvider>
	);
};

export default GameRoom;
