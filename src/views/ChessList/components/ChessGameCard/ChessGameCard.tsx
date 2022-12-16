import Image from 'next/image';
import { Wager } from '@components';
import { BsPlus } from 'react-icons/bs';
import { GameStatusType, IGameInfo } from '@config/types';
import { STATUS_TO_TITLE, STATUS_TO_WAGER } from '@config/constants';
import { formatAccountAddress } from '@utils/format';
import Link from 'next/link';

interface IProps {
	game: IGameInfo;
}

export const ChessGameCard: React.FC<IProps> = ({ game }) => {
	const { player1, player2, id, status, bets } = game;
	const link =
		status === GameStatusType.FINISHED
			? '/chess'
			: `/chess/${game.id}/${player2 ? 'match' : ''}`;
	const statusColor = status === GameStatusType.CREATED ? 'blue' : 'white';
	const statusOpacity = status === GameStatusType.ACTIVE ? 50 : 100;
	const cardOpacity = status === GameStatusType.FINISHED ? 50 : 100;
	const arrow =
		game.winner === game.player1
			? '<'
			: game.winner === game.player2
			? '>'
			: '=';
	return (
		<Link href={link} passHref={true}>
			<a
				className={`opacity-${cardOpacity} ${
					status === GameStatusType.FINISHED ? 'pointer-events-none' : ''
				} flex flex-col gap-4 py-6 border border-dark-border-soft rounded-3xl`}
			>
				<div
					className='relative bg-dark-soft'
					style={{
						background:
							status === GameStatusType.CREATED
								? 'linear-gradient(0deg, rgba(32, 114, 229, 0.1), rgba(32, 114, 229, 0.1)), #1B2035'
								: '',
					}}
				>
					<div
						className='absolute w-full h-full'
						style={{ background: 'url(/images/chess-pattern.png)' }}
					/>
					<div className='flex flex-col items-center justify-center w-full p-2'>
						<div className='text-white font-medium text-lg'>Classic Chess</div>
						<div
							className={`text-${statusColor} opacity-${statusOpacity} font-light text-md`}
						>
							{STATUS_TO_TITLE[status]}
						</div>
						<div className='text-[#6F78A7] font-medium'>#{id}</div>
					</div>
				</div>
				<div className='flex flex-col gap-6 px-3'>
					<div className='flex flex-row items-center w-full justify-between'>
						<div className='flex flex-col items-center w-full justify-between gap-2'>
							<Image
								className='rounded-3xl'
								src='/images/user_avatar.png'
								width={80}
								height={80}
								alt='user'
							/>
							<div className='text-white text-sm font-medium'>
								{formatAccountAddress(player1)}
							</div>
						</div>
						<div className='text-[#6F78A740] text-3xl font-medium px-3'>
							{status === GameStatusType.FINISHED ? arrow : 'VS'}
						</div>
						<div className='flex flex-col items-center w-full h-full justify-between gap-2'>
							{player2 ? (
								<Image
									className='rounded-3xl'
									src='/images/user_avatar.png'
									width={80}
									height={80}
									alt='user'
								/>
							) : (
								<div className='flex justify-center items-center border-dashed border-2 border-blue rounded-3xl w-[80px] h-[80px]'>
									<BsPlus color='white' size='50%' strokeWidth={0.5} />
								</div>
							)}
							<div className='text-white text-sm font-medium'>
								{player2 ? formatAccountAddress(player2) : 'Join'}
							</div>
						</div>
					</div>
					<div className='flex flex-col items-center justify-center gap-2'>
						<div className='text-md text-dark-very-soft'>Bets</div>
						<div className='flex flex-row w-full'>
							<Wager
								nfts={bets.player1.nftAssets}
								eth={bets.player1.ethAmount}
								showEmpty={true}
								type='grid'
								hidePlus={true}
							/>
							<div className='bg-dark-soft w-[2px] mx-5' />
							<Wager
								nfts={bets.player2?.nftAssets || []}
								eth={bets.player2?.ethAmount}
								showEmpty={true}
								type='grid'
								hidePlus={true}
							/>
						</div>
					</div>
					<div className='flex flex-col justify-center items-center'>
						<p className='subtitle'>{STATUS_TO_WAGER[status]}</p>
						<h6 className='title'>$58414.31</h6>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default ChessGameCard;
