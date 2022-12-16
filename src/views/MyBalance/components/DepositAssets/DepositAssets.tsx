import { Button } from '@components';
import Image from 'next/image';
import { useState } from 'react';
import DepositModal from './DepositModal';

export const DepositAssets = () => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<Button
				className='flex items-center justify-center gap-3.5 !bg-green duration-150 hover:!bg-green-dark'
				onClick={() => setShowModal(true)}
			>
				<Image
					src={'/images/deposit.png'}
					width={20}
					height={18}
					alt='Deposit'
					className='shrink-0'
				/>
				DEPOSIT
			</Button>
			<DepositModal isOpen={showModal} onClose={() => setShowModal(false)} />
		</>
	);
};

export default DepositAssets;
