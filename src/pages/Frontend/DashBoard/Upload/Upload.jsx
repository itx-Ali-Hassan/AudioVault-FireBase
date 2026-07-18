import { useAuth } from "@/context/AuthProvider";
import { CloudUploadOutlined, FileUploadOutlined, PriorityHighOutlined, } from "@mui/icons-material";
import { Button, Form, Input, Typography, Upload } from "antd";
import { useState } from "react";

const UploadAudio = () => {
    const { uploadAudioFile, getAllAudios } = useAuth();
    const { } = Typography

    const [songs, setSongs] = useState([]);
    const [audioFile, setAudioFile] = useState(null);
    const [fileTitle, setFileTitle] = useState("");
    const [cover, setCover] = useState(null);
    const [form] = Form.useForm();

    const handelAudioFile = e => setAudioFile(e.target.files[0]);
    const handelAudioCover = e => setCover(e.target.files[0]);
    const handelAudioTitle = e => setFileTitle(e.target.value);

    const handelUpload = async () => {
        setLocalLoading(true);
        try {
            await uploadAudioFile({ audioFile, fileTitle, cover });
            const updatedSongs = await getAllAudios();
            setSongs(updatedSongs);
            setAudioFile(null);
            setFileTitle("");
            setCover(null);
        } catch (err) {
            console.error("Upload failed: ", err);
        } finally {
            setLocalLoading(false);
        }
    };
    // const [DeletingProgress, setDeletingProgress] = useState(false)

    // const [localLoading, setLocalLoading] = useState(false);

    // const handleDelete = async (e, song) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const success = await deleteAudioFile(song, setLocalLoading);
    //     if (success) {
    //         const updatedSongs = await getAllAudios();
    //         setSongs(updatedSongs);
    //     }
    // };

    // useEffect(() => {
    //     const fetchSongs = async () => {
    //         setLocalLoading(true);
    //         try {
    //             const data = await getAllAudios();
    //             setSongs(data);
    //         } finally {
    //             setLocalLoading(false);
    //         }
    //     };
    //     fetchSongs();
    // }, []);

    // const getOptimizedCoverUrl = (originalUrl, width = 400, height = 400) => {
    //     if (!originalUrl) return originalUrl;
    //     if (originalUrl.includes("placehold.co")) return originalUrl;
    //     return originalUrl.replace("/upload/", `/upload/w_${width},h_${height},c_fill,g_auto,q_auto,f_auto/`);
    // };

    // if (localLoading) return <Loading />;

    return (
        <Form
            form={form}
            layout="vertical"
            requiredMark="optional"
        >
            <Form.Item>
                <Title>Upload Song</Title>
            </Form.Item>

            <Form.Item label='Song Title' required tooltip={{ title: "This is a required field", icon: <PriorityHighOutlined /> }}>
                <Input placeholder="Write the Title of the Song" onChange={handelAudioTitle} />
            </Form.Item>

            <Form.Item label='Select the Music File' required tooltip={{ title: "This is a required field", icon: <PriorityHighOutlined /> }}>
                <Upload onChange={handelAudioFile}>
                    <Button icon={<FileUploadOutlined />}>
                        Upload Audio
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item label='Select the Music Cover' required tooltip={{ title: "This is a required field", icon: <PriorityHighOutlined /> }}>
                <Upload onChange={handelAudioCover}>
                    <Button icon={<FileUploadOutlined />}>
                        Upload Cover File
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button icon={<CloudUploadOutlined />} onClick={handelUpload}>Start the Uploading</Button>
            </Form.Item>

        </Form >
    );
};

export default UploadAudio;

