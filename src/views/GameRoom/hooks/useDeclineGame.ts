import { useWeb3React } from '@web3-react/core';
import { useCallback, useState } from 'react';
import { declineGame } from '@utils';
import { useGame } from '@hooks';

export const useDeclineGame = () => {
	const { library } = useWeb3React();
	const { game, proposals } = useGame();
	const [loading, setLoading] = useState(false);

	const decline = useCallback(async () => {
		if (library && game) {
			setLoading(true);
			try {
				await declineGame(game.id, proposals[0].id, library.getSigner());
			} finally {
				setLoading(false);
			}
		}
	}, [game, library, proposals]);

	return { decline, loading };
};

export default useDeclineGame;
