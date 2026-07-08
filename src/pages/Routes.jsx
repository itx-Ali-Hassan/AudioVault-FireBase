import { Route, Routes } from "react-router-dom"

import AuthRoutes from "./Auth/Routes"
import PageNotFound from "@/components/PageNotFound/Index"
import FrontendRoutes from "./Frontend/Routes"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<FrontendRoutes />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes