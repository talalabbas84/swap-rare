import Modal from 'react-modal';
import { modalStyles } from '@utils/cx';
import { Button, ModalHeader } from '@components';
import { useBalanceSelection } from '@hooks';
import { useWithdraw } from '../../hooks';
import { BigNumber } from 'ethers';

interface IProps {
	onClose: () => void;
	isOpen: boolean;
}

export const WithdrawModal: React.FC<IProps> = ({ onClose, isOpen }) => {
	const { selectedNFTs, eth, ethSelected } = useBalanceSelection();
	const { withdraw, loading } = useWithdraw();
	const onConfirm = () =>
		withdraw(selectedNFTs, ethSelected ? eth : BigNumber.from(0)).finally(
			onClose
		);

	return (
		<Modal isOpen={isOpen} style={modalStyles} onRequestClose={onClose}>
			<div className='w-[408px] rounded-[20px] bg-dark-medium border border-dark-soft px-[26px] pt-[15px] pb-[19px]'>
				<ModalHeader title='WITHDRAW' onClose={onClose} />
				<div className='bg-[#161A2E] rounded-[15px] text-white px-[17px] py-[15px] text-sm mt-5 mb-2'>
					Are you sure you want to withdraw?
				</div>
				<Button className='py-[22px]' onClick={onConfirm} loading={loading}>
					CONFIRM WITHDRAWAL
				</Button>
			</div>
		</Modal>
	);
};

export default WithdrawModal;
