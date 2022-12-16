import { IUseETHSelection } from '@config/types';
import { BigNumber } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useETHSelection = (amount: BigNumber): IUseETHSelection => {
	const [eth, setETH] = useState(amount);
	const [ethSelected, setETHSelected] = useState(false);
	useEffect(() => {
		setETH(amount);
		setETHSelected(false);
	}, [amount]);

	const toggleETHSelection = useCallback(
		(value?: boolean) =>
			setETHSelected((prev) => (value === undefined ? !prev : value)),
		[]
	);

	const changeETH = useCallback((value: BigNumber) => setETH(value), []);

	const value = useMemo(
		() => ({ eth, ethSelected, toggleETHSelection, changeETH }),
		[changeETH, eth, ethSelected, toggleETHSelection]
	);

	return value;
};

export default useETHSelection;
