import { useWeb3React } from '@web3-react/core';
import { useCallback, useState } from 'react';
import { submitProposal } from '@utils';
import { useGame, useToasts } from '@hooks';
import { INFTAsset } from '@config/types';
import { BigNumber } from 'ethers';

export const useConfirmBet = () => {
	const { account, library } = useWeb3React();
	const { game, fetch } = useGame();
	const [loading, setLoading] = useState(false);
	const { success, error } = useToasts();

	const confirm = useCallback(
		async (nfts: INFTAsset[], eth: BigNumber) => {
			if (!account || !library || !game) return;
			try {
				setLoading(true);
				await submitProposal(
					nfts,
					eth,
					game.id,
					account,
					library.getSigner(),
					game.name
				);
				await fetch();
				success(
					'You have successfully submitted your request, please wait for a response.'
				);
			} catch {
				error('Assets already locked in a game :(');
			} finally {
				setLoading(false);
			}
		},
		[account, error, fetch, game, library, success]
	);

	return { confirm, loading };
};

export default useConfirmBet;
