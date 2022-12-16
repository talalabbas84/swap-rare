import { BoardSquare } from '@config/types';
import { useChessGame } from '@hooks';
import { useRef, DragEvent } from 'react';

export const usePieceDrag = (
	square: BoardSquare,
	scale = 1,
	highlight = false
) => {
	const { selectSquare, pieceRef } = useChessGame();
	const ref = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const diff = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const onDragStart = (e: DragEvent<HTMLDivElement>) => {
		const img = document.createElement('img');
		img.src =
			'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
		e.dataTransfer.setDragImage(img, 0, 0);
		diff.current = {
			x: e.nativeEvent.offsetX,
			y: e.nativeEvent.offsetY,
		};
		if (ref.current && pieceRef.current) {
			const elem = ref.current;
			pieceRef.current.style.transform = `scale(${scale})`;
			elem.style.pointerEvents = 'none';
			elem.style.display = 'none';
		}
		selectSquare(square.square);
	};
	const onDrag = (e: DragEvent<HTMLDivElement>) => {
		if (pieceRef.current) {
			const elem = pieceRef.current;
			elem.style.transform = `scale(${scale})`;
			elem.style.display = 'block';
			elem.style.left = e.clientX - diff.current.x + 'px';
			elem.style.top = e.clientY - diff.current.y + 'px';
		}
	};
	const onDragEnd = () => {
		if (ref.current) {
			const elem = ref.current;
			elem.style.display = 'block';
		}
		if (pieceRef.current) {
			pieceRef.current.style.display = 'none';
		}
	};

	const onDragOver = (e: DragEvent) => {
		e.preventDefault();
		highlight &&
			(containerRef.current!.style.background =
				'linear-gradient(0deg, rgba(32, 114, 229, 0.15), rgba(32, 114, 229, 0.15)), #1B2035');
	};

	const onDragLeave = () => {
		containerRef.current!.style.background = '';
	};

	const onDrop = () => {
		onDragEnd();
		selectSquare(square.square);
		onDragLeave();
	};

	return {
		ref,
		containerRef,
		onDrag,
		onDragEnd,
		onDragStart,
		onDrop,
		onDragOver,
		onDragLeave,
	};
};

export default usePieceDrag;
