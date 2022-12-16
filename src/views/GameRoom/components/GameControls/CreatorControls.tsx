import { Button } from '@components';
import { useGame, useStartGame } from '@hooks';
import { useState } from 'react';
import { useDeleteGame } from '../../hooks';

export const CreatorControls = () => {
	const { game, proposals } = useGame();
	const [isStarted, setIsStarted] = useState(false);
	const { start, loading: loadingStart } = useStartGame();
	const { deleteGame, loading: loadingDelete } = useDeleteGame();

	const hasProposals = !!proposals.length;
	const isComplete = game?.status === 'finished';
	const isAccepted = !!game?.selectedProposal;
	const enabled = isAccepted && !isComplete && !isStarted && !loadingDelete;

	return (
		<div className='flex gap-2'>
			<Button
				loading={loadingStart}
				onClick={async () => {
					await start();
					setIsStarted(true);
				}}
				disabled={!enabled}
				className='w-full duration-150'
			>
				{isComplete
					? 'GAME ENDED'
					: isStarted
					? 'ROLLING...'
					: isAccepted
					? 'START THE GAME'
					: hasProposals
					? 'WAIT FOR OPPONENT REQUESTS...'
					: "WAIT FOR OPPONENT'S OFFER..."}
			</Button>
			{isAccepted || (
				<Button
					className='w-fit bg-red hover:bg-red-dark'
					loading={loadingDelete}
					onClick={deleteGame}
				>
					Delete
				</Button>
			)}
		</div>
	);
};

export default CreatorControls;
