import { useAuth } from "@/context/AuthProvider"

const Home = () => {
  const { handleLogout } = useAuth()
  return (
    <button onClick={handleLogout} className="cursor-pointer bg-myPink">Logout</button>
  )
}

export default Home