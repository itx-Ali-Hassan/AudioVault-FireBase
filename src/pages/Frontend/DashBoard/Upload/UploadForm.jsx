import { useAuth } from "@/context/AuthProvider";
import { AudioFile, CloudUpload, FileUpload, Image, } from "@mui/icons-material";
import { useState } from "react";

const UploadForm = () => {
    const { uploadAudioFile, setLoading, loading } = useAuth()
    const [songs, setSongs] = useState([]);
    const [audioFile, setAudioFile] = useState(null);
    const [fileTitle, setFileTitle] = useState("");
    const [cover, setCover] = useState(null);
    const handelAudioTitle = e => setFileTitle(e.target.value);
    const handelAudioFile = e => {
        setAudioFile(e.target.files[0])
        handleClearFileName(e)
    }
    const handelAudioCover = e => setCover(e.target.files[0])
    const handelUpload = async () => {
        setLoading(true);
        try {
            await uploadAudioFile({ audioFile, fileTitle, cover });
            setAudioFile(null);
            setFileTitle("");
            setCover(null);
        } catch (err) {
            console.error("Upload failed: ", err);
        } finally {
            setLoading(false);
        }
    };
    const handleClearFileName = (e) => {
        const cleanFileName = e.target.files[0].name.substring(0, e.target.files[0].name.lastIndexOf('.')) || e.target.files[0].name;
        setFileTitle(cleanFileName)
    }
    return (
        <div className="flex flex-col py-10 items-center justify-center gap-5 w-1/2">
            <div>
                <h1 className="text-2xl font-bold capitalize text-myPink">upload file</h1>
            </div>
            <div className="flex flex-col gap-5">
                <div>
                    <label htmlFor="Title" className="block mb-2.5 text-lg font-semibold text-myPink">Title</label>
                    <input
                        type="text"
                        onChange={handelAudioTitle}
                        id="Title"
                        className="border-b border-myPink text-md block w-200 px-3 py-2.5 focus:shadow-md placeholder:capitalize"
                        placeholder="song Title (auto select on file upload)"
                        value={fileTitle ? fileTitle : ""}
                    />
                </div>
                <div className="flex justify-between">
                    <div>
                        <label className="block mb-2.5 text-lg font-semibold text-myPink">Select Audio</label>
                        <div className="relative flex items-center w-full max-w-md">
                            <div className="absolute left-3 flex items-center pointer-events-none">
                                <AudioFile className="text-gray-400! text-sm!" />
                            </div>
                            <input
                                type="text"
                                value={audioFile ? audioFile.name : "No file selected"}
                                className="border border-gray-300 rounded-lg pl-10 pr-12 py-2 w-full bg-transparent text-sm disabled:opacity-70"
                                disabled
                            />
                            <label className="absolute right-2 flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
                                <input type="file" accept="audio/*" hidden onChange={handelAudioFile} />
                                <FileUpload className="text-myPink!" />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2.5 text-lg font-semibold text-myPink capitalize">Select Audio cover</label>
                        <div className="relative flex items-center w-full max-w-md">
                            <div className="absolute left-3 flex items-center pointer-events-none">
                                <Image className="text-gray-400! text-sm!" />
                            </div>
                            <input
                                type="text"
                                value={cover ? cover.name : "No file selected"}
                                className="border border-gray-300 rounded-lg pl-10 pr-12 py-2 w-full bg-transparent text-sm disabled:opacity-70"
                                disabled
                            />
                            <label className="absolute right-2 flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
                                <input type="file" accept="image/*" hidden onChange={handelAudioCover} />
                                <FileUpload className="text-myPink!" />
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        className="rounded-2xl h-10 text-lg cursor-pointer w-full flex justify-center items-center bg-myPink text-myWhite! gap-3"
                        onClick={handelUpload}
                    >
                        <CloudUpload className="text-2xl!" />
                        Upload Files
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadForm