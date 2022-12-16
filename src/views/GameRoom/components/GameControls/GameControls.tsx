import { StatusBar } from '@components';
import { useGame, useWallet } from '@hooks';
import { SocialBar } from '../SocialBar';
import CreatorControls from './CreatorControls';
import PlayerControls from './PlayerControls';

export const GameControls = () => {
	const { account } = useWallet();
	const { game } = useGame();
	const isCreator = game?.player1 === account;
	return (
		<div className='space-y-3.5'>
			<StatusBar />
			<SocialBar />
			{isCreator ? <CreatorControls /> : <PlayerControls />}
		</div>
	);
};

export default GameControls;
