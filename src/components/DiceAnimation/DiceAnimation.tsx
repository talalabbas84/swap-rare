import Image from 'next/image';

export const DiceAnimation = () => {
	return (
		<div className='flex items-center flex-col justify-center'>
			<Image
				src='/images/anim.gif'
				width={450}
				height={250}
				alt='Anim'
				unoptimized
			/>
		</div>
	);
};

export default DiceAnimation;
