import { Wager } from '@components';
import { useBalanceSelection } from '@hooks';
import { ChessGameProvider, GameProvider } from '@contexts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	CapturedPieces,
	ChessBoard,
	CircleTimer,
	MovesHistory,
} from './components';

export const ChessMatch = () => {
	const { selectedNFTs, eth, ethSelected } = useBalanceSelection();
	const {
		query: { gameId },
	} = useRouter();
	return (
		<GameProvider gameId={gameId as string}>
			<ChessGameProvider>
				<div className='flex flex-col w-full justify-between relative'>
					<div className='flex flex-row justify-between gap-3 w-full h-[64%]'>
						<ChessBoard />
						<MovesHistory />
					</div>
					<div className='flex flex-col justify-between h-[34%]'>
						<div className='relative bg-dark-soft h-[37%]'>
							<Image
								src='/images/chess-pattern.png'
								alt='pattern'
								layout='fill'
							/>
							<div className='flex flex-col items-center justify-center w-full h-full p-4'>
								<div className='text-white font-medium text-3xl'>6:42</div>
								<div className='text-[#6F78A7] font-medium'>#1301</div>
							</div>
						</div>
						<div className='flex flex-row items-center w-full h-[57%] justify-between pb-3'>
							<div className='flex flex-row items-center w-[44%] h-full justify-between'>
								<div className='w-[30%]'>
									<Wager
										nfts={selectedNFTs}
										eth={ethSelected ? eth : undefined}
										showEmpty={true}
										type='grid'
										hidePlus={true}
									/>
								</div>
								<div className='w-[30%] h-[80%]'>
									<CircleTimer color='w' />
								</div>
								<div className='relative flex flex-col justify-evenly items-center h-full w-[30%]'>
									<div className='relative w-full grow m-auto'>
										<Image
											className='rounded-3xl'
											src='/images/user_avatar.png'
											layout='fill'
											alt='user'
											objectFit='cover'
										/>
									</div>
									<p className='text-white text-center'>Warlock</p>
									<div className='absolute top-[100%] w-full'>
										<CapturedPieces color='w' />
									</div>
								</div>
							</div>
							<div className='text-[#6F78A740] text-4xl font-medium w-[9%] text-center'>
								VS
							</div>
							<div className='flex flex-row-reverse items-center w-[44%] justify-between h-full'>
								<div className='w-[30%]'>
									<Wager
										nfts={selectedNFTs}
										eth={ethSelected ? eth : undefined}
										showEmpty={true}
										type='grid'
										hidePlus={true}
									/>
								</div>
								<div className='w-[30%] h-[80%]'>
									<CircleTimer color='b' />
								</div>
								<div className='relative flex flex-col justify-evenly items-center h-full w-[30%]'>
									<div className='relative w-full grow m-auto'>
										<Image
											className='rounded-3xl'
											src='/images/user_avatar.png'
											layout='fill'
											alt='user'
											objectFit='cover'
										/>
									</div>
									<p className='text-white text-center'>Warlock</p>
									<div className='absolute top-[100%] w-full'>
										<CapturedPieces color='b' />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ChessGameProvider>
		</GameProvider>
	);
};

export default ChessMatch;
