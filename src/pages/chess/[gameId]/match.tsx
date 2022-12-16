import { Chat, ChessMatch, MyBalance, Page } from '@views';
import { NextPage } from 'next';

const ChessPage: NextPage = () => {
	return (
		<Page>
			<MyBalance />
			<ChessMatch />
			<Chat />
		</Page>
	);
};

export default ChessPage;
