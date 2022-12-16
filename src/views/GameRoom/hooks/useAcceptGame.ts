import { useWeb3React } from '@web3-react/core';
import { useCallback, useState } from 'react';
import { acceptGame } from '@utils';
import { useGame } from '@hooks';
import { IBet } from '@config/types';

export const useAcceptGame = () => {
	const { library } = useWeb3React();
	const { game, updateGame } = useGame();
	const [loading, setLoading] = useState(false);

	const accept = useCallback(
		async (proposal: IBet) => {
			if (library && game) {
				setLoading(true);
				try {
					const newGame = await acceptGame(
						game.id,
						proposal.id,
						library.getSigner()
					);
					updateGame(newGame);
				} finally {
					setLoading(false);
				}
			}
		},
		[game, library, updateGame]
	);

	return { accept, loading };
};

export default useAcceptGame;
