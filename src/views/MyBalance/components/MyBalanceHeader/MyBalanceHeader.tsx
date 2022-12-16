import Image from 'next/image';
import { IoSettingsSharp } from 'react-icons/io5';
import MyBalanceHeaderStats from './MyBalanceHeaderStats';
import MyBalanceSelectAll from './MyBalanceSelectAll';

export const MyBalanceHeader = () => {
	return (
		<div className='shrink-0'>
			<header className='py-[17px] px-5 pl-[30px] flex items-center justify-between flex-wrap gap-5'>
				{/* Title --Start-- */}
				<div className='flex items-center gap-3'>
					<Image
						src='/images/my_balance_icon.svg'
						alt='My balance'
						width={22}
						height={22}
						priority
					/>
					<h2 className='title'>My Balance</h2>
				</div>
				<div>
					<button className='w-11 h-11 rounded-xl bg-dark-soft hover:bg-dark-hard duration-150 flex items-center justify-center text-dark-very-soft'>
						<IoSettingsSharp size={26} />
					</button>
				</div>
			</header>
			<MyBalanceHeaderStats />
			<MyBalanceSelectAll />
		</div>
	);
};

export default MyBalanceHeader;
