import { useBalance, useBalanceSelection, useWallet } from '@hooks';
import cx from '@utils/cx';
import { Switch } from '@components';
import { BigNumber } from 'ethers';

export const MyBalanceSelectAll = () => {
	const { ethToUSD } = useWallet();
	const { eth: totalETH } = useBalance();
	const {
		nfts,
		selectedNFTs,
		eth,
		ethSelected,
		allSelected,
		toggleAllSelection,
	} = useBalanceSelection();
	const total = selectedNFTs.reduce(
		(acc, asset) => acc.add(asset.ethPrice),
		ethSelected ? eth : BigNumber.from(0)
	);
	const count = selectedNFTs.length + (ethSelected ? 1 : 0);
	const isDisabled = !nfts.length && totalETH.isZero();
	return (
		<>
			<div className='pl-[38px] pr-[27px] flex items-center justify-between flex-wrap gap-5 py-2.5'>
				<div>
					<p className='text-dark-very-soft font-medium text-sm mb-0.5 text-[13px] leading-[15px]'>
						SELECTED
					</p>
					<p className='text-yellow font-medium text-[13px] leading-[15px]'>
						{count} ITEMS (≈${ethToUSD(total)})
					</p>
				</div>

				<div>
					<label
						className={cx(
							'flex items-center gap-3 text-dark-very-soft text-xs cursor-pointer select-none',
							isDisabled && 'opacity-60 pointer-events-none'
						)}
					>
						<Switch
							onClick={toggleAllSelection}
							checked={allSelected}
							disabled={isDisabled}
						/>
						SELECT ALL
					</label>
				</div>
			</div>
		</>
	);
};

export default MyBalanceSelectAll;
