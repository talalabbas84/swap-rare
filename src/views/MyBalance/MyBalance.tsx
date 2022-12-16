import { useRef } from 'react';
import { useWallet } from '@hooks';
import cx, { SCROLLBAR } from '@utils/cx';
import { ConnectWallet, TopBottomOverlay } from '@components';
import {
	ConnectWalletScreen,
	DepositAssets,
	DepositedItems,
	MyBalanceHeader,
	WithdrawAssets,
} from './components';

export const MyBalance = () => {
	const { active } = useWallet();
	const scrollRef = useRef(null);

	return (
		<div className='h-full shrink-0 overflow-hidden'>
			<div className='bg-dark-medium border border-dark-border-soft rounded-[20px] h-full flex flex-col'>
				{/* Top Part --Start-- */}
				<MyBalanceHeader />
				<div className='grow flex overflow-auto flex-col relative'>
					<div
						ref={scrollRef}
						className={cx('grow text-white relative', SCROLLBAR)}
					>
						{active ? (
							<DepositedItems />
						) : (
							<div className='flex flex-col justify-center items-center absolute w-full h-full'>
								<ConnectWalletScreen />
							</div>
						)}
					</div>
					<TopBottomOverlay
						elmRef={scrollRef}
						overlyClassName='from-dark-medium'
					/>
				</div>
				{active && (
					<div className='mt-auto px-[30px] py-5 flex gap-3'>
						<DepositAssets />
						<WithdrawAssets />
					</div>
				)}
				{/* Bottom Part --End-- */}
			</div>
		</div>
	);
};

export default MyBalance;
