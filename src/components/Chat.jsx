import React, { useRef } from "react";
import HashTag from "@heroicons/react/24/outline/HashtagIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import ChatIcon from "@heroicons/react/24/outline/ChatBubbleLeftEllipsisIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import InboxIcon from "@heroicons/react/24/outline/InboxIcon";
import GiftIcon from "@heroicons/react/24/outline/GiftIcon";
import EmojiHappyIcon from "@heroicons/react/24/outline/FaceSmileIcon";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, colRef, db } from "../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  query,
} from "firebase/firestore";
const Chat = () => {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  const inputRef = useRef("");
  // const subColRef = collection(db, "channels", channelId);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  };
  const sendMessage = async (e) => {
    e.preventDefault();

    // const messageRef = query(collection(db, `channels/${channelId}/messages`));
    if (inputRef.current.value !== "") {
      try {
        const messageRef = collection(db, "channels", channelId, "messages");
        await addDoc(messageRef, {
          timestamp: serverTimestamp(),
          message: inputRef.current.value,
          name: user?.displayName,
          photoURL: user?.photoURL,
          email: user?.email,
        });
      } catch (error) {
        alert(error.message);
      }
    }

    inputRef.current.value = "";
    scrollToBottom();
  };

  // const [messages] = useColl

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashTag className="h-5 text-[#72767d]" />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>

        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UserIcon className="icon" />
          <div className="bg-[#202225] text-xs p-1 rounded-md flex ">
            <input
              type="text"
              className=" bg-transparent focus:outline-none placeholder-[#72767d] pl-1 text-white text-md"
              placeholder="Search"
            />
            <SearchIcon className="h-4 text-discord_userId" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>

      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        <div className="pb-16" ref={chatRef} />
      </main>
      <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
        <PlusCircleIcon className="icon mr-4" />
        <form className="flex-grow">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
            className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className="icon mr-2" />
        <EmojiHappyIcon className="icon" />
      </div>
    </div>
  );
};

export default Chat;
