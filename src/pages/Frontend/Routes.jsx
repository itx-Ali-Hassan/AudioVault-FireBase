import { Route, Routes } from "react-router-dom"
import DashBoard from "./DashBoard/DashBoard"
import Home from "./Home/Home"
import PageNotFound from "@/components/PageNotFound/Index"

const FrontendRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dash-board" element={<DashBoard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default FrontendRoutes