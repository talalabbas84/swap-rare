import { ComponentProps, ReactNode } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import cx from '@utils/cx';

type ModalHeaderProps = {
	onClose: () => void;
	title: ReactNode;
} & ComponentProps<'div'>;

export const ModalHeader = ({
	onClose,
	title,
	className = '',
	...props
}: ModalHeaderProps) => {
	return (
		<div
			{...props}
			className={cx(className, 'flex items-center justify-between')}
		>
			<h3 className='title'>{title}</h3>
			<div>
				<button
					onClick={onClose}
					className='hover:bg-dark-hard duration-150 flex items-center justify-center text-white'
				>
					<IoCloseOutline size={28} />
				</button>
			</div>
		</div>
	);
};

export default ModalHeader;
