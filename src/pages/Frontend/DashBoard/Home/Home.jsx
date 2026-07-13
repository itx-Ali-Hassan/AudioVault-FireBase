import { useAuth } from "@/context/AuthProvider"

const Home = () => {
  const { handleLogout } = useAuth()
  return (
    <button className="cursor-pointer bg-myPink" onClick={handleLogout} >Logout</button>
  )
}

export default Home