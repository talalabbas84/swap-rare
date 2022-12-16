import Image from 'next/image';
import { ComponentProps } from 'react';
import cx from '@utils/cx';
import { Loader } from '@components';

export type ConnectWalletButtonProps = {
	name?: string;
	logoSrc?: string;
	isConnecting: null | boolean;
} & ComponentProps<'div'>;

export const ConnectWalletButton = ({
	name,
	logoSrc,
	isConnecting = true,
	...props
}: ConnectWalletButtonProps) => {
	return (
		<div
			className={cx(
				'bg-dark-soft select-none rounded-[15px] px-[22px] flex items-center justify-between',
				!isConnecting && 'hover:bg-dark-very-soft cursor-pointer duration-150'
			)}
			{...props}
		>
			<div className='grow relative py-3'>
				<h6 className='text-white'>{name}</h6>

				{/* Connection Box --Start-- */}
				{isConnecting && (
					<div className='absolute top-0 left-0 w-full h-full bg-dark-soft flex items-center justify-start'>
						<div className='scale-[0.4] origin-left -mr-8'>
							<Loader />
						</div>
						<div>
							<h6 className='text-white'>Initializing…</h6>
							<p className='text-sm text-[#9499B6]'>
								Login using {name} wallet
							</p>
						</div>
					</div>
				)}
				{/* Connection Box --End-- */}
			</div>
			<div className='shrink-0 py-3'>
				<Image src={logoSrc || ''} alt={name} width={30} height={30} />
			</div>
		</div>
	);
};

export default ConnectWalletButton;
