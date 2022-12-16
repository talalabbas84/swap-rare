import { Button, StatusBar } from '@components';
import { useBalanceSelection, useCreateGame } from '@hooks';
import { BigNumber } from 'ethers';
import { Dice3D } from '../Dice3D';
import { Wager } from '@components';

export const CreateGame = () => {
	const { selectedNFTs, eth, ethSelected } = useBalanceSelection();
	const { create, loading } = useCreateGame();

	const onCreate = () =>
		create(selectedNFTs, ethSelected ? eth : BigNumber.from(0));
	const disabled = !(selectedNFTs.length || ethSelected);
	return (
		<div className='grid grid-cols-1 md:grid-cols-[auto,40%] gap-1 shrink-0 items-center'>
			<Dice3D />
			<div className='space-y-3.5'>
				<div className='grid grid-cols-[repeat(3,1fr)] gap-2'>
					<Wager
						nfts={selectedNFTs}
						eth={ethSelected ? eth : undefined}
						showEmpty={true}
						showETHAmount={true}
					/>
				</div>
				<StatusBar />
				<Button onClick={onCreate} loading={loading} disabled={disabled}>
					CREATE GAME
				</Button>
			</div>
		</div>
	);
};

export default CreateGame;
