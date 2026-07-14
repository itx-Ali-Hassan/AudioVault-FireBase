import { createContext, useContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/config/FireBase';

import MyToastify from '@/config/MyToastify';
import Loading from '@/components/Loading/Index';
import { createAuthFunctions } from '@/config/AuthFunctions';
import { createFireStoreFunctions } from '@/config/FireStoreFunctions';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingTitle, setLoadingTitle] = useState(null);
    const [loadingBody, setLoadingBody] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    const { checkEmail, signInGoogle, handleLogout } = createAuthFunctions({ auth, MyToastify, setLoading, setUser, navigate, });
    const { uploadAudioFile, getUserData, getAudioData, uploadUserData, updateAudioData } = createFireStoreFunctions({
        setLoading,
        user,
        MyToastify,
        setLoadingTitle,
        setLoadingBody
    })

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setUser,
                setLoading,
                MyToastify,
                auth,
                handleLogout,
                setLoadingTitle,
                setLoadingBody,
                navigate,
                checkEmail,
                signInGoogle,
                uploadAudioFile,
                getUserData,
                getAudioData,
                uploadUserData,
                updateAudioData,
            }}
        >
            {loading ? (
                <Loading
                    title={loadingTitle ? loadingTitle : 'Tuning In...'}
                    body={loadingBody ? loadingBody : 'We Accessing your Audio Vault'}
                />
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};