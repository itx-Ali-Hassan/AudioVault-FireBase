import { useState } from "react"

const UploadAudio = () => {
    const [fileName, setFileName] = useState(null)
    const [filePath, setFilePath] = useState(null)
    const handelChange=(e)=>{
        setFileName(e.target.files[0].name)
        setFilePath(e.target.files[0])
        console.log('fileName', fileName)
        console.dir('e.target', e.target)
    }

    return (
        <input type="file" accept="audio/*" onChange={handelChange} className="cursor-pointer bg-myPink p-5 rounded-3xl text-2xl" placeholder="Upload file" />
    )
}

export default UploadAudio