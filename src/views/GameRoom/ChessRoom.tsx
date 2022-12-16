import { FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import { ProposalsAndBets } from './components';
import { GameType } from '@config/types';
import { useBalanceSelection, useGame, useWallet } from '@hooks';
import { STATUS_TO_TITLE } from '@config/constants';
import { formatAccountAddress } from '@utils/format';
import { BsPlus } from 'react-icons/bs';
import { useConfirmBet } from './hooks';
import { BigNumber } from 'ethers';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import cx, { SCROLLBAR } from '@utils/cx';

export const ChessRoom = () => {
	const router = useRouter();
	const { game, proposals } = useGame();
	const { account } = useWallet();
	const { confirm, loading } = useConfirmBet();
	const { selectedNFTs, ethSelected, eth } = useBalanceSelection();
	const disabled = !(selectedNFTs.length || ethSelected);
	const isCreator = account && game?.player1 === account;
	const haveSubmitted = proposals.some((p) => p.player === account);
	const isActive = game?.status === 'active';

	useEffect(() => {
		isActive && router.push(`/chess/${game?.id}/match`);
	}, [game?.id, isActive, router]);

	const onConfirm = () => {
		confirm(selectedNFTs, ethSelected ? eth : BigNumber.from(0));
	};
	return (
		<div className='flex flex-col gap-6 flex-grow'>
			<div className='relative bg-dark-soft'>
				<div
					className='absolute w-full h-full'
					style={{ background: 'url(/images/chess-pattern.png)' }}
				/>
				<div className='flex flex-col items-center justify-center w-full p-4'>
					<div className='text-white font-medium text-lg'>Classic Chess</div>
					<div className='text-blue font-light text-md'>
						{game ? STATUS_TO_TITLE[game.status] : 'Loading...'}
					</div>
					<div className='text-[#6F78A7] font-medium'>#{game?.id}</div>
				</div>
			</div>
			<div className='flex flex-row items-center justify-center gap-14'>
				<div className='flex flex-col items-center justify-between gap-3'>
					<Image
						className='rounded-3xl'
						src='/images/user_avatar.png'
						width={120}
						height={120}
						alt='user'
					/>
					<div className='text-white text-sm font-medium'>
						{formatAccountAddress(game?.player1)}
					</div>
				</div>
				<div className='text-[#6F78A740] text-5xl font-medium px-1'>VS</div>
				<div className='flex flex-col items-center justify-between gap-3'>
					{game?.player2 ? (
						<Image
							className='rounded-3xl'
							src='/images/user_avatar.png'
							width={120}
							height={120}
							alt='user'
						/>
					) : isCreator ? (
						<div className='flex justify-center items-center gap-2 h-[120px] w-[120px] border-dashed border-2 border-[#6F78A740] rounded-3xl'>
							<div className='rounded-full w-2 h-2 bg-[#6F78A740]' />
							<div className='rounded-full w-2 h-2 bg-[#6F78A740]' />
							<div className='rounded-full w-2 h-2 bg-[#6F78A740]' />
						</div>
					) : (
						<button
							onClick={onConfirm}
							disabled={disabled}
							className={disabled ? 'opacity-30' : ''}
						>
							<div className='flex justify-center items-center border-dashed border-2 border-blue rounded-3xl w-[120px] h-[120px]'>
								<BsPlus color='white' size='50%' strokeWidth={0.5} />
							</div>
						</button>
					)}
					<div className='text-white text-sm font-medium'>
						{game?.player2
							? formatAccountAddress(game.player2)
							: isCreator || haveSubmitted
							? 'Awaiting...'
							: 'Join'}
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center gap-4'>
				<div className='rounded-xl bg-dark-medium px-5 py-[15px] flex gap-2 w-fit'>
					<div className='flex items-center shrink-0'>
						<Image
							src='/images/accept_game_copy.svg'
							alt='Copy'
							width={18}
							height={18}
							quality={100}
						/>
					</div>
					<p className='text-dark-very-soft line-clamp-1'>
						https://rareround.com/chess/{game?.id}
					</p>
				</div>
				<div className='bg-[#1D9BF0] p-4 rounded-2xl'>
					<FaTwitter color='white' size={30} />
				</div>
			</div>
			<div
				className={cx('grow relative mt-6 md:mt-0 overflow-auto', SCROLLBAR)}
			>
				<ProposalsAndBets gameType={GameType.CHESS} />
			</div>
		</div>
	);
};

export default ChessRoom;
