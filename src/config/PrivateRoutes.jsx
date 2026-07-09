import Loading from "@/components/Loading/Index";
import { useAuth } from "@/context/AuthProvider"
import { Navigate } from "react-router-dom"

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <Loading title="Please Wait" body="Checking authentication..." />;

  if (!user) return <Navigate to="/auth/sign-in" replace />;

  return (children)
}

export default PrivateRoutes