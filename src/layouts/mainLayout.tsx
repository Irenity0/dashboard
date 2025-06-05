
import { AppSidebar } from "@/common/AppSidebar"
import Footer from "@/common/Footer"
import Navbar from "@/common/Navbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router"

const MainLayout = () => {

  const location = useLocation()

  const hideNavbarAndFooter = location.pathname === "/"

  return (
    <>
    <div className="min-h-[646px]">
    {!hideNavbarAndFooter && <Navbar />}
    <section>
      <SidebarProvider>
        <AppSidebar/>
        <main className="w-full">
          <section className="w-11/12 mx-auto">
          <SidebarTrigger/>
            <Outlet/>
          </section>
        </main>
      </SidebarProvider>
    </section>
    </div>
    {!hideNavbarAndFooter && <Footer/>}
    </>
  )
}

export default MainLayout