import Image from 'next/image';
import { Button, ModalHeader, NFTTile } from '@components';
import { useNFTSelection, useWallet } from '@hooks';
import cx, { modalStyles, SCROLLBAR } from '@utils/cx';
import Modal from 'react-modal';
import EmptyScreen from '../EmptyScreen';
import { useState } from 'react';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useDeposit } from '../../hooks';
import { MINIMUM_ETH_BET } from '@config/constants';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

export const DepositModal: React.FC<IProps> = ({ isOpen, onClose }) => {
	const { balance, nfts: assets } = useWallet();
	const { nfts, selectedNFTs, toggleNFTSelection } = useNFTSelection(assets);
	const { deposit, loading } = useDeposit();
	const [eth, setETH] = useState('');

	const numETH = parseEther(eth || '0');
	const enableDeposit =
		selectedNFTs.length || (!numETH.isZero() && numETH.lte(balance));
	const onDeposit = () =>
		deposit(selectedNFTs, numETH).finally(() => {
			setETH('');
			onClose();
		});
	return (
		<Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
			<div className='w-full text-white mx-auto sm:w-[500px] rounded-[20px] overflow-hidden border border-dark-border-soft bg-dark-medium py-[23px] flex flex-col max-h-[90vh]'>
				<ModalHeader
					title='Deposit'
					onClose={onClose}
					className='shrink-0 px-[25px]'
				/>
				<p className='rounded-xl bg-dark-soft p-4 m-[25px] text-sm'>
					Here at RareRound, you can use NFT or ETH to play against other
					players, so RareRound provides several deposit options.
				</p>

				<div className='grow flex flex-col justify-center overflow-auto'>
					{nfts.length ? (
						<div
							className={cx(
								'grid grid-cols-3 gap-[22px] pb-3 pt-1 px-[25px] grow overflow-auto',
								SCROLLBAR
							)}
						>
							{nfts.map((nft) => (
								<NFTTile
									{...nft}
									selected={nft.selected}
									toggleSelection={() => loading || toggleNFTSelection(nft)}
									key={nft.id}
								/>
							))}
						</div>
					) : (
						<EmptyScreen
							message={
								'Your wallet does not contain any NFTs. Purchase some NFTs to play.'
							}
						/>
					)}
				</div>
				<div className='mt-auto px-[25px]'>
					<div className='w-full h-px bg-dark-border-soft mt-6'></div>
					<div className='mt-[18px]'>
						<div className='relative'>
							<input
								type='number'
								id='ether_input'
								value={eth}
								placeholder='Amount'
								onChange={(e) => setETH(e.target.value)}
								disabled={loading}
								className='block w-full rounded-[15px] p-5 pr-16 bg-dark-soft mt-1 outline-none border border-dark-soft focus:border-dark-very-soft font-medium text-white placeholder:text-dark-very-soft'
							/>
							<span className='absolute right-5 top-1/2 -translate-y-1/2 font-medium text-base text-white pointer-events-none'>
								ETH
							</span>
						</div>

						<div className='text-sm'>
							<div className='flex justify-between text-[#484F6C] mt-2'>
								<p>
									Available{' '}
									<span className='text-white'>
										{(+formatEther(balance)).toFixed(4)} ETH
									</span>
								</p>
								<p>
									Not less than {(+formatEther(MINIMUM_ETH_BET)).toFixed(4)} ETH
								</p>
							</div>
							{/* <div className='mt-3 font-medium'>
								<p className='text-dark-very-soft mt-0.5'>SELECTED</p>
								<div className='text-yellow flex items-center gap-[30px] -mt-0.5'>
									<p>
										{selectedNFTs.length} ITEM (≈$
										{commaSeparetor(ethToUSD(nftsValue))})
									</p>
									<p>
										{+eth || 0} ETH (≈$
										{commaSeparetor(ethToUSD(numETH))})
									</p>
								</div>
							</div> */}
						</div>

						<div className='mt-3.5 shrink-0'>
							<Button
								className='flex items-center justify-center gap-3.5 !bg-green duration-150 hover:!bg-green-dark'
								onClick={onDeposit}
								loading={loading}
								disabled={!enableDeposit}
							>
								<Image
									src={'/images/deposit.png'}
									width={20}
									height={18}
									alt='Deposit'
									className='shrink-0'
								/>
								DEPOSIT
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default DepositModal;
