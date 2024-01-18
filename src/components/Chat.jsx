import { useRef, useState } from "react";
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
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../config/firebase";
import Message from "./Message";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
const Chat = () => {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef("");
  const chatRef = useRef(null);

  const [messages] = useCollection(
    channelId &&
      query(
        collection(db, "channels", channelId, "messages"),
        orderBy("timestamp", "asc"),
      ),
  );

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  };
  const sendMessage = async (e) => {
    e.preventDefault();

    if (inputVal !== "") {
      try {
        const messageRef = collection(db, "channels", channelId, "messages");
        await addDoc(messageRef, {
          timestamp: serverTimestamp(),
          message: inputVal,
          name: user?.displayName,
          photoURL: user?.photoURL,
          email: user?.email,
        });
      } catch (error) {
        alert(error.message);
      }
    }

    setInputVal("");
    scrollToBottom();
  };

  // const [messages] = useColl

  return (
    <div className="flex h-screen flex-col">
      <header className="-mt-1 flex items-center justify-between space-x-5 border-b border-gray-800 p-4">
        <div className="flex items-center space-x-1">
          <HashTag className="h-5 text-[#72767d]" />
          <h4 className="font-semibold text-white">{channelName}</h4>
        </div>

        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UserIcon className="icon" />
          <div className="flex rounded-md bg-[#202225] p-1 text-xs ">
            <input
              type="text"
              className=" text-md bg-transparent pl-1 text-white placeholder-[#72767d] focus:outline-none"
              placeholder="Search"
            />
            <SearchIcon className="h-4 text-discord_userId" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>

      <main className="no-scrollbar flex-grow overflow-y-scroll">
        {messages?.docs.map((doc) => {
          const { timestamp, message, name, photoURL, email } = doc.data();

          return (
            <Message
              key={doc.id}
              message={message}
              photoURL={photoURL}
              timestamp={timestamp}
              name={name}
              email={email}
              id={doc.id}
            />
          );
        })}
        <div className="pb-4" ref={chatRef} />
      </main>
      <div className="mx-5 mb-7 flex items-center rounded-lg bg-[#40444b] p-2.5">
        <PlusCircleIcon className="icon mr-4" />
        <form className="flex-grow">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
            className="w-full bg-transparent text-sm text-[#dcddde] placeholder-[#72767d] focus:outline-none"
            ref={inputRef}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
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
