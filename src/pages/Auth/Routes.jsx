import { Route, Routes } from "react-router-dom"

import SignIN from "./SignIN/SignIN"
import SignUP from "./SignUP/SignUP"
import PageNotFound from "@/components/PageNotFound/Index"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIN />} />
      <Route path="/sign-up" element={<SignUP />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AuthRoutes