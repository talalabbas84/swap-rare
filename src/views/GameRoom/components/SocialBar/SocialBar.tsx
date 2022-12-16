import { Button } from '@components';
import { BsTwitter } from 'react-icons/bs';
import Image from 'next/image';

export const SocialBar = () => {
	return (
		<div className='flex gap-3'>
			<div className='rounded-[14px] bg-dark-medium px-5 py-[15px] flex gap-2.5 shrink grow-0 overflow-hidden'>
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
					https://rareround.com/dice/124180
				</p>
			</div>
			<Button className='!px-6 !w-auto !bg-[#2595C6] hover:!bg-[#1c83af] !shrink-0 !grow-0'>
				<BsTwitter size={20} />
			</Button>
		</div>
	);
};

export default SocialBar;
