import { IBalanceSelectionContext } from '@config/types';
import { useBalance, useNFTSelection, useETHSelection } from '@hooks';
import { createContext, PropsWithChildren, useMemo } from 'react';

export const BalanceSelectionContext =
	createContext<IBalanceSelectionContext | null>(null);

export const BalanceSelectionProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const { eth, nfts } = useBalance();
	const nftSelection = useNFTSelection(nfts);
	const ethSelection = useETHSelection(eth);
	const allSelected = useMemo(
		() =>
			(!nftSelection.nfts.length || nftSelection.allNFTsSelected) &&
			(ethSelection.eth.isZero() || ethSelection.ethSelected),
		[ethSelection, nftSelection]
	);

	const context = useMemo(
		() => ({
			...nftSelection,
			...ethSelection,
			allSelected,
			toggleAllSelection: () => {
				nftSelection.toggleNFTAllSelection(!allSelected);
				ethSelection.ethSelected || ethSelection.changeETH(eth);
				ethSelection.toggleETHSelection(!allSelected);
			},
		}),
		[allSelected, eth, ethSelection, nftSelection]
	);
	typeof context;
	return (
		<BalanceSelectionContext.Provider value={context}>
			{children}
		</BalanceSelectionContext.Provider>
	);
};

export default BalanceSelectionProvider;
