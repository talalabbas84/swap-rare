import { useState } from 'react';
import { Button } from '@components';
import WalletModal from './WalletModal';

interface IProps {
	text?: string;
}

export const ConnectWallet: React.FC<IProps> = ({ text }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<Button
				className='!px-[46px] !py-[9px]'
				onClick={() => setShowModal(true)}
			>
				{text || 'Launch App'}
			</Button>
			{showModal && (
				<WalletModal isOpen={showModal} onClose={() => setShowModal(false)} />
			)}
		</>
	);
};

export default ConnectWallet;
