import Image from 'next/image';

export const ConnectWalletScreen = () => {
	return (
		<div className='flex flex-col items-center justify-center py-12'>
			<Image src='/images/lock.svg' alt='lock' width={86} height={109} />
			<p className='text-dark-very-soft leading-none mt-7 w-[60%] text-center'>
				Launch App to see your balance & play games.
			</p>
		</div>
	);
};

export default ConnectWalletScreen;
