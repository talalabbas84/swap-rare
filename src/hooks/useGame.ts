import { useContext } from 'react';
import { GameContext } from '@contexts';

export const useGame = () => {
	const context = useContext(GameContext);
	if (!context) {
		throw 'useGame must be used within a GameProvider';
	}
	return context;
};

export default useGame;
