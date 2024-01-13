import React from "react";
import Bar3Icon from "@heroicons/react/24/outline/Bars3Icon";
import dicord from "../assets/discord.png";
import { Link } from "react-router-dom";
const Header = () => {
  //   const [user] = useAuthState(auth);
  //   const history = useHistory();

  //   const signIn = (e) => {
  //     e.preventDefault();

  //     auth
  //       .signInWithPopup(provider)
  //       .then(() => history.push("/channels"))
  //       .catch((error) => alert(error.message));
  //   };
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
          //   onClick={!user ? signIn : () => history.push("/channels")}
        >
          Login
        </button>
        <Bar3Icon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
    </header>
  );
};

export default Header;
