import { useContext } from 'react';
import { ToastsContext } from '@contexts';

export const useToasts = () => {
	const context = useContext(ToastsContext);
	if (!context) {
		throw 'useToasts must be used within a ToastsProvider';
	}
	return context;
};

export default useToasts;
