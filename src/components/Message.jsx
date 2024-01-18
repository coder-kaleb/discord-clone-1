import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { selectChannelId } from "../features/channelSlice";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useSelector } from "react-redux";
const Message = ({ message, photoURL, timestamp, name, email, id }) => {
  const [user] = useAuthState(auth);
  const channelId = useSelector(selectChannelId);
  const handleDelte = () => {
    const docRef = doc(db, `channels/${channelId}/messages/${id}`);
    deleteDoc(docRef);
  };
  return (
    <div className="group my-5 mr-2 flex items-center p-1 pl-5 hover:bg-[#32353B]">
      <img
        src={photoURL}
        alt=""
        className="mr-3 h-10 cursor-pointer rounded-full hover:shadow-2xl"
      />

      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="cursor-pointer text-sm text-white hover:underline">
            {name}
          </span>
          <span className="text-xs text-[#72767d]">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </h4>
        <p className="text-sm text-[#dcddde]">{message}</p>
      </div>
      {user?.email === email && (
        <div
          className="ml-auto cursor-pointer rounded-sm p-1 text-[#ed4245] hover:bg-[#ed4245] hover:text-white"
          onClick={handleDelte}
        >
          <TrashIcon className="hidden h-5 group-hover:inline" />
        </div>
      )}
    </div>
  );
};

export default Message;
