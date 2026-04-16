import { create } from 'zustand';

interface ConfirmState {
    isOpen: boolean;
    title: string;
    message: string;
    resolve: (value: boolean) => void;
    confirm: (title: string, message: string) => Promise<boolean>;
    onConfirm: () => void;
    onCancel: () => void;
}

export const useConfirm = create<ConfirmState>((set, get) => ({
    isOpen: false,
    title: '',
    message: '',
    resolve: () => {},
    confirm: (title: string, message: string) => {
        return new Promise((resolve) => {
            set({
                isOpen: true,
                title,
                message,
                resolve
            });
        });
    },
    onConfirm: () => {
        get().resolve(true);
        set({ isOpen: false });
    },
    onCancel: () => {
        get().resolve(false);
        set({ isOpen: false });
    }
}));
