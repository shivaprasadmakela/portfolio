import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('isAdminAuthenticated') === 'true',
  login: (email, password) => {
    if (email === 'admin@local.dev' && password === 'Admin@123') {
      set({ isAuthenticated: true });
      localStorage.setItem('isAdminAuthenticated', 'true');
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false });
    localStorage.removeItem('isAdminAuthenticated');
  },
}));
