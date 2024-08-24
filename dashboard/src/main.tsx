import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PocketbaseProvider } from './contexts/PocketbaseContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PocketbaseProvider>
      <App />
    </PocketbaseProvider>
  </StrictMode>,
)
