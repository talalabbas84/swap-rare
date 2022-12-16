import { useCallback, useState, useEffect } from 'react';
import { getAccountHistory } from '@utils';
import { IGameInfo } from '@config/types';
import { useWallet } from '@hooks';

export const useHistory = () => {
	const { account } = useWallet();
	const [loading, setLoading] = useState(true);
	const [games, setGames] = useState<IGameInfo[]>([]);
	const fetch = useCallback(async () => {
		if (!account) return;
		setLoading(true);
		const result = await getAccountHistory(account);
		setLoading(false);
		setGames(result);
	}, [account]);

	useEffect(() => {
		fetch();
	}, [fetch]);
	return { games, loading, fetch };
};

export default useHistory;
