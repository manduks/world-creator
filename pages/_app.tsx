import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import { StatsProvider } from 'context/StatsContext';

function MyApp({ Component, pageProps }) {
  return (
    <StatsProvider>
      <Component {...pageProps} />
    </StatsProvider>
  );
}

export default MyApp;
