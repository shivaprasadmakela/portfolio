import { Suspense, useEffect } from 'react';
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider, ConfirmDialog, PageLoader } from '../shared/components';
import routes from './routes';

function AppContent() {
  const element = useRoutes(routes);
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export default function App() {
  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      cache: 'no-store',
    }).catch(() => { });
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ToastProvider>
      <ConfirmDialog />
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}
