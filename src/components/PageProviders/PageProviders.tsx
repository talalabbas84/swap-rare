import { Web3ReactProvider } from '@web3-react/core';
import getLibrary from '@utils/getLibrary';
import {
	BalanceProvider,
	BalanceSelectionProvider,
	ContractsProvider,
	GameEventsProvider,
	ToastsProvider,
	WalletProvider,
} from '@contexts';
import { PropsWithChildren } from 'react';

export const PageProviders: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<ToastsProvider>
				<WalletProvider>
					<ContractsProvider>
						<GameEventsProvider>
							<BalanceProvider>
								<BalanceSelectionProvider>{children}</BalanceSelectionProvider>
							</BalanceProvider>
						</GameEventsProvider>
					</ContractsProvider>
				</WalletProvider>
			</ToastsProvider>
		</Web3ReactProvider>
	);
};

export default PageProviders;
