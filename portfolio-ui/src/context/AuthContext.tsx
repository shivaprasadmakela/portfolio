import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('isAdminAuthenticated') === 'true';
    });

    const login = useCallback((email: string, password: string) => {
        if (email === 'admin@local.dev' && password === 'Admin@123') {
            setIsAuthenticated(true);
            localStorage.setItem('isAdminAuthenticated', 'true');
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAdminAuthenticated');
    }, []);

    const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
