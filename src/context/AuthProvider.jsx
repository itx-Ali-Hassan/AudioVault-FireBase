import { createContext, useContext, useState, useEffect } from 'react';
import Loading from '@/components/Loading/Index';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/FireBase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('currentUser', currentUser)
            setUser(currentUser);
        });
        setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => unsubscribe(); // Cleanup function
    }, []);


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