import { useState } from 'react';
import { useNavigate } from 'react-router';
import './App.css';
import FuzzyText from './animations/FuzzyText/FuzzyText';
import { Button } from './components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from './hooks/useAuth';
import { RiGoogleLine } from '@remixicon/react';
import toast from 'react-hot-toast';

function App() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signInWithGoogle} = useAuth();

  const handleGoogleLogin = () => {
    signInWithGoogle()
    .then(result => {
      console.log(result)
      toast("player logged in.")
      navigate('/dashboard')
    })
    .catch(error => {
      setError(error)
      console.log(error)
    })
  };

  return (
    <div className='h-[600px] w-full flex flex-col justify-center items-center'>
      <div className="w-full lg:w-1/2 h-[180px] mx-auto bg-cover bg-center bg-[url(https://i.pinimg.com/736x/66/70/33/6670333a45ede4a101901cb5fdd49ce2.jpg)]">
        <div className='w-full h-full bg-black/30 backdrop-brightness-50'></div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <div
            className='cursor-pointer z-10 w-[270px] h-[60px] bg-no-repeat grayscale-100 hover:scale-110 transition text-center py-2 bg-[url(/button.svg)] -mt-6 -mr-50 font-bold font-mono'
          >
            <FuzzyText baseIntensity={0.1} enableHover={false} fontSize={50}>
              Enter
            </FuzzyText>
          </div>
        </DialogTrigger>

        <DialogContent className='bg-black/80 border'>
          <DialogHeader>
            <DialogTitle className='text-white '>Login</DialogTitle>
            <DialogDescription className='text-gray-400'>
              Enter your credentials to continue.
            </DialogDescription>
          </DialogHeader>

          <input
            type='text'
            placeholder='Username'
            className='w-full p-2 mt-4 border focus:outline-none bg-black text-white rounded'
          />
          <input
            type='password'
            placeholder='Password'
            className='w-full p-2 mt-2 border focus:outline-none bg-black text-white rounded'
          />
          {error && <p className='text-red-500 mt-2'>{error}</p>}

          <div className='flex justify-between gap-4 mt-4'>
            <Button size="icon" className='rounded-full' onClick={handleGoogleLogin}><RiGoogleLine/></Button>
            <Button>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
