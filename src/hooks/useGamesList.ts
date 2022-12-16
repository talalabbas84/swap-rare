import { GameType, IGameInfo } from '@config/types';
import { useGameEvents } from '@hooks';
import { getGamesList } from '@utils';
import { useCallback, useEffect, useState } from 'react';

export const useGamesList = (type = GameType.DICE) => {
	const gameEvents = useGameEvents();
	const [games, setGames] = useState<IGameInfo[]>([]);
	const [loading, setLoading] = useState(false);

	const fetch = useCallback(async () => {
		setLoading(true);
		const newList = await getGamesList(type);
		setGames(newList);
		setLoading(false);
	}, [type]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	useEffect(() => {
		gameEvents.remove.gameCreated(fetch);
		gameEvents.add.gameCreated(fetch);
	}, [fetch, gameEvents]);

	return { games, loading, fetch };
};

export default useGamesList;
