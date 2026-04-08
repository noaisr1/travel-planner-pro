import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import './styles/theme.css';
import App from './App.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { TRIPS_QUERY_KEY } from './hooks/useTrips.js';

// QueryClient manages the cache for all server data (trips, etc.).
// QueryClientProvider makes it available to every component via React context,
// so any component can fetch or mutate data using hooks like useSuspenseQuery / useMutation.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Consider trips "fresh" for 5m; avoids eager refetching
      refetchOnWindowFocus: false, // Don't refetch just because the tab regains focus
      retry: false, // Fail fast so errors surface to the ErrorBoundary quickly
    },
  },
});

function handleTripsErrorReset() {
  queryClient.resetQueries({ queryKey: TRIPS_QUERY_KEY });
}

const suspenseFallback = (
  <p style={{ color: 'var(--color-text-muted)', margin: '2rem 0' }}>Loading trips…</p>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary onReset={handleTripsErrorReset}>
        <Suspense fallback={suspenseFallback}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
