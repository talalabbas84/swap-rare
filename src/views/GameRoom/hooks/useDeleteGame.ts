import { useWeb3React } from '@web3-react/core';
import { useCallback, useState } from 'react';
import { deleteGame as deleteGameInternal } from '@utils';
import { useContracts, useGame } from '@hooks';
import { useRouter } from 'next/router';

export const useDeleteGame = () => {
	const { library } = useWeb3React();
	const { game } = useGame();
	const { diceGame } = useContracts();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const deleteGame = useCallback(async () => {
		if (library && game?.id) {
			setLoading(true);
			await deleteGameInternal(game.id, library.getSigner())
				.then(() => router.push('/'))
				.catch(console.log)
				.finally(() => setLoading(false));
		}
	}, [game?.id, library, router]);

	return { deleteGame, loading };
};

export default useDeleteGame;
