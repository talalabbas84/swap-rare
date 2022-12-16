import { Header } from './components';
import Head from 'next/head';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { getWebSocket } from '@utils';
import { useWallet } from '@hooks';

export const Page: React.FC<PropsWithChildren> = ({ children }) => {
	const { account } = useWallet();
	const interval = useRef<NodeJS.Timer | undefined>();
	useEffect(() => {
		if (!account) return;
		interval.current && clearInterval(interval.current);
		const socket = getWebSocket();
		socket.emit('userOnline', account);
		const newInterval = setInterval(
			() => socket.emit('userOnline', account),
			50000
		);
		interval.current = newInterval;
		return () => interval.current && clearInterval(interval.current);
	}, [account]);
	return (
		<>
			<Head>
				<title>Rareround | Lobby</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='relative bg-dark-hard flex flex-col md:h-screen md:overflow-hidden w-full h-full'>
				<Header />
				<main className='absolute top-[90px] bottom-0 w-full'>
					<section className='flex grow p-7 w-full h-full gap-5 justify-between'>
						{children}
					</section>
				</main>
			</div>
		</>
	);
};

export default Page;
