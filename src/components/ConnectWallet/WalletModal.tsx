import Modal from 'react-modal';
import { CHAINS, WALLETS } from '@config/constants';
import { modalStyles } from '@utils/cx';
import { ModalHeader } from '@components';
import { useWallet } from '@hooks';
import ConnectWalletButton from './ConnectWalletButton';
import { IconContext } from 'react-icons';
import { GoLinkExternal } from 'react-icons/go';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import SwitchChainButton from './SwitchChainButton';
import { IWallet } from '@config/types';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

export const WalletModal: React.FC<IProps> = ({ onClose, isOpen }) => {
	const { current, connect } = useWallet();
	const [switchUsing, setSwitchUsing] = useState<IWallet>();
	return (
		<Modal isOpen={isOpen} style={modalStyles}>
			<div className='w-[90%] mx-auto sm:w-[430px] rounded-[20px] pb-5 pt-6 border border-dark-border-soft bg-dark-medium'>
				<ModalHeader
					onClose={onClose}
					title={switchUsing ? 'Unsupported Network' : 'Connect a wallet'}
					className='px-[26px]'
				/>
				<div className='px-5 mt-[15px]'>
					{!switchUsing && (
						<div className='px-[17px] py-[15px] rounded-[15px] bg-[#161A2E]'>
							<p className='subtitle'>
								By connecting a wallet, you agree to RareRound{' '}
								<a href='#' className='_link'>
									Terms of Service
								</a>{' '}
								and acknowledge that you have read and understand the RareRound{' '}
								<a href='#' className='_link'>
									Protocol Disclaimer
								</a>
								.
							</p>
						</div>
					)}
					<div className='mt-2.5 space-y-2.5'>
						{switchUsing ? (
							Object.keys(CHAINS).map((chain) => (
								<SwitchChainButton
									key={chain}
									chain={+chain}
									wallet={switchUsing}
								/>
							))
						) : current ? (
							<ConnectWalletButton isConnecting={true} {...current} />
						) : (
							Object.values(WALLETS).map((value, idx) => (
								<ConnectWalletButton
									key={idx}
									onClick={() =>
										connect(value)
											.then(onClose)
											.catch(() => setSwitchUsing(value))
									}
									isConnecting={!!switchUsing}
									{...value}
								/>
							))
						)}
						<div className='flex bg-dark-soft select-none rounded-[15px] py-[8px] px-[22px] flex items-center justify-between hover:bg-dark-hard cursor-pointer duration-150'>
							<a
								href='#'
								target='_blank'
								rel='noreferrer'
								className='w-full flex items-center justify-between'
							>
								<div className='flex items-center gap-x-2 text-white'>
									<IconContext.Provider
										value={{ className: 'text-dark-very-soft', size: '16' }}
									>
										<div>
											<BsInfoCircleFill />
										</div>
									</IconContext.Provider>
									How this app uses APIs
								</div>

								<IconContext.Provider
									value={{ className: 'text-dark-very-soft', size: '16' }}
								>
									<div>
										<GoLinkExternal />
									</div>
								</IconContext.Provider>
							</a>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default WalletModal;
