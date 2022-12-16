import { useContext } from 'react';
import { ChessGameContext } from '@contexts';

export const useChessGame = () => {
	const context = useContext(ChessGameContext);
	if (!context) {
		throw 'useChessGame must be used within a ChessGameProvider';
	}
	return context;
};

export default useChessGame;
