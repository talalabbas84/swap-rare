import { BigNumber } from 'ethers';
import Image from 'next/image';
import cx from '@utils/cx';
import { MINIMUM_ETH_BET } from '@config/constants';
import { formatEther } from 'ethers/lib/utils';

type IProps = {
	isSelected?: boolean;
	toggleSelection?: () => void;
	ethPrice?: BigNumber;
};

export const ETHTile: React.FC<IProps> = ({
	isSelected,
	toggleSelection,
	ethPrice,
}) => {
	return (
		<div
			style={{
				background: 'linear-gradient(138.83deg, #595E78 5.07%, #6E7EC2 95.24%)',
			}}
			className={cx(
				'w-full aspect-square rounded-xl relative cursor-pointer text-white',
				isSelected && 'ring-2 ring-yellow'
			)}
			onClick={toggleSelection}
		>
			<div
				className={cx(
					'w-full h-full rounded-xl relative overflow-hidden flex flex-col justify-center items-center'
				)}
			>
				<div className='relative w-1/2 h-1/2'>
					<Image
						src='/images/eth.png'
						alt={'ETH Balance'}
						layout='fill'
						className='duration-150 hover:scale-110'
						quality={100}
					/>
				</div>
				{ethPrice?.gte(MINIMUM_ETH_BET) && (
					<p className='text-xs py-2'>
						{(+formatEther(ethPrice)).toFixed(4)} ETH
					</p>
				)}
			</div>
		</div>
	);
};

export default ETHTile;
