import { useMemo } from 'react';
import Link from 'next/link';
import { BigNumber } from 'ethers';
import { IGameInfo } from '@config/types';
import { Wager } from '@components';

interface IProps {
	game: IGameInfo;
}

export const GameTile: React.FC<IProps> = ({ game }) => {
	const { bets } = game;
	const { nfts, eth } = useMemo(
		() => ({
			nfts: Object.values(bets)
				.map(({ nftAssets }) => nftAssets)
				.flat(),
			eth: Object.values(bets).reduce(
				(total, { ethAmount }) => total.add(ethAmount),
				BigNumber.from(0)
			),
		}),
		[bets]
	);
	return (
		<Link href={`/games/${game.id}`} passHref={true}>
			<a className='px-[20px] py-[25px] bg-dark-medium border border-dark-border-soft rounded-[20px] gap-3 flex justify-between'>
				<div className='col-span-1'>
					<p className='subtitle'>Buy-in</p>
					<h6 className='title'>$1020</h6>
				</div>
				<div className='col-span-1'>
					<div className='flex items-center gap-2'>
						{/* <div className='flex items-center gap-2 bg-dark-soft rounded-[5px] px-2.5 py-2.5'>
								<div className='shrink-0 flex items-center'>
									<Image
										src='/images/players.svg'
										alt='Players'
										width={18}
										height={18}
									/>
								</div>
								<div className='text-[#484F6C] font-light text-sm'>
									<span className='text-white'>{Object.keys(bets).length}</span>
									/2
								</div>
							</div> */}
						<p className='font-light text-[#494F6A]'>Bets</p>

						<div className='grid grid-cols-[repeat(3,48px)] md:justify-center content-center gap-2 col-span-2 md:col-span-1'>
							<Wager nfts={nfts} eth={eth} />
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default GameTile;
