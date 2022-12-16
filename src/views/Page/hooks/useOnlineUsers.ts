import { getOnlineUsers } from '@utils';
import { useCallback, useEffect, useState } from 'react';

export const useOnlineUsers = () => {
	const [users, setUsers] = useState(0);
	const fetch = useCallback(() => getOnlineUsers().then(setUsers), []);
	useEffect(() => {
		fetch();
		const interval = setInterval(fetch, 3000);
		return () => clearInterval(interval);
	}, [fetch]);
	return users;
};

export default useOnlineUsers;
