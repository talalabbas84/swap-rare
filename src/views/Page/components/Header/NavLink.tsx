import { NavItemType } from '@config/types';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const NavLink: React.FC<NavItemType> = ({ url, title, icon, label }) => {
	const router = useRouter();
	return (
		<Link href={url}>
			<a className='py-8 px-4 relative flex items-center group text-[#6F78A7] hover:text-white'>
				{icon && (
					<Image
						src={icon}
						alt={title}
						className='group-hover:brightness-200 duration-150'
						width={24}
						height={24}
						priority
					/>
				)}
				{title}
				{label && (
					<span
						className={cx(
							'absolute top-[calc(50%-18px)] -translate-y-1/2 left-[calc(100%-20px)] text-[10px] bg-blue text-[#0E366F] font-medium rounded-md px-1.5 pb-px pt-0.5 block'
						)}
					>
						{label}
					</span>
				)}
			</a>
		</Link>
	);
};

export default NavLink;
