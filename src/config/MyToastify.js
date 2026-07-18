import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyToastify = ({ messageText, messageType, type, close = 5000 }) => {
    const resolvedType = messageType || type || "success";
    const toastMethod = toast[resolvedType] || toast.success;

    toastMethod(messageText, {
        position: "top-center",
        autoClose: close,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
};

export default MyToastify;