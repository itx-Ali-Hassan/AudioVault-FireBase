import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

const UploadAudio = () => {

    const { uploadAudioFile, uploadUserData, getAudioData, getUserData, updateAudioData } = useAuth()
    const [audioFile, setAudioFile] = useState(null);
    const [fileTitle, setFileTitle] = useState(null);
    const [cover, setCover] = useState(null);
    const handelAudioFile = (e) => {
        setAudioFile(e.target.files[0])
        console.log('e.target.files', e.target.files)
    }
    const handelAudioCover = (e) => {
        setCover(e.target.files[0])
        console.log('e.target.files', e.target.files)
    }
    const handelUpload = () => uploadAudioFile({ audioFile, fileTitle, cover })

    return (
        <div className="flex gap-3">
            <input type="file" accept="audio/*" onChange={handelAudioFile} />
            <input type="file" accept="image/*" onChange={handelAudioCover} />
            <button
                className={`p-2 rounded-2xl
                    ${audioFile
                        ? "bg-myPink cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed text-white"
                    }`}
                onClick={handelUpload}
                disabled={!audioFile}
            >
                uploadAudioFile
            </button>
            <button
                className="p-2 bg-myPink rounded-2xl cursor-pointer"
                onClick={uploadUserData}
            >
                uploadUserData
            </button>
            <button
                className="p-2 bg-myPink rounded-2xl cursor-pointer"
                onClick={getAudioData}
            >
                getAudioData
            </button>
            <button
                className="p-2 bg-myPink rounded-2xl cursor-pointer"
                onClick={getUserData}
            >
                getUserData
            </button>
            <button
                className="p-2 bg-myPink rounded-2xl cursor-pointer"
                onClick={updateAudioData}
            >
                updateAudioData
            </button>


        </div >
    );
};

export default UploadAudio;

