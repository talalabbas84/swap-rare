import React from 'react';
import { Button, ButtonProps } from '@components';
import Image from 'next/image';

export const WithdrawButton: React.FC<ButtonProps> = (props) => {
	return (
		<Button
			{...props}
			className='flex items-center justify-center gap-3.5 !bg-red duration-150 hover:!bg-red-dark'
		>
			<Image
				src={'/images/withdraw.svg'}
				width={20}
				height={20}
				alt='Withdraw'
				className='shrink-0'
				quality={100}
			/>
			WITHDRAW
		</Button>
	);
};

export default WithdrawButton;
