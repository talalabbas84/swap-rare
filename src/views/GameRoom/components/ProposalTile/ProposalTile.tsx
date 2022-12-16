import { Button, Wager } from '@components';
import { playerImage, playerName } from '@config/dummy';
import { IBet } from '@config/types';
import { useWallet } from '@hooks';
import { formatUserAddress } from '@utils/format';
import { useAcceptGame } from '../../hooks';
import { BigNumber } from 'ethers';
import Image from 'next/image';

interface IProps {
	proposal: IBet;
}

export const ProposalTile: React.FC<IProps> = ({ proposal }) => {
	const { account, ethToUSD } = useWallet();
	const { accept, loading: loadingAccept } = useAcceptGame();
	const isMe = account === proposal.player;
	const subName = isMe ? 'you' : proposal.isHost ? 'host' : '';
	const value = proposal.nftAssets.reduce(
		(total) => total.add(BigNumber.from('20000000000000000')),
		BigNumber.from(proposal.ethAmount)
	);
	return (
		<tr>
			{/* <td className='py-[16px] bg-dark-medium pl-7'>
				<Checkbox />
			</td> */}
			<td className='py-[16px] bg-dark-medium pl-7'>
				<div className='flex items-center gap-[17px]'>
					<div className='w-10 h-10 rounded-full overflow-hidden relative select-none'>
						<Image
							src={playerImage}
							alt={playerName}
							quality={100}
							layout='fill'
						/>
					</div>
					<p className='text-white text-sm font-medium'>
						{formatUserAddress(proposal.player)}
						{subName && (
							<span className='text-dark-very-soft'> ({subName})</span>
						)}
					</p>
				</div>
			</td>
			<td className='py-[16px] bg-dark-medium'>
				<div className='grid grid-cols-[repeat(3,50px)] gap-2'>
					<Wager
						nfts={proposal.nftAssets}
						eth={BigNumber.from(proposal.ethAmount)}
					/>
				</div>
			</td>
			<td className='py-[16px] bg-dark-medium'>
				<p className='text-yellow font-medium text-sm'>≈${ethToUSD(value)}</p>
			</td>
			<td className='py-[16px] bg-dark-medium' colSpan={2}>
				<div className='flex justify-center px-10'>
					<Button
						loading={loadingAccept}
						onClick={() => accept(proposal)}
						className='shrink-0 w-2/4 !bg-green duration-150 hover:!bg-green-dark'
					>
						ACCEPT REQUEST
					</Button>
				</div>
			</td>
		</tr>
	);
};

export default ProposalTile;
