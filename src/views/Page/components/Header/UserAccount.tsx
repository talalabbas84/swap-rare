import { ConnectWallet } from '@components';
import { useBalance, useWallet } from '@hooks';
import { formatAccountAddress } from '@utils/format';
import { useOnlineUsers } from '../../hooks';
import Image from 'next/image';

export const UserAccount = () => {
	const usersCount = useOnlineUsers();
	const { account, active, disconnect, ethToUSD } = useWallet();
	const { nfts, eth } = useBalance();
	const displayAddress = formatAccountAddress(account || '');
	const total = nfts.reduce((acc, curr) => acc.add(curr.ethPrice), eth);
	return (
		<div>
			{active ? (
				<div className='flex items-center justify-center gap-7 text-sm'>
					<div className='text-white text-sm font-medium'>
						<div>{displayAddress}</div>
						<div className='text-yellow'>≈${ethToUSD(total)}</div>
					</div>
					<div className='relative rounded-full overflow-hidden w-[50px] h-[50px] ring-2 ring-blue'>
						<Image layout='fill' src='/images/user_avatar.png' alt='user' />
					</div>
					<button
						className='relative w-[15px] h-[15px] text-[#494F6A]'
						style={{
							filter:
								'invert(28%) sepia(35%) saturate(450%) hue-rotate(192deg) brightness(94%) contrast(85%)',
						}}
						onClick={disconnect}
					>
						<Image
							layout='fill'
							src='/images/disconnect.png'
							alt='disconnect'
						/>
					</button>
					<div className='flex items-center gap-1'>
						<div className='w-[7px] h-[7px] bg-green rounded-full' />
						<div className='text-green leading-none'>{usersCount}</div>
					</div>
				</div>
			) : (
				<ConnectWallet />
			)}
		</div>
	);
};

export default UserAccount;
