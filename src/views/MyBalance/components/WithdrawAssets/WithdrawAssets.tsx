import { useBalance, useBalanceSelection } from '@hooks';
import { useState } from 'react';
import WithdrawButton from './WithdrawButton';
import WithdrawModal from './WithdrawModal';

export const WithdrawAssets = () => {
	const [showModal, setShowModal] = useState(false);
	const { eth, nfts } = useBalance();
	const { selectedNFTs, ethSelected } = useBalanceSelection();
	if (eth.isZero() && !nfts.length) return null;
	return (
		<>
			<WithdrawButton
				disabled={!(selectedNFTs.length || ethSelected)}
				onClick={() => setShowModal(true)}
			/>
			<WithdrawModal isOpen={showModal} onClose={() => setShowModal(false)} />
		</>
	);
};

export default WithdrawAssets;
