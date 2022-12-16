import { ChessColor } from '@config/types';

interface IProps {
	player?: ChessColor;
}

const ROWS = Array.from({ length: 8 }, (_, i) => i + 1);
const COLS = [...String.fromCharCode(...ROWS.map((value) => value + 64))];
const REVERSE_ROWS = ([] as number[]).concat(ROWS).reverse();
const REVERSE_COLS = ([] as string[]).concat(COLS).reverse();

export const GridIndicators: React.FC<IProps> = ({ player }) => {
	const playerCols = player === 'b' ? REVERSE_COLS : COLS;
	const playerRows = player === 'b' ? ROWS : REVERSE_ROWS;

	const colsIndicators = playerCols.map((col) => (
		<div key={col} className='flex items-center justify-center'>
			{col}
		</div>
	));
	const rowsIndicators = playerRows.map((row) => (
		<div key={row} className='flex items-center justify-center'>
			{row}
		</div>
	));
	return (
		<div className='text-white text-sm font-light opacity-25'>
			<div className='absolute top-0 left-0 w-full h-8 grid grid-cols-8 px-8'>
				{colsIndicators}
			</div>
			<div className='absolute bottom-0 left-0 w-full h-8 grid grid-cols-8 px-8'>
				{colsIndicators}
			</div>
			<div className='absolute top-0 left-0 h-full w-8 grid grid-rows-8 py-8'>
				{rowsIndicators}
			</div>
			<div className='absolute top-0 right-0 h-full w-8 grid grid-rows-8 py-8'>
				{rowsIndicators}
			</div>
		</div>
	);
};

export default GridIndicators;
