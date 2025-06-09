import { useState } from "react";
import { useNavigate } from "react-router";
import "./App.css";
import FuzzyText from "./animations/FuzzyText/FuzzyText";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "./hooks/useAuth";
import { RiGoogleLine } from "@remixicon/react";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

function App() {
  const {user} = useAuth();
  const [error, setError] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [signupInfo, setSignupInfo] = useState<{
    email: string;
    password: string;
    imageFile: File | null;
    displayName: string;
  }>({
    email: "",
    password: "",
    displayName: "",
    imageFile: null,
  });

  const navigate = useNavigate();
  const { signInWithGoogle, signInUser, createUser } = useAuth();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        toast("Player logged in.");
        navigate("/dashboard");
      })
      .catch((error) => {
        setError(error.message || "Google sign-in failed.");
      });
  };

  const handleLogin = () => {
    setError("");
    const { email, password } = loginInfo;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    signInUser(email, password)
      .then(() => {
        toast.success("Welcome back, player.");
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err.message || "Login failed.");
      });
  };
  const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(image_hosting_api, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed.");
    }
  };

  const handleSignup = async () => {
    setError("");
    const { email, password, displayName, imageFile } = signupInfo;

    if (!email || !password || !displayName) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await updateProfile(user, {
        displayName,
        photoURL: imageUrl || undefined,
      });

      toast.success("New player registered.");
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Sign up failed.");
      }
    }
  };

  return (
    <div className="h-[600px] w-full flex flex-col justify-center items-center">
      <div className="w-full lg:w-1/2 h-[180px] mx-auto bg-cover bg-center bg-[url(https://i.pinimg.com/736x/66/70/33/6670333a45ede4a101901cb5fdd49ce2.jpg)]">
        <div className="w-full h-full bg-black/30 backdrop-brightness-50"></div>
      </div>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <div
  className="cursor-pointer z-10 w-[270px] h-[60px] bg-no-repeat grayscale-100 hover:scale-110 transition text-center py-2 bg-[url(/button.svg)] -mt-6 -mr-50 font-bold font-mono"
  onClick={() => {
    if (user) {
      // User is logged in, redirect immediately
      navigate("/dashboard");
    } else {
      // User not logged in, open login dialog
      setIsLoginOpen(true);
    }
  }}
>
  <FuzzyText baseIntensity={0.1} enableHover={false} fontSize={50}>
    Enter
  </FuzzyText>
</div>
        </DialogTrigger>

        <DialogContent className="bg-black/80 border">
          <DialogHeader>
            <DialogTitle className="text-white">Login</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your credentials to continue.
            </DialogDescription>
          </DialogHeader>

          <input
            type="text"
            placeholder="Email"
            value={loginInfo.email}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
            className="w-full p-2 mt-4 border focus:outline-none bg-black text-white rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            className="w-full p-2 mt-2 border focus:outline-none bg-black text-white rounded"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="flex justify-between gap-4 mt-4">
            <Button
              size="icon"
              className="rounded-full"
              onClick={handleGoogleLogin}
            >
              <RiGoogleLine />
            </Button>
            <Button onClick={handleLogin}>Submit</Button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-400">
            Don’t have an account?{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => {
                setIsLoginOpen(false);
                setIsSignupOpen(true);
              }}
            >
              Sign up
            </span>
          </p>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="bg-black/80 border">
          <DialogHeader>
            <DialogTitle className="text-white">Sign Up</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create your account to begin.
            </DialogDescription>
          </DialogHeader>

          <input
            type="email"
            placeholder="Email"
            value={signupInfo.email}
            onChange={(e) =>
              setSignupInfo({ ...signupInfo, email: e.target.value })
            }
            className="w-full p-2 mt-2 border focus:outline-none bg-black text-white rounded"
          />

          <input
            type="text"
            placeholder="Player Name"
            value={signupInfo.displayName}
            onChange={(e) =>
              setSignupInfo({ ...signupInfo, displayName: e.target.value })
            }
            className="w-full p-2 mt-2 border focus:outline-none bg-black text-white rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setSignupInfo({ ...signupInfo, imageFile: file });
            }}
            className="w-full p-2 mt-2 border focus:outline-none bg-black text-white rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={signupInfo.password}
            onChange={(e) =>
              setSignupInfo({ ...signupInfo, password: e.target.value })
            }
            className="w-full p-2 mt-2 border focus:outline-none bg-black text-white rounded"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="flex justify-end mt-4">
            <Button onClick={handleSignup}>Register</Button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => {
                setIsSignupOpen(false);
                setIsLoginOpen(true);
              }}
            >
              Login
            </span>
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
