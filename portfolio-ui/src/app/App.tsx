import { Suspense, useEffect } from 'react';
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider, PageLoader, ErrorBoundary } from '../shared/components';
import routes from './routes';

function AppContent() {
  const element = useRoutes(routes);
  // Boundary inside the router: a page that throws shows the fallback in place
  // instead of blanking the whole app, and the header/nav stay usable.
  return (
    <Suspense fallback={<PageLoader />}>
      <ErrorBoundary>{element}</ErrorBoundary>
    </Suspense>
  );
}

export default function App() {
  useEffect(() => {
    // Cloud Run scales to zero; this warms the instance so the first real
    // request doesn't pay the cold start.
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!apiBaseUrl) return;
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/api/health`, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    }).catch(() => { });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}
