import Image from 'next/image';
import cx, { commaSeparetor } from '@utils/cx';
import { BigNumber } from 'ethers';
import { useWallet } from '@hooks';

interface IProps {
	imageUrl: string;
	passive?: boolean;
	ethPrice?: BigNumber;
	selected?: boolean;
	toggleSelection?: () => void;
}

export const NFTTile: React.FC<IProps> = ({
	selected,
	passive,
	imageUrl,
	ethPrice,
	toggleSelection,
}) => {
	const { ethToUSD } = useWallet();
	return (
		<div
			className={cx(
				'w-full aspect-square rounded-xl relative cursor-pointer',
				selected && 'ring-2 ring-yellow'
			)}
			onClick={passive ? undefined : toggleSelection}
		>
			<div
				className={cx(
					'w-full h-full rounded-xl relative overflow-hidden bg-dark-soft',
					!(passive || selected) && 'opacity-50'
				)}
			>
				<Image
					src={imageUrl}
					alt={'Balance Item'}
					layout='fill'
					className='duration-150 hover:scale-110'
					quality={100}
				/>
			</div>
			{ethPrice && (
				<div className='absolute top-full -translate-y-1/2 text-xs -right-3 text-white bg-green-dark rounded-md overflow-hidden px-2 pt-0.5 pb-px'>
					≈${commaSeparetor(ethToUSD(ethPrice))}
				</div>
			)}
		</div>
	);
};

export default NFTTile;
