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
      }),
    );
    navigate(`/channels/${id}`);
  };
  return (
    <div
      className=" flex cursor-pointer items-center rounded-md p-1 font-medium transition hover:bg-discord_channelHoverBg hover:text-white "
      onClick={setChannel}
    >
      <HashTag className="mr-2 h-5" /> {channelName}
    </div>
  );
};

export default Channel;
