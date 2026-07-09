import { Route, Routes } from "react-router-dom"

import AuthRoutes from "./Auth/Routes"
import PageNotFound from "@/components/PageNotFound/Index"
import FrontendRoutes from "./Frontend/Routes"
import PrivateRoutes from "@/config/PrivateRoutes"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={
        <PrivateRoutes>
          <FrontendRoutes />
        </PrivateRoutes>
      } />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes