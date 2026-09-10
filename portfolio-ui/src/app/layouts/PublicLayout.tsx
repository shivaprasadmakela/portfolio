import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../../features/user';
import { BackgroundDecoration, ScrollToTop } from '../../shared/components';
import { useChatStore } from '../../shared/stores/chatStore';

// The chat panel is closed unless the visitor opens it, and it pulls in the
// Markdown renderer (~47 kB gzipped). Loading it eagerly put that on the
// critical path for every page. Lazy keeps it off the first paint.
const PortfolioChat = lazy(() => import('../../features/ai/components/PortfolioChat'));

export default function PublicLayout() {
  const { isOpen: isChatOpen } = useChatStore();

  return (
    <>
      <BackgroundDecoration />
      <ScrollToTop />
      <Header />
      {isChatOpen && (
        <Suspense fallback={null}>
          <PortfolioChat />
        </Suspense>
      )}
      <Outlet />
      <Footer />
    </>
  );
}
