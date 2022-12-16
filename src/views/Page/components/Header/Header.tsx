import Link from 'next/link';
import Image from 'next/image';
import { navItems } from '@config/constants';
import NavLink from './NavLink';
import UserAccount from './UserAccount';

export const Header = () => {
	return (
		<header className='flex px-12 items-center justify-between relative'>
			<div className='flex items-center gap-[50px] grow'>
				<Link href='/'>
					<a className='w-[200px] h-[50px] relative'>
						<Image
							src='/images/rareround_logo.png'
							layout='fill'
							quality={100}
							alt='Rareround'
							className='w-full h-auto'
						/>
					</a>
				</Link>
				<nav className='flex items-center justify-center grow'>
					<ul className='flex items-center gap-[40px]'>
						{navItems.map((item) => (
							<li key={item.url}>
								<NavLink {...item} />
							</li>
						))}
					</ul>
				</nav>
			</div>
			<UserAccount />
		</header>
	);
};

export default Header;
