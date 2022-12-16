import 'react-tippy/dist/tippy.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PageProviders } from '@components';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<PageProviders>
			<Component {...pageProps} />
		</PageProviders>
	);
}

export default MyApp;
