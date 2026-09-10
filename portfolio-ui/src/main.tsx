import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/variables.css'
import App from './app/App.tsx'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { QueryProvider } from './app/providers/QueryProvider'
import { ErrorBoundary } from './shared/components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
