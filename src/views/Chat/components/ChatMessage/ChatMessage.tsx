import Image from 'next/image';
import cx from '@utils/cx';
import { ChatMessageType } from '@config/types';

export const ChatMessage: React.FC<ChatMessageType> = ({
	avatarSrc,
	name,
	message,
	time,
	label,
	labelColor,
}) => {
	return (
		<div className='flex justify-between px-5 md:px-[34px] hover:bg-dark-soft py-2.5 cursor-pointer duration-75'>
			{/* Chat Image And Texts --Start-- */}
			<div className='flex items-center gap-2.5'>
				{/* Chat Image --Start-- */}
				<div
					style={{
						boxShadow: labelColor ? `0 0 0 2px ${labelColor}` : undefined,
					}}
					className={cx('w-10 h-10 rounded-full overflow-hidden')}
				>
					<div className={cx('w-full h-full rounded-full overflow-hidden')}>
						<Image
							src={avatarSrc}
							alt='User'
							quality={100}
							width={150}
							height={150}
							priority
						/>
					</div>
				</div>
				<div>
					<h6 className='font-medium text-[13px] leading-[16px] text-white mb-1'>
						{name}
						{label && (
							<span
								style={{ background: labelColor || undefined }}
								className='text-[#9F2828] font-semibold text-[10px] px-1.5 py-0.5 rounded-md ml-2'
							>
								{label}
							</span>
						)}
					</h6>
					<p className='font-medium text-[13px] leading-[16px] text-[#6B6F82]'>
						{message}
					</p>
				</div>
				{/* Chat Image --End-- */}
			</div>
			{/* Chat Image And Texts --End-- */}

			{/* Chat Time --Start-- */}
			<div>
				<p className='font-medium text-[10px] leading-[12px] text-[#6B6F82]'>
					{time}
				</p>
			</div>
			{/* Chat Time --End-- */}
		</div>
	);
};

export default ChatMessage;
