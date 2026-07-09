import { useAuth } from "@/context/AuthProvider"
import { replace, useNavigate } from "react-router-dom"

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  if (user === null) {
    return navigate("/auth/sign-in", { replace: true })
  }

  return (children)
}

export default PrivateRoutes