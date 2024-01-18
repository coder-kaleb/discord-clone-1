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
        <div className="bg-seer flex flex-col space-y-3 bg-discord_serversBg px-2">
          <div className="server-default mt-2 min-w-max p-3 hover:bg-discord_purple">
            <img src="https://rb.gy/kuaslg" alt="" className="h-5" />
          </div>
          <hr className=" mx-auto w-8 border border-gray-700" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          <ServerIcon image="https://rb.gy/zxo0lz" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          <ServerIcon image="https://rb.gy/zxo0lz" />

          <div className=" server-default group hover:bg-discord_green">
            <PlusIcon className=" h-7 text-discord_green group-hover:text-white" />
          </div>
        </div>

        <div className=" flex min-w-max flex-col bg-discord_channelsBg">
          <h2 className="flex items-center justify-between border-b border-gray-800 p-4 text-sm font-bold text-white hover:bg-discord_serverNameHoverBg">
            Official KALEB chanlelel <ChevronIcon className="ml-2 h-5" />{" "}
          </h2>

          <div className=" no-scrollbar flex-grow overflow-y-scroll text-discord_channel ">
            <div className="mb-2 flex items-center p-2">
              <ChevronIcon className="mr-2 h-4" />
              <h4 className="font-semibold">Channels</h4>
              <PlusIcon
                className="ml-auto h-6 cursor-pointer hover:text-white"
                onClick={handleAddChannel}
              />
            </div>

            <div className="mb-4 flex flex-col space-y-2 px-2">
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

          <div className=" flex items-center justify-between space-x-8 bg-discord_userSectionBg p-1">
            <div className="flex items-center space-x-1">
              <img
                src={user?.photoURL}
                alt=""
                className="h-10 cursor-pointer rounded-full"
                onClick={() => signOut(auth)}
              />

              <h4 className=" text-xs font-medium text-white ">
                {user?.displayName}
                <span className=" block text-discord_userId">
                  #{user?.uid.substring(0, 4).toUpperCase()}
                </span>
              </h4>
            </div>

            <div className="flex items-center text-gray-400 ">
              <div className="rounded-md p-2 hover:bg-discord_iconHover">
                <Mic className=" icon h-5" />
              </div>
              <div className="rounded-md p-2 hover:bg-discord_iconHover">
                <PhoneIcon className=" icon h-5" />
              </div>
              <div className="rounded-md p-2 hover:bg-discord_iconHover">
                <CogIcon className=" icon h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className=" flex-grow bg-[#36393f]">
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Home;
