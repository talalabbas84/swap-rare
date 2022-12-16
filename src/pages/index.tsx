import { useToasts } from '@hooks';
import { Chat, MyBalance, Page, CreateGame, GamesList } from '@views';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
	return (
		<Page>
			<MyBalance />
			<div className='h-full grow overflow-hidden'>
				<div className='h-full relative flex flex-col'>
					<CreateGame />
					<GamesList />
				</div>
			</div>
			<Chat />
		</Page>
	);
};

export default HomePage;
