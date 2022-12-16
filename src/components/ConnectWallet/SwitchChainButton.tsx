import cx from '@utils/cx';
import { Loader } from '@components';
import { CHAINS } from '@config/constants';
import { useWallet } from '@hooks';
import { useState } from 'react';
import { setupNetwork } from '@utils';
import { ChainIDs, IWallet } from '@config/types';

interface IProps {
	chain: ChainIDs;
	wallet: IWallet;
}

export const SwitchChainButton: React.FC<IProps> = ({ chain, wallet }) => {
	const { connect } = useWallet();
	const [loading, setLoading] = useState(false);
	const onClick = async () => {
		setLoading(true);
		try {
			const library = await wallet.connector.getProvider();
			await setupNetwork(chain, library);
			await connect(wallet);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div
			onClick={onClick}
			className={cx(
				'bg-dark-soft select-none rounded-[15px] px-[22px] flex items-center justify-between',
				!loading && 'hover:bg-dark-very-soft cursor-pointer duration-150'
			)}
		>
			<div className='grow relative py-3'>
				<h6 className='text-white'>Switch to {CHAINS[chain].chainName}</h6>

				{/* Connection Box --Start-- */}
				{loading && (
					<div className='absolute top-0 left-0 w-full h-full bg-dark-soft flex items-center justify-start'>
						<div className='scale-[0.4] origin-left -mr-8'>
							<Loader />
						</div>
						<div>
							<h6 className='text-white'>
								Switch to {CHAINS[chain].chainName}
							</h6>
						</div>
					</div>
				)}
				{/* Connection Box --End-- */}
			</div>
		</div>
	);
};

export default SwitchChainButton;
