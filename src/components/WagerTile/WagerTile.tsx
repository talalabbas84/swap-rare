import { ETHTile, NFTTile } from '@components';
import { BigNumber } from 'ethers';
import EmptyTile from './EmptyTile';
import { ExtrasTooltip } from './ExtrasTooltip';

export interface IWagerProps {
	type: 'ETH' | 'NFT' | 'NONE';
	imageUrl?: string;
	ethPrice?: BigNumber;
}

interface IProps extends IWagerProps {
	extras?: IWagerProps[];
	hidePlus?: boolean;
}

export const WagerTile: React.FC<IProps> = ({
	imageUrl,
	ethPrice,
	extras,
	type,
	hidePlus,
}) => {
	const TileComponent =
		type === 'ETH' ? ETHTile : type === 'NFT' ? NFTTile : EmptyTile;
	const tile = (
		<TileComponent
			imageUrl={imageUrl || ''}
			ethPrice={ethPrice}
			passive={true}
			hidePlus={hidePlus}
		/>
	);
	return (
		<div className='w-full aspect-square rounded-[14px] overflow-hidden relative cursor-pointer'>
			<div className='w-full aspect-square rounded-[14px] overflow-hidden cursor-pointer hover:scale-105 duration-150'>
				{extras ? <ExtrasTooltip items={extras}>{tile}</ExtrasTooltip> : tile}
			</div>
		</div>
	);
};

export default WagerTile;
