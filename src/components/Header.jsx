import Bar3Icon from "@heroicons/react/24/outline/Bars3Icon";
import dicord from "../assets/discord.png";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (user) {
      navigate("/channels");
      return;
    }
    try {
      await signInWithPopup(auth, provider);
      navigate("/channels");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <header className="flex items-center justify-between bg-discord_blue px-6 py-4">
      <Link href="/">
        <img src={dicord} className=" h-12 w-32 object-contain" alt="" />
      </Link>
      <div className="hidden space-x-6  lg:flex ">
        <Link className="link" to="/">
          Download
        </Link>
        <Link className="link" to="/">
          Why Discord?
        </Link>
        <Link className="link" to="/">
          Nitro
        </Link>
        <Link className="link" to="/">
          Safety
        </Link>
        <Link className="link" to="/">
          Support
        </Link>
      </div>
      <div className="flex space-x-4">
        <button
          className="whitespace-nowrap rounded-full bg-white p-2 px-4 text-xs font-medium transition duration-200 ease-in-out hover:text-discord_blurple hover:shadow-2xl focus:outline-none md:text-sm"
          onClick={handleSignIn}
        >
          {!user ? "Login" : "Open Discord"}
        </button>
        <Bar3Icon className="h-9 cursor-pointer text-white lg:hidden" />
      </div>
    </header>
  );
};

export default Header;
