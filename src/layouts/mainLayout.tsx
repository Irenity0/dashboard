
import Footer from "@/common/Footer"
import Navbar from "@/common/Navbar"
import { Outlet, useLocation } from "react-router"

const MainLayout = () => {

  const location = useLocation()

  const hideNavbarAndFooter = location.pathname === "/"

  return (
    <>
    <div className="min-h-[646px] w-11/12 mb-10 mx-auto">
    {!hideNavbarAndFooter && <Navbar />}
    <Outlet/>
    </div>
    {!hideNavbarAndFooter && <Footer/>}
    </>
  )
}

export default MainLayout