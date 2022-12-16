import { useContext } from 'react';
import { WalletContext } from '@contexts';

export const useWallet = () => {
	const context = useContext(WalletContext);
	if (!context) {
		throw 'useWallet must be used within a WalletProvider';
	}
	return context;
};

export default useWallet;
