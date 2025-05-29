import { Link } from "react-router"

const Navbar = () => {
  return (
   <>
   <div className='py-6 w-full top-0 flex gap-4 font-bold justify-center items-center'>
       <Link to={'/dashboard'}>Dashboard</Link>
       <Link to={'/calendar'}>Calendar</Link>
    </div>
   </>
  )
}

export default Navbar