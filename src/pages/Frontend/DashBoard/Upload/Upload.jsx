import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

const UploadAudio = () => {

    const { uploadAudioFile, uploadUserData, getAudioData, getUserData } = useAuth()
    const [file, setFile] = useState(null);
    const [fileTitle, setFileTitle] = useState(null);
    const handelChange = (e) => {
        setFile(e.target.files[0])
        console.log('e.target.files', e.target.files)
    }
    const handelUpload = () => uploadAudioFile({ file, fileTitle })

    return (
        <div className="flex gap-3">
            <input type="file" accept="audio/*" onChange={handelChange} />
            <button
                className={`p-2 rounded-2xl
                    ${file
                        ? "bg-myPink cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed text-white"
                    }`}
                onClick={handelUpload}
                disabled={!file}
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

        </div >
    );
};

export default UploadAudio;

