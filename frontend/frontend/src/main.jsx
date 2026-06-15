import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'
import {
 QueryClientProvider,
} from
"@tanstack/react-query";

import queryClient
from "./utils/queryClient";

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>

    <AuthProvider>

    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
