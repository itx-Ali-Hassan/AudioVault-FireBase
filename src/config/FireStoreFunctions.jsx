import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./FireBase";

export const createFireStoreFunctions = ({ setLoading, setUser, user, MyToastify, setLoadingTitle, setLoadingBody }) => {

    const uploadAudioFile = async ({ audioFile, fileTitle = null, cover }) => {
        setLoading(true)
        setLoadingTitle('transferring Date')
        setLoadingBody('we are generating a link of your audio file it may take some time')
        // -------------- Cloudinary setup
        const cloudName = "mqfynv3y";
        const uploadPreset = "AudioVault";
        const formData = new FormData();
        let audioUrl = null;
        let audioPublicId = null; // 👈 Audio public_id store karne ke liye variable
        let coverUrl = null;
        let coverPublicId = null; // 👈 Cover public_id store karne ke liye variable
        const userUID = user.uid;
        const cleanFileName = fileTitle
            ? fileTitle.substring(0, fileTitle.lastIndexOf('.')) || fileTitle
            : audioFile.name.substring(0, audioFile.name.lastIndexOf('.')) || audioFile.name;
        const defaultCoverUrl = `https://placehold.co/400/FD1843/FFF9FA/?text=${cleanFileName.trim().replace(/\s+/g, "%20")}`
        const checkDuplicate = doc(db, "Audio Files", userUID, "Songs", cleanFileName);
        if (checkDuplicate) {
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
        }
        formData.append("file", audioFile);
        formData.append("upload_preset", uploadPreset);
        // handling Audio Files 
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.secure_url) {
                setLoadingBody('Link is created now storing in DataBase')
                audioUrl = data.secure_url;
                audioPublicId = data.public_id; // 👈 Cloudinary se public_id nikal li
                console.log('audioUrl:', audioUrl, 'audioPublicId:', audioPublicId)
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

        // handling Img Files
        if (cover && cover instanceof File) {
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
                    coverPublicId = data.public_id; // 👈 Cover ki public_id nikal li
                    console.log('coverUrl:', coverUrl, 'coverPublicId:', coverPublicId);
                } else {
                    console.error("Cloudinary Cover Error:", data.error?.message);
                }
            } catch (error) {
                console.error("Cover Upload Error:", error);
            }
        }

        const audioDocRef = doc(db, "Audio Files", userUID, "Songs", cleanFileName);

        // 🔄 Firestore Payload me Public IDs add kar di hain
        const audioData = {
            id: crypto.randomUUID(),
            songTitle: cleanFileName,
            audioUrl,
            audioPublicId, // 👈 Saved in DB!
            coverUrl: coverUrl ?? defaultCoverUrl,
            coverPublicId: coverPublicId ?? null, // 👈 Saved in DB (Default cover ho to null rahegi)
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

    const updateAudioData = async ({ oldName, newFileName }) => {
        const userUID = user.uid
        setLoading(true)
        setLoadingTitle('Updating Data')
        setLoadingBody(`data is transferring to the DataBase it don't take much time`)

        let oldData = null
        const oldDocRef = doc(db, "Audio Files", userUID, "Songs", oldName)

        try {
            const docSnap = await getDoc(oldDocRef)
            if (docSnap.exists()) {
                oldData = docSnap.data();
            } else {
                MyToastify({ messageText: 'There is an Error', messageType: 'error' })
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
            id: crypto.randomUUID(),
            songTitle: newFileName,
            audioUrl: oldData.audioUrl,
            coverUrl: finalCoverUrl,
            updatedAt: new Date()
        }

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

    const getAudio = async ({ audioFile }) => {
        setLoading(true)
        setLoadingTitle('Getting your vault ready')
        setLoadingBody('please wait for a moment we are fetching your data from DataBase')
        const cleanFileName = audioFile.name.substring(0, audioFile.name.lastIndexOf('.')) || audioFile.name
        let audioData = null
        const docRef = doc(db, "Audio Files", user.uid, "Songs", cleanFileName)
        try {
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                audioData = docSnap.data();
                return audioData;
            } else {
                MyToastify({ messageText: 'There is an Error', messageType: 'error' })
                setLoading(false)
                return null;
            }
        } catch (error) {
            MyToastify({ messageText: 'There is an error, please try later. Check console.', messageType: 'error' })
            console.log('Error: ', error.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const uploadUserData = async () => {

        setLoading(true)
        setLoadingTitle('transferring Date')
        setLoadingBody('Your Data is Storing to DataBase please wait for a moment and check your network if it take much time')

        const { uid, displayName, email, password, phoneNumber } = user
        const userDocRef = doc(db, "Users", `${uid}_${displayName}`);
        const userData = {
            uid,
            fullName: displayName,
            email,
            accountPassword: password,
            phoneNumber,
            updatedAt: new Date()
        };
        try {
            await setDoc(userDocRef, userData, { merge: true });
            MyToastify({ messageText: 'User data successfully saved!', messageType: 'success' })
        } catch (error) {
            MyToastify({ messageText: error.message, messageType: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const getUserData = async () => {
        if (!user || !user.uid) {
            console.error("User object is not available yet");
            return null;
        }
        const { uid, displayName } = user
        setLoading(true)
        setLoadingTitle('Getting your profile ready')
        setLoadingBody('please wait for a moment we are fetching your data from DataBase')
        const docRef = doc(db, "Users", `${uid}_${displayName}`)
        try {
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setUser(pre => ({ ...pre, ...docSnap.data() }));
                MyToastify({ messageText: 'User Data Fetch SuccessFully', messageType: 'success' })
            } else {
                MyToastify({ messageText: 'There is an Error', messageType: 'error' })
                setLoading(false)
                return null;
            }
        } catch (error) {
            MyToastify({ messageText: 'There is an error, please try later. Check console.', messageType: 'error' })
            console.log('Error: ', error.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const deleteAudioFile = async (song, setLocalLoading) => {
        if (!user || !user.uid) return false;
        if (!song || !song.id) {
            MyToastify({ messageText: "Song data missing!", messageType: "error" });
            return false;
        }
        if (setLocalLoading) setLocalLoading(true);
        try {
            const songDocRef = doc(db, "Audio Files", user.uid, "Songs", song.songTitle);
            await deleteDoc(songDocRef);
            MyToastify({ messageText: `"${song.songTitle}" deleted successfully from Vault!`, messageType: "success" });
            MyToastify({
                messageText: `To delete audio storage data, send IDs ${song.audioPublicId} & ${song.coverPublicId} to Instagram: @itx.alihassanch`,
                messageType: "warning"
            });
            return true;
        } catch (error) {
            console.error("Error while deleting song from Firestore:", error);
            MyToastify({ messageText: "Failed to delete song. Check console.", messageType: "error" });
            return false;
        } finally {
            if (setLocalLoading) setLocalLoading(false);
        }
    };

    const getAllAudios = async () => {
        if (!user || !user.uid) return [];
        const songsCollectionRef = collection(db, "Audio Files", user.uid, "Songs")
        const songsList = []
        try {
            const querySnapshot = await getDocs(songsCollectionRef)
            querySnapshot.forEach(doc => songsList.push({ id: doc.id, ...doc.data() }))
            console.log("Saare Songs: ", songsList)
            return songsList;
        } catch (error) {
            MyToastify({ messageText: 'Failed to fetch songs. Check console.', messageType: 'error' })
            console.error('Error fetching all songs: ', error.message)
            return []
        }
    }

    return { uploadAudioFile, getUserData, getAudio, uploadUserData, updateAudioData, getAllAudios, deleteAudioFile };
};