import { IToast, ToastTypes } from '@config/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const getToastStyles = (type?: ToastTypes) => {
	let icon, color;
	switch (type) {
		case ToastTypes.Error:
			icon = 'error';
			color = '#C95454';
			break;
		case ToastTypes.Success:
			icon = 'success';
			color = '#4CB675';
			break;
		case ToastTypes.Info:
			icon = 'info';
			color = '#4CB675';
			break;
		default:
			icon = 'info';
			color = '#4CB675';
	}

	return { icon, color };
};

interface IProps extends IToast {
	onExpire: () => void;
}

export const Toast: React.FC<IProps> = ({ message, type, onExpire }) => {
	const [hide, setHide] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setHide(true);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	const { icon, color } = getToastStyles(type);

	return (
		<div
			className={`${
				hide ? 'opacity-0' : 'opacity-100'
			} rounded-2xl text-white text-sm p-5 mb-3 flex items-center w-[370px] gap-3 transition-all duration-700`}
			role='alert'
			style={{ backgroundColor: color }}
			onTransitionEnd={onExpire}
		>
			<Image
				src={`/images/toasts/${icon}.png`}
				width={25}
				height={25}
				alt={icon}
				className='invert'
			/>
			{message}
		</div>
	);
};

export default Toast;
