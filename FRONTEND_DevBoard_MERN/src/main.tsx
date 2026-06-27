import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import Router from './router'

const queryClient = new QueryClient() /* we instantiate QueryClient to pass it  to the Provider */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* We wrap the Router Component to give the React Query to the full app*/}
    <QueryClientProvider client={queryClient}> 
      <Router /> 
      <ReactQueryDevtools /> {/* we're gonna use this devtools from react-query to mmanage the cache and the data obtained */}
    </QueryClientProvider>
  </StrictMode>,
)
