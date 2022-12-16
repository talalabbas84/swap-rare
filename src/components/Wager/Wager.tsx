import { MINIMUM_ETH_BET } from '@config/constants';
import { INFTAssetInfo } from '@config/types';
import { BigNumber, BigNumberish } from 'ethers';
import { useMemo } from 'react';
import { WagerTile } from '@components';

interface IProps {
	nfts: INFTAssetInfo[];
	eth?: BigNumberish;
	showEmpty?: boolean;
	showETHAmount?: boolean;
	type?: 'grid' | 'list';
	hidePlus?: boolean;
}
export const Wager: React.FC<IProps> = ({
	nfts,
	eth,
	showEmpty,
	showETHAmount,
	hidePlus,
	type = 'list',
}) => {
	const length = type === 'grid' ? 4 : 3;
	const tiles = useMemo(() => {
		const realTiles = [
			...(eth && BigNumber.from(eth)?.gte(MINIMUM_ETH_BET)
				? [{ type: 'ETH', ethPrice: showETHAmount ? eth : undefined }]
				: []),
			...nfts.map((nft) => ({ type: 'NFT', imageUrl: nft.imageUrl })),
		];
		const emptyTiles =
			showEmpty && realTiles.length < length
				? [...new Array(length - realTiles.length).fill({ type: 'NONE' })]
				: [];
		return [...realTiles, ...emptyTiles];
	}, [eth, length, nfts, showETHAmount, showEmpty]);

	let clearTiles = tiles;
	let extraTile;
	let extraTiles;
	if (tiles.length > length) {
		clearTiles = tiles.slice(0, length - 1);
		extraTile = tiles[length - 1];
		extraTiles = tiles.slice(length);
	}
	const Tiles = (
		<>
			{clearTiles.map((tile, index) => (
				<WagerTile {...tile} key={index} hidePlus={hidePlus} />
			))}
			{extraTile && (
				<WagerTile {...extraTile} extras={extraTiles} hidePlus={hidePlus} />
			)}
		</>
	);

	return type === 'grid' ? (
		<div className='grid grid-cols-2 gap-1 w-full'>{Tiles}</div>
	) : (
		Tiles
	);
};

export default Wager;
