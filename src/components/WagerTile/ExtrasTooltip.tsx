import { PropsWithChildren } from 'react';
import { Tooltip } from 'react-tippy';
import WagerTile, { IWagerProps } from './WagerTile';

interface IProps extends PropsWithChildren {
	items: IWagerProps[];
}

export const ExtrasTooltip: React.FC<IProps> = ({ items, children }) => {
	return (
		//@ts-ignore
		<Tooltip
			html={
				<div
					style={{
						gridTemplateColumns: `repeat(${Math.min(2, items.length)},1fr)`,
					}}
					className='grid gap-2 p-2 rounded-[12px] bg-dark-soft border border-[#252b49]'
				>
					{items.map((item, _index) => (
						<div
							key={_index}
							className='w-[48px] h-[48px] rounded-[13px] overflow-hidden cursor-pointer duration-150 hover:scale-[1.1]'
						>
							<WagerTile {...item} />
						</div>
					))}
				</div>
			}
			position='bottom'
			trigger='click'
			arrow
		>
			{children}
			<div className='absolute pointer-events-none top-0 left-0 w-full h-full text-2xl font-semibold cursor-pointer flex items-center justify-center z-50 bg-[#131625]/60'>
				<span className='text-white'>+{items.length}</span>
			</div>
		</Tooltip>
	);
};
