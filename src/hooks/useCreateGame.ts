import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { createGame } from '@utils';
import { GameType, INFTAsset } from '@config/types';
import { BigNumber } from 'ethers';
import { useToasts } from '@hooks';

export const useCreateGame = () => {
	const router = useRouter();
	const { account, library } = useWeb3React();
	const [loading, setLoading] = useState(false);
	const { success, error } = useToasts();

	const create = useCallback(
		async (nfts: INFTAsset[], eth: BigNumber, type = GameType.DICE) => {
			if (!library || !account) return;
			setLoading(true);
			try {
				const newGame = await createGame(nfts, eth, account, library, type);
				const subPath = type === GameType.DICE ? 'games' : 'chess';
				router.push(`/${subPath}/${newGame.id}`);
				success('Room successfully created, please wait for requests.');
			} catch (err) {
				console.error('err ', err);
				error('Assets already locked in a game :(');
			} finally {
				setLoading(false);
			}
		},
		[account, error, library, router, success]
	);

	return { create, loading };
};

export default useCreateGame;
