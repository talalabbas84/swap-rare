import { useContext } from 'react';
import { BalanceContext } from '@contexts';

export const useBalance = () => {
	const context = useContext(BalanceContext);
	if (!context) {
		throw 'useBalance must be used within a BalanceProvider';
	}
	return context;
};

export default useBalance;
