import { chats } from '@config/dummy';
import Image from 'next/image';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import cx, { SCROLLBAR } from '@utils/cx';
import { ChatMessage } from './components';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@hooks';

export const Chat = () => {
	const { width } = useWindowSize();
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		if (width && width <= 1600) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	}, [width]);
	return hidden ? (
		<div>
			<button
				onClick={() => setHidden(false)}
				className='w-11 h-11 rounded-xl bg-dark-soft hover:bg-dark-hard duration-150 flex items-center justify-center text-dark-very-soft'
			>
				<HiArrowLeft size={26} />
			</button>
		</div>
	) : (
		<div className='h-full shrink-0 overflow-hidden'>
			<div className='bg-dark-medium border border-dark-border-soft rounded-[20px] h-full flex flex-col'>
				{/* Chat Header --Start-- */}
				<header className='py-[17px] px-5 pl-[30px] flex items-center justify-between flex-wrap gap-5 shrink-0 border-b border-[#1B2035]'>
					{/* Title --Start-- */}
					<div className='flex items-center gap-3'>
						<Image
							src='/images/chat.svg'
							alt='Chat'
							width={22}
							height={22}
							priority
						/>
						<h2 className='title'>Chat</h2>
						{/* <button className='text-sm bg-dark-soft hover:bg-dark-hard duration-150 text-dark-very-soft font-medium rounded-[10px] px-2.5 py-1'>
							Chat Rules
						</button> */}
					</div>
					{/* Title --End-- */}

					{/* Arrow Right Button --Start-- */}
					<div>
						<button
							onClick={() => setHidden(true)}
							className='w-11 h-11 rounded-xl bg-dark-soft hover:bg-dark-hard duration-150 flex items-center justify-center text-dark-very-soft'
						>
							<HiArrowRight size={26} />
						</button>
					</div>
					{/* Arrow Right Button --End-- */}
				</header>
				{/* Chat Header --End-- */}

				<div className={cx('grow overflow-auto bg-dark-medium', SCROLLBAR)}>
					{chats.map((chat, index: number) => (
						<ChatMessage {...chat} key={index} />
					))}
				</div>

				{/* Chat Input --Start-- */}
				<div className='mt-auto shrink-0 px-7 py-5'>
					<form className='relative'>
						<input
							type='text'
							className='rounded-[15px] py-[21px] px-7 bg-dark-soft placeholder:text-dark-very-soft block w-full text-white outline-none border border-dark-soft focus:border-white/20 pr-[110px]'
							placeholder='Message…'
						/>

						<div className='h-[calc(100%-20px)] absolute top-1/2 -translate-y-1/2 right-2.5 flex items-center gap-4'>
							<button
								type='button'
								className='hover:brightness-200 duration-200 flex items-center'
							>
								<Image
									src='/images/sticker.svg'
									alt='Sticker'
									width={18}
									height={18}
								/>
							</button>
							<button
								type='submit'
								className='h-full aspect-square rounded-[10px] flex items-center justify-center send_btn_bg hover:send_btn_bg_hover duration-150'
							>
								<Image
									src='/images/send.png'
									alt='Send'
									width={18}
									height={18}
								/>
							</button>
						</div>
					</form>
				</div>
				{/* Chat Input --End-- */}
			</div>
		</div>
	);
};

export default Chat;
