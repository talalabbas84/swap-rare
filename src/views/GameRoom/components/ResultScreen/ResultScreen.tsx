import Modal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import { commaSeparetor, modalStyles } from '@utils/cx';
import { ModalHeader } from '@components';
import { useGame, useWallet } from '@hooks';

export const ResultScreen: React.FC = () => {
	const { game } = useGame();
	const { account } = useWallet();
	const wasActive = useRef(false);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (game?.status === 'active') wasActive.current = true;
		else if (game?.status === 'finished' && wasActive.current) setIsOpen(true);
	}, [game]);

	const isInGame = game?.player1 === account || game?.player2 === account;
	const onClose = () => setIsOpen(false);
	return (
		<Modal
			isOpen={isOpen && isInGame}
			onRequestClose={onClose}
			style={modalStyles}
		>
			<ModalHeader onClose={onClose} title={''} />
			<div className='w-full mx-auto sm:w-[100vw] flex flex-col justify-center items-center h-screen text-white'>
				{game?.winner === account ? (
					<>
						<p className='mt-10'>CONGRATULATIONS!</p>
						<p className='mt-0'>You are the winner!</p>
						<p className='mt-0'>You have won 1 new NFT piece and some Ether!</p>
						<p className='mt-0'>≈${commaSeparetor(0.6)}</p>
					</>
				) : (
					<>
						<p className='mt-10'>Sorry!</p>
						<p className='mt-0'>You lost!</p>
					</>
				)}
			</div>
		</Modal>
	);
};

export default ResultScreen;
