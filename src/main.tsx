import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { RouterProvider } from 'react-router'
import router from './routes/router.tsx'
import { Toaster } from 'react-hot-toast';
import AuthProvider from './provider/AuthProvider.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router}></RouterProvider>
    <Toaster/>
    </ThemeProvider>
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
