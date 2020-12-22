import { useIsFetching, QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import { StatsProvider } from 'context/StatsContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StatsProvider>
        <Component {...pageProps} />
      </StatsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
