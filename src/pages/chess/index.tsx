import { Chat, ChessList, MyBalance, Page } from '@views';
import { NextPage } from 'next';

const ChessPage: NextPage = () => {
	return (
		<Page>
			<MyBalance />
			<ChessList />
			<Chat />
		</Page>
	);
};

export default ChessPage;
