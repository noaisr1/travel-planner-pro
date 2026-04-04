import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import './styles/theme.css';
import App from './App.jsx';

// QueryClient manages the cache for all server data (trips, etc.).
// QueryClientProvider makes it available to every component via React context,
// so any component can fetch or mutate data using hooks like useQuery / useMutation.
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
