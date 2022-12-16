import { createContext, PropsWithChildren, useMemo } from 'react';
import { ChainIDs, IContractsContext } from '@config/types';
import { getContract } from '@utils/contracts';
import { ALL_CONTRACTS } from '@config/constants/contracts';
import { useWallet } from '@hooks';

export const ContractsContext = createContext<IContractsContext | null>(null);

export const ContractsProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const { library, chain } = useWallet();

	const contracts = useMemo(() => {
		const result: Partial<IContractsContext> = {};
		const validChain = chain && chain in ChainIDs ? chain : ChainIDs.RINKEBY;
		ALL_CONTRACTS.forEach(
			(contract) =>
				(result[contract] = getContract(
					contract,
					validChain,
					library?.getSigner()
				))
		);
		return result as IContractsContext;
	}, [library, chain]);

	return (
		<ContractsContext.Provider value={contracts}>
			{children}
		</ContractsContext.Provider>
	);
};

export default ContractsProvider;
