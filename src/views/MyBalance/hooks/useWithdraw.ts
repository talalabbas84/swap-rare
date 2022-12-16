import { useCallback, useState } from 'react';
import { useBalance, useToasts, useWallet } from '@hooks';
import { INFTAsset } from '@config/types';
import { BigNumber } from 'ethers';

export const useWithdraw = () => {
	const [loading, setLoading] = useState(false);
	const { withdraw: internalWithdraw } = useBalance();
	const { success, error } = useToasts();

	const withdraw = useCallback(
		async (assets: INFTAsset[], eth: BigNumber) => {
			setLoading(true);
			await internalWithdraw(assets, eth)
				.then(() => {
					success('Withdraw successful');
				})
				.catch(() => error('Something went wrong while withdrawing :('))
				.finally(() => setLoading(false));
		},
		[error, internalWithdraw, success]
	);

	return { withdraw, loading };
};

export default useWithdraw;
