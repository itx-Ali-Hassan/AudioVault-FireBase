import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./FireBase";

export const createFireStoreFunctions = ({ setLoading, user, MyToastify, setLoadingTitle, setLoadingBody }) => {

    const uploadAudioFile = async ({ file, fileTitle }) => {
        setLoading(true)
        setLoadingTitle('transferring Date')
        setLoadingBody('we are generating a link of your audio file it may take some time')

        // -------------- Cloudinary setup
        const cloudName = "mqfynv3y";
        const uploadPreset = "AudioVault";
        const formData = new FormData();
        let audioUrl = null;
        const userUID = user.uid;
        const cleanFileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        const checkDuplicate = doc(db, "Audio Files", userUID, "Songs", cleanFileName);

        try {
            const docSnap = await getDoc(checkDuplicate);

            if (docSnap.exists()) {
                MyToastify({
                    messageText: 'This file already exists in your Vault',
                    messageType: 'warning'
                });
                setLoading(false)
                return;
            }
        } catch (firestoreError) {
            MyToastify({
                messageText: 'There is an error check console for detail',
                messageType: 'error'
            });
            console.error("Duplicate check error:", firestoreError);
            setLoading(false)
            return;
        }

        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        // Note: Cloudinary treat audio files like video files 

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.secure_url) {
                setLoadingBody('Link is created now storing in DataBase')
                audioUrl = data.secure_url;
                console.log('audioUrl', audioUrl)
            } else {
                console.error("Cloudinary Error:", data.error?.message);
                MyToastify({
                    messageText: 'Cloudinary error: ' + (data.error?.message || 'Check console'),
                    messageType: 'error'
                })
                setLoading(false)
                return;
            }
        } catch (error) {
            console.error("Error:", error);
            MyToastify({
                messageText: 'Error while uploading to Cloudinary, check console',
                messageType: 'error'
            })
            setLoading(false)
            return;
        }

        // 4. Dynamic Document ID 
        const audioDocRef = doc(db, "Audio Files", userUID, "Songs", cleanFileName);

        const audioData = {
            songTitle: cleanFileName,
            url: audioUrl,
            updatedAt: new Date()
        }

        try {
            await setDoc(audioDocRef, audioData, { merge: true });
            MyToastify({ messageText: 'Database record saved successfully!', messageType: 'success' })
        } catch (error) {
            console.error("Firestore Error:", error);
            MyToastify({ messageText: 'Failed to save in Firestore: ' + error.message, messageType: 'error' })
        } finally {
            setLoading(false)
        }
    };

    const uploadUserData = async () => {

        setLoading(true)
        setLoadingTitle('transferring Date')
        setLoadingBody('Your Data is Storing to DataBase please wait for a moment and check your network if it take much time')

        const { uid, displayName, email, password } = user
        const userDocRef = doc(db, "Users", `${uid}_${displayName}`);
        const userData = {
            uid,
            fullName: displayName,
            email,
            accountPassword: password,
            updatedAt: new Date()
        };
        try {
            await setDoc(userDocRef, userData, { merge: true });
            MyToastify({ messageText: 'User data successfully saved!', messageType: 'success' })
        } catch (error) {
            MyToastify({ messageText: error, messageType: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const getAudioData = async () => { MyToastify({ messageText: 'getAudioData', messageType: 'success' }) }

    const getUserData = async () => {

    }

    return { uploadAudioFile, getUserData, getAudioData, uploadUserData };
};
