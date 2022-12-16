import { useCallback, useState } from 'react';
import { useBalance, useToasts, useWallet } from '@hooks';
import { INFTAsset } from '@config/types';
import { BigNumber } from 'ethers';

export const useDeposit = () => {
	const [loading, setLoading] = useState(false);
	const { deposit: internalDeposit } = useBalance();
	const { success, error } = useToasts();

	const deposit = useCallback(
		async (assets: INFTAsset[], eth: BigNumber) => {
			setLoading(true);
			await internalDeposit(assets, eth)
				.then(() => {
					success('Deposit successful');
				})
				.catch(() => error('Something went wrong while depositing :('))
				.finally(() => setLoading(false));
		},
		[error, internalDeposit, success]
	);

	return { deposit, loading };
};

export default useDeposit;
