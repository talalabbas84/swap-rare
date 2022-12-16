import {
	INFTAsset,
	INFTAssetWithSelect,
	IUseNFTSelection,
} from '@config/types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useNFTSelection = (nfts: INFTAsset[]): IUseNFTSelection => {
	const [assets, setAssets] = useState<INFTAssetWithSelect[]>([]);
	const allNFTsSelected = useMemo(
		() => !assets.length || assets.every((nft) => nft.selected),
		[assets]
	);
	useEffect(
		() =>
			setAssets(
				nfts.map((asset) => ({
					...asset,
					selected: false,
				}))
			),
		[nfts]
	);

	const toggleNFTSelection = useCallback(
		(nft: INFTAsset, value?: boolean) => {
			const newAssets = [...assets];
			const currentAsset = newAssets.find((asset) => asset.id === nft.id);
			if (currentAsset) {
				const newValue = value === undefined ? !currentAsset.selected : value;
				currentAsset.selected = newValue;
				setAssets(newAssets);
			}
		},
		[assets]
	);

	const toggleNFTAllSelection = useCallback(
		(value?: boolean) => {
			const newValue = value === undefined ? !allNFTsSelected : value;
			const newAssets = assets.map((asset) => ({
				...asset,
				selected: newValue,
			}));
			setAssets(newAssets);
		},
		[allNFTsSelected, assets]
	);

	const value = useMemo(
		() => ({
			nfts: assets,
			allNFTsSelected,
			toggleNFTSelection,
			toggleNFTAllSelection,
			selectedNFTs: assets.filter((nft) => nft.selected),
		}),
		[assets, allNFTsSelected, toggleNFTSelection, toggleNFTAllSelection]
	);

	return value;
};

export default useNFTSelection;
