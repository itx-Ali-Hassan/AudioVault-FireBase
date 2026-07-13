import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth';

export const createAuthFunctions = ({ auth, MyToastify, setLoading, setUser, navigate }) => {

    const handleSignUp = async ({ email, password }) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);
            MyToastify({ messageText: 'SignUp successfully', messageType: 'success' });
            navigate('/auth/sign-in');
        } catch (error) {
            MyToastify({ messageText: `${error}`, messageType: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            MyToastify({
                messageText: `SignIn successfully ${user?.displayName || ''}`,
                messageType: 'success',
            });
            navigate('/');
            setUser({ ...user, password: password })
        } catch (error) {
            MyToastify({ messageText: `${error}`, messageType: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const checkEmail = ({ values, page }) => {
        const email = values.email;
        const password = values.password;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|proton\.me|protonmail\.com)$/;
        const validEmail = emailRegex.test(email);

        if (!validEmail) {
            MyToastify({ messageText: 'Email is not valid', messageType: 'warn' });
            return;
        }

        switch (page) {
            case 'SIGN_IN':
                handleSignIn(email, password);
                break;
            case 'SIGN_UP':
                handleSignUp({ email, password });
                break;
            default:
                MyToastify({
                    messageText:
                        'Hello there is an error which is made by the developer of the site kindly contact the developer at instagram itx.alihassanch',
                    messageType: 'error',
                });
                break;
        }
    };

    const signInGoogle = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const userData = result.user;
            setUser(userData);
            MyToastify({ messageText: 'SignIn successfully', messageType: 'success' });
            navigate('/');
        } catch (error) {
            MyToastify({ messageText: `${error}`, messageType: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            MyToastify('Logged out successfully!', 'success');
        } catch (error) {
            MyToastify({ messageText: `${error}`, messageType: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return { checkEmail, signInGoogle, handleLogout };
};