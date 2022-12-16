import React, { ComponentProps } from 'react';
import cx from '@utils/cx';

export const Switch: React.FC<ComponentProps<'input'>> = (props) => {
	return (
		<label
			className={cx(
				props.disabled && 'opacity-60 cursor-not-allowed pointer-events-none'
			)}
		>
			<input type='checkbox' className='_switch' {...props} />
			<div className='switch_wrapper'>
				<div className='switch_innter'></div>
			</div>
		</label>
	);
};
export default Switch;
