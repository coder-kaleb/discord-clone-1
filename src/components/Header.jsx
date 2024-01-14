import React, { useEffect } from "react";
import Bar3Icon from "@heroicons/react/24/outline/Bars3Icon";
import dicord from "../assets/discord.png";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user) {
  //     navigate("/channels");
  //   }
  // }, [user]);

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
    <header className="bg-discord_blue flex items-center justify-between py-4 px-6">
      <Link href="/">
        <img src={dicord} className=" w-32 h-12 object-contain" alt="" />
      </Link>
      <div className="hidden lg:flex  space-x-6 ">
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
          className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
          onClick={handleSignIn}
        >
          {!user ? "Login" : "Open Discord"}
        </button>
        <button onClick={() => signOut(auth)}>logout</button>
        <Bar3Icon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
    </header>
  );
};

export default Header;
