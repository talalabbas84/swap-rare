import { useBalance, useBalanceSelection } from '@hooks';
import { NFTTile } from '@components';
import EmptyScreen from '../EmptyScreen';
import ETHSelectionModal from '../ETHSelectionModal';

export const DepositedItems = () => {
	const { eth: totalETH } = useBalance();
	const { nfts, toggleNFTSelection, ethSelected, toggleETHSelection } =
		useBalanceSelection();
	const isEmpty = !nfts.length && totalETH.isZero();

	return isEmpty ? (
		<div className='flex flex-col justify-center items-center absolute w-full h-full'>
			<EmptyScreen message='Balance is empty. Make a deposit to start your legendary game.' />
		</div>
	) : (
		<div className='grid grid-cols-3 gap-[22px] pb-3 pt-1 px-[24px] w-full'>
			{totalETH.isZero() || <ETHSelectionModal />}
			{nfts.map((asset) => (
				<NFTTile
					key={asset.id}
					{...asset}
					toggleSelection={() => toggleNFTSelection(asset)}
				/>
			))}
		</div>
	);
};

export default DepositedItems;
