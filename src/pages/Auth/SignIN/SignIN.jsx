import { useAuth } from "@/context/AuthProvider";

const SignIN = () => {

  const { user, loading, setLoading } = useAuth();

  return (
    <button>SignIN</button>
  )
}

export default SignIN