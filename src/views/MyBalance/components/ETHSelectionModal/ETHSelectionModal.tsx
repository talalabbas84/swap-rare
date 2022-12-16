import { Button, ETHTile, ModalHeader } from '@components';
import { MINIMUM_ETH_BET } from '@config/constants';
import { useBalance, useBalanceSelection } from '@hooks';
import cx, { modalStyles } from '@utils/cx';
import { parseEther, formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

export const ETHSelectionModal = () => {
	const { eth: totalETH } = useBalance();
	const { eth, ethSelected, changeETH, toggleETHSelection } =
		useBalanceSelection();
	const [value, setValue] = useState('0');
	const [isOpen, setIsOpen] = useState(false);
	const numETH = parseEther(value || '0');
	const disabled = numETH.lt(MINIMUM_ETH_BET) || numETH.gt(totalETH);
	const isHalf = !numETH.isZero() && numETH.eq(totalETH.div(2));
	const isFull = !numETH.isZero() && numETH.eq(totalETH);

	const onClose = () => setIsOpen(false);
	const submit = () => {
		changeETH(numETH);
		toggleETHSelection(true);
		onClose();
	};
	const toggleSelection = () =>
		ethSelected ? toggleETHSelection(false) : setIsOpen(true);

	useEffect(() => setValue(formatEther(eth)), [eth]);
	return (
		<>
			<ETHTile
				ethPrice={ethSelected ? eth : totalETH}
				isSelected={ethSelected}
				toggleSelection={toggleSelection}
			/>
			<Modal isOpen={isOpen} style={modalStyles} onRequestClose={onClose}>
				<div className='w-[408px] rounded-[20px] bg-dark-medium border border-dark-soft px-[26px] pt-[15px] pb-[19px] flex flex-col gap-3'>
					<ModalHeader title='Bet in ETH' onClose={onClose} />
					<div className='flex justify-between items-center gap-3'>
						<Button
							className={cx(
								'bg-[#4F5D88FF] hover:bg-[#4F5D88CC]',
								isHalf ? 'ring-2 ring-yellow' : ''
							)}
							onClick={() => changeETH(totalETH.div(2))}
						>
							Half
						</Button>
						<Button
							className={cx(
								'bg-[#4F5D88FF] hover:bg-[#4F5D88CC]',
								isFull ? 'ring-2 ring-yellow' : ''
							)}
							onClick={() => changeETH(totalETH)}
						>
							All-In
						</Button>
					</div>
					<div className='relative'>
						<input
							type='number'
							id='ether_input'
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className='block w-full rounded-[15px] h-[50px] px-5 pr-16 bg-dark-soft mt-1 outline-none border border-dark-soft focus:border-dark-very-soft font-medium text-white'
						/>
						<span className='absolute right-5 top-1/2 -translate-y-1/2 font-medium text-base text-white pointer-events-none'>
							ETH
						</span>
					</div>
					<p className='text-[#484F6C] mt-0.5'>
						Available{' '}
						<span className='text-white'>
							{(+formatEther(totalETH)).toFixed(4)} ETH
						</span>
					</p>
					<Button onClick={submit} disabled={disabled}>
						Add to Bet
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default ETHSelectionModal;
