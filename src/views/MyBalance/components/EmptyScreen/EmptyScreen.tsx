import Image from 'next/image';

interface IProps {
	message: string;
}

export const EmptyScreen: React.FC<IProps> = ({ message }) => {
	return (
		<div className='flex flex-col items-center justify-center py-12'>
			<Image
				src='/images/empty_balance.svg'
				alt='Empty balance'
				width={122}
				height={95}
			/>
			<p className='text-dark-very-soft font-medium mt-7 text-center w-[60%] mx-auto'>
				{message}
			</p>
		</div>
	);
};

export default EmptyScreen;
