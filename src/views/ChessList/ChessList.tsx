import { Button } from '@components';
import { GameType } from '@config/types';
import { useBalanceSelection, useCreateGame, useGamesList } from '@hooks';
import { SCROLLBAR } from '@utils/cx';
import { BigNumber } from 'ethers';
import { ChessGameCard } from './components';

export const ChessList = () => {
	const { games } = useGamesList(GameType.CHESS);
	const { selectedNFTs, eth, ethSelected } = useBalanceSelection();
	const { create, loading } = useCreateGame();
	const disabled = !(selectedNFTs.length || ethSelected);

	const onCreate = () =>
		create(selectedNFTs, ethSelected ? eth : BigNumber.from(0), GameType.CHESS);
	return (
		<div className='flex flex-col w-full gap-4'>
			<Button
				className='h-fit py-3 grow-0'
				loading={loading}
				disabled={disabled}
				onClick={onCreate}
			>
				Create Game
			</Button>
			<div
				className={`grid justify-evenly gap-3 ${SCROLLBAR}`}
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 275px))',
				}}
			>
				{games.map((game) => (
					<ChessGameCard key={game.id} game={game} />
				))}
			</div>
		</div>
	);
};

export default ChessList;
