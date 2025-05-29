import { Link } from 'react-router'
import './App.css'

function App() {
  return (
    <div className='h-[600px] w-full flex flex-col justify-center items-center'>
      <div className="w-full lg:w-1/2 h-[180px] mx-auto bg-cover bg-center bg-[url(https://i.pinimg.com/736x/66/70/33/6670333a45ede4a101901cb5fdd49ce2.jpg)]">
        <div className='w-full h-full bg-black/30 backdrop-brightness-50'></div>
      </div>
      <Link className='z-10 w-[270px] h-[60px] bg-no-repeat text-4xl grayscale-100 hover:scale-110 transition text-center py-2 bg-[url(/button.svg)] -mt-6 -mr-50 font-bold font-mono' to={'/dashboard'}>
        Enter        
      </Link>
    </div>
  )
}

export default App
