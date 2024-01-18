import React from "react";

const ServerIcon = ({ image }) => {
  return (
    <img
      src={image}
      alt="sider-bar-icons"
      className="h-12 rounded-full object-cover transition-all duration-100 ease-out hover:rounded-2xl"
    />
  );
};

export default ServerIcon;
