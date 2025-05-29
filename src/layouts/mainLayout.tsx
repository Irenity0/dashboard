
import Footer from "@/common/Footer"
import Navbar from "@/common/Navbar"
import { Outlet, useLocation } from "react-router"

const MainLayout = () => {

  const location = useLocation()

  const hideNavbar = location.pathname === "/"

  return (
    <>
    <div className="min-h-[646px] w-11/12 mb-10 mx-auto">
    {!hideNavbar && <Navbar />}
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default MainLayout