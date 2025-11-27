import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import type { User } from '@/types/index.ts';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string, role: 'admin' | 'peminjam') => Promise<void>;
    register: (data: FormData) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, [token]);

    const login = async (username: string, password: string, role: 'admin' | 'peminjam') => {
        const response = await api.post('/auth/login', { username, password, role });
        const { token: newToken, user: userData } = response.data;

        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify({ ...userData, role }));
        setToken(newToken);
        setUser({ ...userData, role });
    };

    const register = async (formData: FormData) => {
        const response = await api.post('/auth/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        // Auto-login after registration
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        await login(username, password, 'peminjam');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
