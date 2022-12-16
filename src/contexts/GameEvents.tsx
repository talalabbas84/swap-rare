import { createContext, PropsWithChildren, useMemo, useRef } from 'react';
import { Socket } from 'socket.io-client';
import {
	GameEvent,
	GameEventCallback,
	IGameEventsContext,
} from '@config/types';
import { getWebSocket } from '@utils';

export const GameEventsContext = createContext<IGameEventsContext | null>(null);

export const GameEventsProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const { current: socket } = useRef<Socket>(getWebSocket());
	const contextValue = useMemo(() => {
		const result: Record<string, any> = { add: {}, remove: {} };
		Object.entries(GameEvent).forEach(([name, event]) => {
			result.add[name] = (callBack: GameEventCallback) =>
				socket.on(event, callBack);
			result.remove[name] = (callBack: GameEventCallback) =>
				socket.off(event, callBack);
		});
		return result as IGameEventsContext;
	}, [socket]);
	return (
		<GameEventsContext.Provider value={contextValue}>
			{children}
		</GameEventsContext.Provider>
	);
};

export default GameEventsProvider;
