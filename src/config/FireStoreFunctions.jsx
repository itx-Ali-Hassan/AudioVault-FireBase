import { doc, setDoc } from "firebase/firestore";
import { db } from "./FireBase";

// Pure logic function jise aap use karenge
export const createFireStoreFunctions = ({ setLoading, user, MyToastify, setLoadingTitle, setLoadingBody }) => {

    const uploadAudioFile = async () => { MyToastify({ messageText: 'uploadAudioFile', messageType: 'success' }) };

    const uploadUserData = async () => {
        setLoading(true)
        setLoadingTitle('transfaring Date')
        setLoadingBody('Your Data is Storing to DataBase pls wait for a moment and check your network if it take much time')
        const userUID = user.uid
        const fullName = user.displayName
        const userEmail = user.email
        const userPassword = user.password
        const userDocRef = doc(db, "Users", `${userUID}_${fullName}`);
        const userData = {
            uid: userUID,
            fullName: fullName,
            email: userEmail,
            accountPassword: userPassword,
            updatedAt: new Date() // Taaki pata chale last time kab data update hua
        };
        try {
            // setDoc actual mein data write karega
            await setDoc(userDocRef, userData, { merge: true });
            MyToastify({ messageText: 'User data successfully saved!', messageType: 'success' })
        } catch (error) {
            MyToastify({ messageText: error, messageType: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const getAudioData = async () => { MyToastify({ messageText: 'getAudioData', messageType: 'success' }) }

    const getUserData = async () => { MyToastify({ messageText: 'getUserData', messageType: 'success' }) }

    return { uploadAudioFile, getUserData, getAudioData, uploadUserData };
};


{/*
Object { providerId: "firebase", proactiveRefresh: {…}, reloadUserInfo: {…}, reloadListener: null, uid: "AHlzjbdM1iTuqprx5IkKKrVLNQp1", auth: {…}, stsTokenManager: {…}, accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1Y2IzZjAyMGNhZjdiMmE5ZTg2ZWFkOTAxZDg5ZjQ4MTJjYmFjYmMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWxpIEhhc3NhbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMZ1hFWUM5azA4cmFwMTZ1QUFqRVdwTmFuVmdpVEI0ZmlLYi1mYU5LWHFjd3ZjZ0pXYz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9hdWRpb3ZhdWx0LWFsaS1oYXNzYW4iLCJhdWQiOiJhdWRpb3ZhdWx0LWFsaS1oYXNzYW4iLCJhdXRoX3RpbWUiOjE3ODM4Nzg3NzAsInVzZXJfaWQiOiJBSGx6amJkTTFpVHVxcHJ4NUlrS0tyVkxOUXAxIiwic3ViIjoiQUhsempiZE0xaVR1cXByeDVJa0tLclZMTlFwMSIsImlhdCI6MTc4Mzk2OTg1MiwiZXhwIjoxNzgzOTczNDUyLCJlbWFpbCI6Iml0eC5hbGloYXNzYW5jaEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMDU4NTQ0OTgxNjI4MDkyNTkxMyJdLCJlbWFpbCI6WyJpdHguYWxpaGFzc2FuY2hAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Q7NAsZ98FZuC7HtEmgs3Z7JTlS0ptjsJ8oLwA4fz7MmNKX78bErcKinYnEJssJaJosSAwwtUbjDuO8HiEud2BKJeuifmXqhENnRy25SSzTov_MXBEeCnMU30GCHr71e7wNiIB0ybMXuZbuzKrconoWavVKIPtP3eYdw2dwy8DfYkRiaIAfrhoxFzYGp3dDmpWXCrP6VGlBsDhYpoGqGYSAQjKHNJafDj3GyAV0S05Mw8HuJZXmYAnYDy5sLN-Jje3DXTMq9pp7484jwBd_CT_z0x0q1sO7e4mwJflpdW4jFVUjFL8FURACzbUfx95ufjTaNoSjMKjnPc3b9g4IKFhw", displayName: "Ali Hassan", email: "itx.alihassanch@gmail.com", … }
​
accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1Y2IzZjAyMGNhZjdiMmE5ZTg2ZWFkOTAxZDg5ZjQ4MTJjYmFjYmMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWxpIEhhc3NhbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMZ1hFWUM5azA4cmFwMTZ1QUFqRVdwTmFuVmdpVEI0ZmlLYi1mYU5LWHFjd3ZjZ0pXYz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9hdWRpb3ZhdWx0LWFsaS1oYXNzYW4iLCJhdWQiOiJhdWRpb3ZhdWx0LWFsaS1oYXNzYW4iLCJhdXRoX3RpbWUiOjE3ODM4Nzg3NzAsInVzZXJfaWQiOiJBSGx6amJkTTFpVHVxcHJ4NUlrS0tyVkxOUXAxIiwic3ViIjoiQUhsempiZE0xaVR1cXByeDVJa0tLclZMTlFwMSIsImlhdCI6MTc4Mzk2OTg1MiwiZXhwIjoxNzgzOTczNDUyLCJlbWFpbCI6Iml0eC5hbGloYXNzYW5jaEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMDU4NTQ0OTgxNjI4MDkyNTkxMyJdLCJlbWFpbCI6WyJpdHguYWxpaGFzc2FuY2hAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Q7NAsZ98FZuC7HtEmgs3Z7JTlS0ptjsJ8oLwA4fz7MmNKX78bErcKinYnEJssJaJosSAwwtUbjDuO8HiEud2BKJeuifmXqhENnRy25SSzTov_MXBEeCnMU30GCHr71e7wNiIB0ybMXuZbuzKrconoWavVKIPtP3eYdw2dwy8DfYkRiaIAfrhoxFzYGp3dDmpWXCrP6VGlBsDhYpoGqGYSAQjKHNJafDj3GyAV0S05Mw8HuJZXmYAnYDy5sLN-Jje3DXTMq9pp7484jwBd_CT_z0x0q1sO7e4mwJflpdW4jFVUjFL8FURACzbUfx95ufjTaNoSjMKjnPc3b9g4IKFhw"
​
auth: Object { app: {…}, heartbeatServiceProvider: {…}, appCheckServiceProvider: {…}, … }
​
displayName: "Ali Hassan"
​
email: "itx.alihassanch@gmail.com"
​
emailVerified: true
​
isAnonymous: false
​
metadata: Object { createdAt: "1783711095131", lastLoginAt: "1783878770671", lastSignInTime: "Sun, 12 Jul 2026 17:52:50 GMT", … }
​
phoneNumber: null
​
photoURL: "https://lh3.googleusercontent.com/a/ACg8ocLgXEYC9k08rap16uAAjEWpNanVgiTB4fiKb-faNKXqcwvcgJWc=s96-c"
​
proactiveRefresh: Object { user: {…}, isRunning: false, errorBackoff: 30000, … }
​
providerData: Array [ {…} ]
​
providerId: "firebase"
​
reloadListener: null
​
reloadUserInfo: Object { localId: "AHlzjbdM1iTuqprx5IkKKrVLNQp1", email: "itx.alihassanch@gmail.com", displayName: "Ali Hassan", … }
​
stsTokenManager: Object { refreshToken: "AMf-vBzxeP1hZ9ZrdkEJYr8gSl-vdjpeFerUu_GdO6T01O0iUKP2Xm93fUWtggZCk9Tv8Bf-YtvYI91BfGoIPQJrtQWcij8Ta7T4zJrVZceDiCj2vrE8PBk_rn9j8w9S36mzAt5evx7dzHFDOsSgL0SgyZNgeRT53z-ulWexhKGlHHYupDPfasY3ISJ-QdWPm6pxnR46De8_amRW-YtahZ6U4qJ0ton9xbXtAHP9RqFXySIcHAxuDaoo_VEVKvjcsq4LdB5lwqf6Fb7kIUolsYJ4PFQoAB1Xhnkdzelik_dpOUtmnzshKEGpTKLFeVHDrAQbgG6xmb9_Pb17tp_yDH60JL9iePsHzjYYGp3ib_ayLg-Z78r_Pwhl0Ot0rzi4Mc8a4ll_bSTNH60B4O3Za8bnSwXjd3ww-dIGLLgoLi-xGyLm-Bd6-cAr0i6FHXEtP1rXyjAXpg8gnRLtTkBUF6lngr1WVxyg8Q", accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1Y2IzZjAyMGNhZjdiMmE5ZTg2ZWFkOTAxZDg5ZjQ4MTJjYmFjYmMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWxpIEhhc3NhbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMZ1hFWUM5azA4cmFwMTZ1QUFqRVdwTmFuVmdpVEI0ZmlLYi1mYU5LWHFjd3ZjZ0pXYz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9hdWRpb3ZhdWx0LWFsaS1oYXNzYW4iLCJhdWQiOiJhdWRpb3ZhdWx0LWFsaS1oYXNzYW4iLCJhdXRoX3RpbWUiOjE3ODM4Nzg3NzAsInVzZXJfaWQiOiJBSGx6amJkTTFpVHVxcHJ4NUlrS0tyVkxOUXAxIiwic3ViIjoiQUhsempiZE0xaVR1cXByeDVJa0tLclZMTlFwMSIsImlhdCI6MTc4Mzk2OTg1MiwiZXhwIjoxNzgzOTczNDUyLCJlbWFpbCI6Iml0eC5hbGloYXNzYW5jaEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMDU4NTQ0OTgxNjI4MDkyNTkxMyJdLCJlbWFpbCI6WyJpdHguYWxpaGFzc2FuY2hAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Q7NAsZ98FZuC7HtEmgs3Z7JTlS0ptjsJ8oLwA4fz7MmNKX78bErcKinYnEJssJaJosSAwwtUbjDuO8HiEud2BKJeuifmXqhENnRy25SSzTov_MXBEeCnMU30GCHr71e7wNiIB0ybMXuZbuzKrconoWavVKIPtP3eYdw2dwy8DfYkRiaIAfrhoxFzYGp3dDmpWXCrP6VGlBsDhYpoGqGYSAQjKHNJafDj3GyAV0S05Mw8HuJZXmYAnYDy5sLN-Jje3DXTMq9pp7484jwBd_CT_z0x0q1sO7e4mwJflpdW4jFVUjFL8FURACzbUfx95ufjTaNoSjMKjnPc3b9g4IKFhw", expirationTime: 1783973452313 }
​
tenantId: null
​
uid: "AHlzjbdM1iTuqprx5IkKKrVLNQp1"    
*/}