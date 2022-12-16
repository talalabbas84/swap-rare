import { ChessColor } from '@config/types';
import { Chess, PieceType, Square } from 'chess.js';

export class ExtendedChess extends Chess {
	public get_captured_pieces = (color: ChessColor) => {
		const captured: PieceType[] = [];
		this.history({ verbose: true }).forEach(
			(move) =>
				move.captured && move.color === color && captured.push(move.captured)
		);
		return captured;
	};
}

const squareToCoords = (square: Square) => {
	return {
		x: (+square.charCodeAt(0) - 65) * 50,
		y: (+square[1] - 1) * 50,
	};
};

export const getDistance = (from: Square, to: Square) => {
	const fromCoords = squareToCoords(from);
	const toCoords = squareToCoords(to);

	let x = toCoords.x - fromCoords.x;
	let y = toCoords.y - fromCoords.y;

	return { x, y };
};

export class Timer {
	private timerId: NodeJS.Timeout;
	private cb: () => void;
	private startTime: number;
	private elapsed: number;
	private resumeTime: number;
	private duration: number;
	public paused: boolean = false;

	constructor(cb: () => void, duration: number, paused = false) {
		this.cb = cb;
		this.startTime = new Date().getTime();
		this.duration = duration;
		this.resumeTime = this.startTime;
		this.timerId = setTimeout(this.cb, duration);
		this.elapsed = 0;
		paused && this.pause();
	}

	getRemaining = () => {
		if (this.paused) return this.duration - this.elapsed;
		return (
			this.duration - (new Date().getTime() - this.resumeTime + this.elapsed)
		);
	};

	pause = () => {
		if (this.paused) return;
		this.paused = true;
		clearTimeout(this.timerId);
		this.elapsed += new Date().getTime() - this.resumeTime;
	};

	resume = () => {
		if (!this.paused) return;
		this.resumeTime = new Date().getTime();
		const duration = this.duration - this.elapsed;
		this.timerId = setTimeout(this.cb, duration);
		this.paused = false;
	};

	setCallBack = (cb: () => void) => (this.cb = cb);

	setRemaining = (remaining: number) => {
		const wasPaused = this.paused;
		this.pause();
		this.elapsed += this.getRemaining() - remaining;
		wasPaused ? this.pause() : this.resume();
	};
}
