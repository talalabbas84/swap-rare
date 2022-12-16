import { ChessColor } from '@config/types';
import { useChessGame } from '@hooks';
import { Timer } from '@utils/chess';
import { useEffect, useRef, useState } from 'react';

interface IProps {
	size?: number;
	onComplete?: () => void;
	color: ChessColor;
}

const size = 100;
const stroke = 3;

export const CircleTimer: React.FC<IProps> = ({ color }) => {
	const { game, status, players } = useChessGame();
	const [remainingTime, setRemainingTime] = useState(0);
	const [paused, setPaused] = useState(true);
	const ref = useRef<HTMLDivElement>(null);
	const timerRef = useRef<Timer>();
	const player = players?.[color];
	const turn = game.turn();

	const radius = size / 2 - stroke / 2;
	const circumference = radius * 2 * Math.PI;
	const ratio = player?.totalTime
		? remainingTime / (player.totalTime / 1000) - 1
		: -1;
	const offset = ratio * circumference;
	const seconds = remainingTime % 60;
	const minutes = Math.floor(remainingTime / 60);

	useEffect(() => {
		if (!player) return;
		timerRef.current?.pause();
		const timer = new Timer(() => null, player.totalTime, true);
		timer.setRemaining(Math.max(player.timeRemaining, 0));
		timerRef.current = timer;
		const interval = setInterval(
			() =>
				setRemainingTime(Math.max(Math.round(timer.getRemaining() / 1000), 0)),
			100
		);
		return () => {
			clearInterval(interval);
			timer.pause();
		};
	}, [player]);

	useEffect(() => {
		if (game.history().length === 0) return;
		const isPlaying = turn === color;
		if (isPlaying) {
			ref.current?.animate(
				[
					{ transform: 'scale(1.1)', opacity: 1 },
					{ transform: 'scale(1.4)', opacity: 0.7 },
					{ transform: 'scale(0.7)', opacity: 1 },
					{ transform: 'scale(0.9)' },
					{ transform: 'scale(1)' },
				],
				{
					duration: 700,
					easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
				}
			);
			timerRef.current?.resume();
		} else {
			timerRef.current?.pause();
		}
		setPaused(!isPlaying);
	}, [color, turn, player]);

	useEffect(() => {
		status === 'finished' && timerRef.current?.pause();
	}, [status]);

	return (
		<div
			ref={ref}
			className={`relative w-full h-full ${paused ? 'opacity-30' : ''}`}
		>
			<div className='absolute w-full h-full flex justify-center items-center text-lg font-medium text-white'>{`${minutes}:${
				seconds < 10 ? 0 : ''
			}${seconds}`}</div>
			<svg width='100%' height='100%' viewBox={`0 0 ${size} ${size}`}>
				<circle
					stroke='#2072E5'
					strokeWidth={stroke}
					fill='transparent'
					r={radius}
					cx={size / 2}
					cy={size / 2}
					strokeDasharray={`${circumference} ${circumference}`}
					strokeDashoffset={offset}
					transform={`rotate(-90, ${size / 2}, ${size / 2})`}
				/>
				<circle
					stroke='#FFFFFF1A'
					strokeWidth={stroke}
					fill='transparent'
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
			</svg>
		</div>
	);
};

export default CircleTimer;
