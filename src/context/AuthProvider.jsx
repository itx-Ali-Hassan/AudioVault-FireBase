import { createContext, useContext, useState, useEffect } from 'react';
import Loading from '@/components/Loading/Index';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/config/FireBase';
import MyToastify from '@/config/MyToastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('currentUser', currentUser);
            setUser(currentUser);

            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup function
    }, []);

    const handleLogout = async () => {
        setLoading(true)
        try {
            await signOut(auth);
            MyToastify("Logged out successfully!", "success");
        } catch (error) {
            console.error("Logout Error:", error);
            MyToastify("Failed to log out!", "error");
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading, MyToastify, auth, handleLogout }}>
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