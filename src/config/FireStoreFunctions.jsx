import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./FireBase";

export const createFireStoreFunctions = ({ setLoading, user, MyToastify, setLoadingTitle, setLoadingBody }) => {

    const uploadAudioFile = async ({ audioFile, fileTitle = null, cover }) => {
        setLoading(true)
        setLoadingTitle('transferring Date')
        setLoadingBody('we are generating a link of your audio file it may take some time')

        // -------------- Cloudinary setup
        const cloudName = "mqfynv3y";
        const uploadPreset = "AudioVault";
        const formData = new FormData();
        let audioUrl = null;
        let coverUrl = null
        const userUID = user.uid;
        const cleanFileName = audioFile.name.substring(0, audioFile.name.lastIndexOf('.')) || audioFile.name;
        const defaultCoverUrl = `https://placehold.co/400/FD1843/FFF9FA/?text=${cleanFileName.trim().replace(/\s+/g, "%20")}`

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

        formData.append("file", audioFile);
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

        if (cover) {
            const coverFormData = new FormData();
            coverFormData.append("file", cover);
            coverFormData.append("upload_preset", uploadPreset);

            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: coverFormData,
                });

                const data = await response.json();

                if (data.secure_url) {
                    coverUrl = data.secure_url;
                    console.log('coverUrl', coverUrl);
                } else {
                    console.error("Cloudinary Cover Error:", data.error?.message);
                }
            } catch (error) {
                console.error("Cover Upload Error:", error);
            }
        }

        const audioDocRef = doc(db, "Audio Files", userUID, "Songs", cleanFileName);

        const audioData = {
            songTitle: cleanFileName,
            audioUrl,
            coverUrl: coverUrl ?? defaultCoverUrl,
            updatedAt: new Date()
        }

        try {
            await setDoc(audioDocRef, audioData, { merge: true });
            MyToastify({ messageText: 'Database record saved successfully!', messageType: 'success' })
        } catch (error) {
            console.error("Firestore Error:", error);
            MyToastify({ messageText: 'Failed to save in DataBase: ' + error.message, messageType: 'error' })
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

    const updateAudioData = async ({ oldName = 'jaana samjho Na', newFileName = 'test name' }) => {
        const userUID = user.uid
        setLoading(true)
        setLoadingTitle('Updating Data')
        setLoadingBody(`data is transferring to the data base it don't take much time`)

        let oldData = null
        const oldDocRef = doc(db, "Audio Files", userUID, "Songs", oldName)

        try {
            const docSnap = await getDoc(oldDocRef)
            if (docSnap.exists()) {
                oldData = docSnap.data();
                console.log("Sura Data: ", oldData);
            } else {
                MyToastify({ messageText: 'Original song data not found!', messageType: 'error' })
                setLoading(false)
                return;
            }
        } catch (error) {
            MyToastify({ messageText: 'There is an error, please try later. Check console.', messageType: 'error' })
            console.log('Error: ', error.message)
            setLoading(false)
            return;
        }

        const defaultCoverUrl = `https://placehold.co/400/FD1843/FFF9FA/?text=${newFileName.trim().replace(/\s+/g, "%20")}`
        const newDocRef = doc(db, "Audio Files", userUID, "Songs", newFileName)

        const hasOldPlaceholder = oldData.coverUrl && oldData.coverUrl.includes("placehold.co");
        const finalCoverUrl = (!oldData.coverUrl || hasOldPlaceholder) ? defaultCoverUrl : oldData.coverUrl;
        const newAudioData = {
            songTitle: newFileName,
            audioUrl: oldData.audioUrl,
            coverUrl: finalCoverUrl,
            updatedAt: new Date()
        }

        // 3. Naya Document Create Aur Purana Delete
        try {
            await setDoc(newDocRef, newAudioData, { merge: true });

            if (oldName !== newFileName) await deleteDoc(oldDocRef);

            MyToastify({ messageText: 'Database record updated successfully!', messageType: 'success' })
        } catch (error) {
            console.error("Firestore Error:", error);
            MyToastify({ messageText: 'Failed to save in DataBase: ' + error.message, messageType: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const getAudioData = async () => { MyToastify({ messageText: 'getAudioData', messageType: 'success' }) }

    const getUserData = async () => {

    }

    return { uploadAudioFile, getUserData, getAudioData, uploadUserData, updateAudioData };
};
