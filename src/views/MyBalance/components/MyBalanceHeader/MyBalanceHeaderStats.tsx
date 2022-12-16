import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useBalance, useWallet } from '@hooks';

export const MyBalanceHeaderStats = () => {
	const { ethToUSD } = useWallet();
	const { eth, nfts } = useBalance();
	const nftTotal = nfts.reduce(
		(acc, nft) => acc.add(nft.ethPrice),
		BigNumber.from(0)
	);
	const total = nftTotal.add(eth);
	return (
		<>
			<div
				style={{
					backgroundImage: "url('/images/back_balances_bg.jpg')",
				}}
				className='bg-cover bg-no-repeat py-4 pl-[38px] pr-[27px] grid grid-cols-3'
			>
				<div>
					<p className='text-dark-very-soft font-medium text-sm mb-1'>
						NFT ASSETS
					</p>
					<p className='text-yellow font-medium text-[15px] leading-[19px]'>
						{nfts.length} ITEMS
					</p>
					<p className='text-yellow font-medium text-[15px] leading-[19px]'>
						≈${ethToUSD(nftTotal)}
					</p>
				</div>
				<div>
					<p className='text-dark-very-soft font-medium text-sm mb-1'>
						ETH BALANCE
					</p>
					<p className='text-yellow font-medium text-[15px] leading-[19px]'>
						{(+formatEther(eth)).toFixed(4)} ETH
					</p>
					<p className='text-yellow font-medium text-[15px] leading-[19px]'>
						≈${ethToUSD(eth)}
					</p>
				</div>
				<div>
					<p className='text-dark-very-soft font-medium text-sm mb-1'>
						TOTAL BALANCE
					</p>
					<p className='text-yellow font-medium text-[15px] leading-[19px]'>
						≈${ethToUSD(total)}
					</p>
				</div>
			</div>
		</>
	);
};

export default MyBalanceHeaderStats;
