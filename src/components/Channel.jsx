import React from "react";
import HashTag from "@heroicons/react/24/outline/HashtagIcon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChannelInfo } from "../features/channelSlice";

const Channel = ({ id, channelName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName,
      })
    );
    navigate(`/channels/${id}`);
  };
  return (
    <div
      className=" font-medium flex items-center cursor-pointer hover:bg-discord_channelHoverBg p-1 rounded-md hover:text-white transition "
      onClick={setChannel}
    >
      <HashTag className="h-5 mr-2" /> {channelName}
    </div>
  );
};

export default Channel;
