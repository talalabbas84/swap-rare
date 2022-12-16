import { useState, useEffect } from 'react';
import cx from '@utils/cx';

export const TopBottomOverlay = ({
	elmRef,
	overlyClassName = 'from-dark-hard',
}: {
	elmRef: any;
	overlyClassName?: string;
}) => {
	const [isShowTopOverly, setIsShowTopOverly] = useState(false);
	const [isShowBottomOverly, setIsShowBottomOverly] = useState(false);

	useEffect(() => {
		const div = elmRef.current;
		const calcScroll = () => {
			if (div.scrollTop + div.clientHeight + 5 >= div.scrollHeight) {
				setIsShowBottomOverly(false);
			} else {
				setIsShowBottomOverly(true);
			}
			if (div.scrollTop <= 0) {
				setIsShowTopOverly(false);
			} else {
				setIsShowTopOverly(true);
			}
		};
		div.addEventListener('scroll', calcScroll);
		calcScroll();
		return () => {
			div.removeEventListener('scroll', calcScroll);
		};
	}, [elmRef]);

	return (
		<>
			<div
				className={cx(
					'absolute top-0 left-0 w-full h-[100px] z-20 pointer-events-none bg-gradient-to-b to-transparent duration-300',
					overlyClassName,
					isShowTopOverly ? 'opacity-100' : 'opacity-0'
				)}
			></div>
			<div
				className={cx(
					'absolute bottom-0 left-0 w-full h-[100px] z-20 pointer-events-none bg-gradient-to-t to-transparent duration-300',
					overlyClassName,
					isShowBottomOverly ? 'opacity-100' : 'opacity-0'
				)}
			></div>
		</>
	);
};

export default TopBottomOverlay;
