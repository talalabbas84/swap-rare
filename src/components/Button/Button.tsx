import { ComponentProps } from 'react';
import cx from 'classnames';
import { Loader } from '@components';

interface IProps {
	loading?: boolean;
}

export type ButtonProps = IProps & ComponentProps<'button'>;

export const Button: React.FC<ButtonProps> = ({
	className = '',
	children,
	loading,
	...props
}) => {
	return (
		<button
			className={cx(
				'text-white bg-blue rounded-[14px] px-[25px] grow py-[18px] block w-full duration-150 hover:bg-blue-dark',
				'disabled:bg-[#3B5E8D] disabled:pointer-events-none',
				className
			)}
			{...props}
			disabled={loading || props.disabled}
		>
			{loading ? (
				<div
					className='scale-[0.4] mb-4'
					style={{
						height: 20,
					}}
				>
					<Loader />
				</div>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
