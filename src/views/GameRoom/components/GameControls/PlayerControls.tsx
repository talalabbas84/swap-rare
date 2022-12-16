import { Button } from '@components';
import { useBalanceSelection, useGame, useWallet } from '@hooks';
import { BigNumber } from 'ethers';
import { useConfirmBet } from '../../hooks';

export const PlayerControls = () => {
	const { account } = useWallet();
	const { game, proposals } = useGame();
	const { selectedNFTs, ethSelected, eth } = useBalanceSelection();
	const { confirm, loading: loadingConfirm } = useConfirmBet();

	const haveSubmitted = proposals.some((p) => p.player === account);
	const isComplete = game?.status === 'finished';
	const isActive = game?.status === 'active';
	const isInGame =
		account && (game?.player1 === account || game?.player2 === account);
	const disabled =
		isInGame ||
		haveSubmitted ||
		isComplete ||
		isActive ||
		(!selectedNFTs.length && !ethSelected);
	return (
		<Button
			className='w-full duration-150'
			loading={loadingConfirm}
			onClick={() =>
				confirm(selectedNFTs, ethSelected ? eth : BigNumber.from(0))
			}
			disabled={disabled}
		>
			{isComplete
				? 'GAME ENDED'
				: isInGame
				? 'ROLLING...'
				: isActive
				? 'GAME ALREADY STARTED'
				: haveSubmitted
				? 'WAITING FOR RESPONSE...'
				: 'PLACE A BET'}
		</Button>
	);
};

export default PlayerControls;
