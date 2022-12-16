import { Button, Wager } from '@components';
import { playerImage, playerName } from '@config/dummy';
import { IBet } from '@config/types';
import { useWallet } from '@hooks';
import { arrayOf } from '@utils/cx';
import { formatUserAddress } from '@utils/format';
import { BigNumber } from 'ethers';
import Image from 'next/image';

interface IProps {
	bet: IBet;
	showEmpty?: boolean;
	showRoll?: boolean;
}

export const BetTile: React.FC<IProps> = ({
	bet,
	showEmpty,
	showRoll = true,
}) => {
	const { account, ethToUSD } = useWallet();
	const isMe = account === bet.player;
	const subName = isMe ? 'you' : bet.isHost ? 'host' : '';
	const value = bet.nftAssets.reduce(
		(total) => total.add(BigNumber.from('20000000000000000')),
		BigNumber.from(bet.ethAmount)
	);
	const score = bet.rolls?.reduce((total, roll) => total + roll, 0);
	return (
		<tr>
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
						{formatUserAddress(bet.player)}
						{subName && (
							<span className='text-dark-very-soft'> ({subName})</span>
						)}
					</p>
				</div>
			</td>
			<td className='py-[16px] bg-dark-medium'>
				<div className='grid grid-cols-[repeat(3,50px)] gap-2'>
					<Wager
						nfts={bet.nftAssets}
						eth={BigNumber.from(bet.ethAmount)}
						showEmpty={showEmpty}
					/>
				</div>
			</td>
			<td className='py-[16px] bg-dark-medium'>
				<p className='text-yellow font-medium text-sm'>≈${ethToUSD(value)}</p>
			</td>
			{showRoll ? (
				<>
					<td className='py-[16px] bg-dark-medium'>
						<div className='flex gap-3.5'>
							{bet.rolls
								? bet.rolls.map((value, i) => (
										<div
											key={i}
											className='relative w-[50px] h-[50px] rounded-[8px] flex items-center justify-center bg-[#363C57] text-dark-hard font-medium text-3xl'
										>
											<Image
												layout='fill'
												src={`/images/dice/dice-${value}.png`}
												alt={`${value}`}
											/>
										</div>
								  ))
								: arrayOf(3).map((e) => (
										<div
											key={e}
											className='w-[50px] h-[50px] rounded-[8px] flex items-center justify-center bg-[#363C57] text-dark-hard font-medium text-3xl'
										>
											?
										</div>
								  ))}
						</div>
					</td>
					<td className='py-[16px] bg-dark-medium'>
						<div className='w-[37px] h-[37px] bg-dark-soft rounded-[8px] flex items-center justify-center text-dark-very-soft font-medium'>
							{score || '?'}
						</div>
					</td>
				</>
			) : (
				<td className='py-[16px] bg-dark-medium' colSpan={2}>
					<div className='flex justify-center px-10'>
						<Button
							disabled
							className='shrink-0 w-2/4 opacity-0 cursor-default'
						>
							ACCEPT REQUEST
						</Button>
					</div>
				</td>
			)}
		</tr>
	);
};

export default BetTile;
