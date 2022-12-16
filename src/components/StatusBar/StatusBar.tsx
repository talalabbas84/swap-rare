import { useBalanceSelection, useWallet } from '@hooks';
import { BigNumber } from 'ethers';

export const StatusBar = () => {
	const { ethToUSD } = useWallet();
	const { eth, selectedNFTs, ethSelected } = useBalanceSelection();
	const total = selectedNFTs.reduce(
		(acc, asset) => acc.add(asset.ethPrice),
		ethSelected ? eth : BigNumber.from(0)
	);
	const chance = selectedNFTs.length || ethSelected ? 50 : 0;
	return (
		<div className='grid grid-cols-3 bg-dark-medium rounded-[14px]'>
			<div className='py-4 px-5'>
				<p className='subtitle'>Buy-in</p>
				<h6 className='title'>${ethToUSD(total)}</h6>
			</div>
			<div className='py-4 px-5'>
				<p className='subtitle'>Winnings</p>
				<h6 className='title'>${ethToUSD(total.mul(2))}</h6>
			</div>
			<div className='py-4 px-5'>
				<p className='subtitle'>Chance</p>
				<h6 className='title'>{chance}%</h6>
			</div>
		</div>
	);
};

export default StatusBar;
