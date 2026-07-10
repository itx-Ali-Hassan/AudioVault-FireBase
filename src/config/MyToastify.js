import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyToastify = ({ messageText, messageType, type }) => {
    const resolvedType = messageType || type || "success";
    const toastMethod = toast[resolvedType] || toast.success;

    toastMethod(messageText, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
};

export default MyToastify;