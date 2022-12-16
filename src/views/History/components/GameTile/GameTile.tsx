import { Wager } from '@components';
import { IGameInfo } from '@config/types';
import { useWallet } from '@hooks';
import cx from '@utils/cx';
import dayjs from 'dayjs';
import { BigNumber } from 'ethers';
import Image from 'next/image';

interface IProps {
	game: IGameInfo;
}
export const GameTile: React.FC<IProps> = ({ game }) => {
	const { account } = useWallet();
	const isWinner = account === game.winner;
	const borderColor = isWinner ? '#4CB675' : '#F67171';
	const { bets } = game;
	const allNFTs = [
		...bets.player1.nftAssets,
		...(bets.player2?.nftAssets || []),
	];
	const allETH = BigNumber.from(bets.player1.ethAmount).add(
		bets.player2?.ethAmount || 0
	);

	return (
		<tr style={{ '--border-color': borderColor } as React.CSSProperties}>
			<td className='py-[16px] bg-dark-medium pl-[30px] text-white font-medium'>
				$2853.25
			</td>
			<td className='py-[16px] bg-dark-medium'>
				<div className='inline-flex items-center gap-2 bg-dark-soft rounded-[5px] px-2.5 py-2.5'>
					<div className='shrink-0 flex items-center'>
						<Image
							src='/images/players.svg'
							alt='Players'
							width={18}
							height={18}
						/>
					</div>
					<div className='text-[#484F6C] font-light text-sm'>
						<span className='text-white'>2</span>
						/2
					</div>
				</div>
			</td>
			<td className='py-[16px] bg-dark-medium'>
				<div className='inline-grid grid-cols-[repeat(3,50px)] gap-2'>
					<Wager nfts={allNFTs} eth={allETH} />
				</div>
			</td>
			<td className='py-[16px] bg-dark-medium'>
				<p className='text-yellow font-medium text-sm'>≈$2853.25</p>
			</td>
			<td
				className={cx(
					'py-[16px] bg-dark-medium font-medium capitalize',
					isWinner ? 'text-green' : 'text-red'
				)}
			>
				{isWinner ? 'win' : 'loss'}
			</td>
			<td className='py-[16px] bg-dark-medium text-dark-very-soft font-medium'>
				{dayjs(game.finishedAt).format('DD/MM/YY hh:mm:ss')}
			</td>
		</tr>
	);
};

export default GameTile;
