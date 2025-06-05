
import { AppSidebar } from "@/common/AppSidebar"
import Footer from "@/common/Footer"
// import Navbar from "@/common/Navbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router"

const MainLayout = () => {

  const location = useLocation()

  const hideNavbarAndFooter = location.pathname === "/"

  if(hideNavbarAndFooter){
    return <section className="w-11/12 mx-auto"><Outlet/></section>
  }

  return (
    <>
    <div className="min-h-[646px]">
    {/* <Navbar /> */}
    <section className="mb-3">
      <SidebarProvider>
        <AppSidebar/>
        <main className="w-full">
          <section >
            <SidebarTrigger/>
            <div className="mx-3">
            <Outlet/>
            </div>
          </section>
        </main>
      </SidebarProvider>
    </section>
    </div>
    <Footer/>
    </>
  )
}

export default MainLayout