import { useContext } from 'react';
import { BalanceSelectionContext } from '@contexts';

export const useBalanceSelection = () => {
	const context = useContext(BalanceSelectionContext);
	if (!context) {
		throw 'useBalanceSelection must be used within a BalanceSelectionProvider';
	}
	return context;
};

export default useBalanceSelection;
