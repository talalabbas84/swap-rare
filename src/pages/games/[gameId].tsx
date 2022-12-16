import { Chat, GameRoom, MyBalance, Page } from '@views';
import { NextPage } from 'next';

const GamePage: NextPage = () => {
	return (
		<Page>
			<MyBalance />
			<div className='grow'>
				<GameRoom />
			</div>
			<Chat />
		</Page>
	);
};

export default GamePage;
