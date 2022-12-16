import cx from 'classnames';
export default cx;
import type { Styles } from 'react-modal';

export const SCROLLBAR =
	'scrollbar scrollbar-thin scrollbar-thumb-dark-very-soft scrollbar-track-dark-soft scrollbar-none overflow-auto';

export const modalStyles: Styles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '0',
		boxShadow: 'none',
		padding: 0,
		background: 'none',
		border: 'none',
		maxHeight: '90vh',
		overflow: 'auto',
	},
	overlay: {
		background: 'rgba(0,0,0,0.5)',
		backdropFilter: 'blur(15px)',
		zIndex: 9999999,
	},
};

export const commaSeparetor = (str: string | number) =>
	str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const arrayOf = (arr: number) => [...Array(arr).keys()];
