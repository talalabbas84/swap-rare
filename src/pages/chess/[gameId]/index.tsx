import { GameProvider } from '@contexts';
import { Chat, ChessRoom, MyBalance, Page } from '@views';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const GamePage: NextPage = () => {
	const {
		query: { gameId },
	} = useRouter();
	return (
		<Page>
			<GameProvider gameId={gameId as string}>
				<MyBalance />
				<ChessRoom />
				<Chat />
			</GameProvider>
		</Page>
	);
};

export default GamePage;
