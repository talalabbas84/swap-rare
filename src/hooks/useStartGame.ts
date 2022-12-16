import { useWeb3React } from '@web3-react/core';
import { useCallback, useState } from 'react';
import { startGame } from '@utils';
import { useGame } from '@hooks';

export const useStartGame = () => {
	const { account, library } = useWeb3React();
	const { game } = useGame();
	const [loading, setLoading] = useState(false);

	const start = useCallback(async () => {
		if (library && game && account) {
			setLoading(true);
			await startGame(game.id, account, library.getSigner())
				.catch(console.log)
				.finally(() => setLoading(false));
		}
	}, [account, game, library]);

	return { start, loading };
};

export default useStartGame;
