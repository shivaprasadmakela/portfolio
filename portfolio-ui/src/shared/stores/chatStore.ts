import { create } from 'zustand';

interface ChatState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: new URLSearchParams(window.location.search).has('chat'),
  setIsOpen: (open) => {
    set({ isOpen: open });
    const url = new URL(window.location.href);
    if (open) {
      url.searchParams.set('chat', 'true');
    } else {
      url.searchParams.delete('chat');
    }
    window.history.pushState({}, '', url.toString());
    window.dispatchEvent(new Event('chat-visibility-change'));
  },
  toggleOpen: () => {
    set((state) => {
      const nextOpen = !state.isOpen;
      const url = new URL(window.location.href);
      if (nextOpen) {
        url.searchParams.set('chat', 'true');
      } else {
        url.searchParams.delete('chat');
      }
      window.history.pushState({}, '', url.toString());
      window.dispatchEvent(new Event('chat-visibility-change'));
      return { isOpen: nextOpen };
    });
  },
}));
