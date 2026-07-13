import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

const UploadAudio = () => {

    const { uploadAudioFile, uploadUserData, getAudioData, getUserData } = useAuth()

    const [file, setFile] = useState(null);


    return (
        <div className="flex gap-3">
            <button className="p-2 bg-myPink rounded-2xl cursor-pointer" onClick={uploadAudioFile}>uploadAudioFile</button>
            <button className="p-2 bg-myPink rounded-2xl cursor-pointer" onClick={uploadUserData}>uploadUserData</button>
            <button className="p-2 bg-myPink rounded-2xl cursor-pointer" onClick={getAudioData}>getAudioData</button>
            <button className="p-2 bg-myPink rounded-2xl cursor-pointer" onClick={getUserData}>getUserData</button>
        </div>
    );
};

export default UploadAudio;

