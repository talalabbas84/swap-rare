import { Toast } from '@components';
import { IToast, IToastContext, ToastTypes } from '@config/types';
import {
	createContext,
	PropsWithChildren,
	useCallback,
	useMemo,
	useState,
} from 'react';

export const ToastsContext = createContext<IToastContext | null>(null);

export const ToastsProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [toasts, setToasts] = useState<IToast[]>([]);

	const remove = (id: string) =>
		setToasts((prev) => prev.filter((t) => t.id !== id));

	const clear = () => setToasts([]);

	const addToast = useCallback(
		(message: string, type: ToastTypes = ToastTypes.Info) => {
			const newToast = { id: `${type}: ${message}`, message, type };
			setToasts((prev) => [
				...prev.filter((t) => t.id !== newToast.id),
				newToast,
			]);
		},
		[]
	);

	const error = useCallback(
		(message: string) => addToast(message, ToastTypes.Error),
		[addToast]
	);

	const success = useCallback(
		(message: string) => addToast(message, ToastTypes.Success),
		[addToast]
	);

	const info = useCallback(
		(message: string) => addToast(message, ToastTypes.Info),
		[addToast]
	);

	const context = useMemo(
		() => ({ error, success, clear, info, addToast }),
		[addToast, error, info, success]
	);

	return (
		<ToastsContext.Provider value={context}>
			{children}
			<div className='fixed bottom-[1rem] right-[1rem]'>
				{toasts.map((toast, index) => (
					<Toast {...toast} onExpire={() => remove(toast.id)} key={index} />
				))}
			</div>
		</ToastsContext.Provider>
	);
};

export default ToastsProvider;
