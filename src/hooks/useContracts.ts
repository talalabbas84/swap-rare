import { useContext } from 'react';
import { ContractsContext } from '@contexts';

export const useContracts = () => {
	const context = useContext(ContractsContext);
	if (!context) {
		throw 'useContracts must be used within a ContractsProvider';
	}
	return context;
};

export default useContracts;
