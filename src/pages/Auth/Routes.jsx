import { Route, Routes } from "react-router-dom"

import SignIN from "./SignIN/SignIN"
import SignUP from "./SignUP/SignUP"
import PageNotFound from "@/components/PageNotFound/Index"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIN />} />
      <Route path="/signup" element={<SignUP />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AuthRoutes