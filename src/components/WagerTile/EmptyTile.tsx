import Image from 'next/image';

interface IProps {
	hidePlus?: boolean;
}

export const EmptyTile: React.FC<IProps> = ({ hidePlus }) => {
	return (
		<div className='bg-dark-soft flex items-center justify-center hover:bg-dark-medium duration-150 w-full h-full'>
			<div className='relative w-2/5 h-2/5'>
				{hidePlus || <Image src='/images/plus.svg' alt='Add' layout='fill' />}
			</div>
		</div>
	);
};

export default EmptyTile;
