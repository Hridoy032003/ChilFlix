import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiProvider } from './ApiContext.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from '@clerk/clerk-react'


const queryClient = new QueryClient();
const PUBLISHABLE_KEY = "pk_test_bG92aW5nLWN1Yi05MS5jbGVyay5hY2NvdW50cy5kZXYk"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <QueryClientProvider client={queryClient}>

    <ApiProvider>
      <App />

    </ApiProvider>
    </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
