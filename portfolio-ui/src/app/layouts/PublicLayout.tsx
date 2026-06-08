import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../../features/user';
import { BackgroundDecoration, ScrollToTop } from '../../shared/components';
import PortfolioChat from '../../features/ai/components/PortfolioChat';
import { useChatStore } from '../../shared/stores/chatStore';

export default function PublicLayout() {
  const { isOpen: isChatOpen } = useChatStore();

  return (
    <>
      <BackgroundDecoration />
      <ScrollToTop />
      <Header />
      {isChatOpen && <PortfolioChat />}
      <Outlet />
      <Footer />
    </>
  );
}
