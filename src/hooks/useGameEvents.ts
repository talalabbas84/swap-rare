import { useContext } from 'react';
import { GameEventsContext } from '@contexts';

export const useGameEvents = () => {
	const context = useContext(GameEventsContext);
	if (!context) {
		throw 'useGameEvent must be used within a GameEventsProvider';
	}
	return context;
};

export default useGameEvents;
