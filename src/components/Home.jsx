import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, colRef, db } from "../config/firebase";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import Mic from "@heroicons/react/24/outline/MicrophoneIcon";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import CogIcon from "@heroicons/react/24/outline/CogIcon";
import ChevronIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import ServerIcon from "./ServerIcon";
import Channel from "./Channel";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { signOut } from "firebase/auth";
import Chat from "./Chat";
const Home = () => {
  const [user] = useAuthState(auth);
  const q = query(colRef, orderBy("timeStamp", "asc"));
  const [snapshot, loading] = useCollection(q);
  const pic = user?.photoURL;

  const handleAddChannel = async () => {
    const channelName = prompt("Enter Channel Name");
    if (channelName) {
      await addDoc(colRef, {
        channelName,
        userId: user?.uid,
        timeStamp: serverTimestamp(),
      });
    }
  };
  return (
    <>
      {!user && <Navigate to="/" />}
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-seer bg-discord_serversBg px-2">
          <div className="server-default hover:bg-discord_purple min-w-max p-3 mt-2">
            <img src="https://rb.gy/kuaslg" alt="" className="h-5" />
          </div>
          <hr className=" border-gray-700 border w-8 mx-auto" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          <ServerIcon image="https://rb.gy/zxo0lz" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          <ServerIcon image="https://rb.gy/zxo0lz" />

          <div className=" server-default hover:bg-discord_green group">
            <PlusIcon className=" text-discord_green h-7 group-hover:text-white" />
          </div>
        </div>

        <div className=" bg-discord_channelsBg flex flex-col min-w-max">
          <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-discord_serverNameHoverBg">
            Official KALEB chanlelel <ChevronIcon className="h-5 ml-2" />{" "}
          </h2>

          <div className=" text-discord_channel flex-grow overflow-y-scroll no-scrollbar ">
            <div className="flex items-center p-2 mb-2">
              <ChevronIcon className="h-4 mr-2" />
              <h4 className="font-semibold">Channels</h4>
              <PlusIcon
                className="ml-auto h-6 cursor-pointer hover:text-white"
                onClick={handleAddChannel}
              />
            </div>

            <div className="flex flex-col space-y-2 px-2 mb-4">
              {snapshot?.docs.map((doc) => (
                <Channel
                  id={doc.id}
                  key={doc.id}
                  channelName={doc.data().channelName}
                  loading={loading}
                />
              ))}
            </div>
          </div>

          <div className=" bg-discord_userSectionBg flex justify-between items-center space-x-8 p-1">
            <div className="flex items-center space-x-1">
              <img
                src={user?.photoURL}
                alt=""
                className="h-10 rounded-full cursor-pointer"
                onClick={() => signOut(auth)}
              />

              <h4 className=" text-white text-xs font-medium ">
                {user?.displayName}
                <span className=" text-discord_userId block">
                  #{user?.uid.substring(0, 4).toUpperCase()}
                </span>
              </h4>
            </div>

            <div className="text-gray-400 flex items-center ">
              <div className="hover:bg-discord_iconHover p-2 rounded-md">
                <Mic className=" h-5 icon" />
              </div>
              <div className="hover:bg-discord_iconHover p-2 rounded-md">
                <PhoneIcon className=" h-5 icon" />
              </div>
              <div className="hover:bg-discord_iconHover p-2 rounded-md">
                <CogIcon className=" h-5 icon" />
              </div>
            </div>
          </div>
        </div>

        <div className=" bg-[#36393f] flex-grow">
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Home;
