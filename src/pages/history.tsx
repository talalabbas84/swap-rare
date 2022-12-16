import { Chat, MyBalance, Page, History } from '@views';
import { NextPage } from 'next';

const HistoryPage: NextPage = () => {
	return (
		<Page>
			<MyBalance />
			<div className='grow'>
				<History />
			</div>
			<Chat />
		</Page>
	);
};

export default HistoryPage;
