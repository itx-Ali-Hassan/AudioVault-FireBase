import { Route, Routes } from "react-router-dom"

import SignIN from "./SignIN/SignIN"
import SignUP from "./SignUP/SignUP"
import PageNotFound from "@/components/PageNotFound/Index"
import ForGotPassword from "@/components/ForGotPassword/Index"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIN />} />
      <Route path="/sign-up" element={<SignUP />} />
      <Route path="/ForGotPassword" element={<ForGotPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AuthRoutes