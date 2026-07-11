import { Route, Routes } from "react-router-dom"
import DashBoard from "./DashBoard/Index"
import PageNotFound from "@/components/PageNotFound/Index"

const FrontendRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<DashBoard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default FrontendRoutes