// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import Loading from '@/components/Loading/Index';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
            {loading ? <Loading title="Please Wait" body="Website data is loading" /> : children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy consumption across components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};