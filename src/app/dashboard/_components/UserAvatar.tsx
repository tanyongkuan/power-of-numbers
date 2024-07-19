"use client";

import React from "react";
import { useUser, UserProvider } from "./UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import type { TUserInfo } from "~/types";

const UserAvatar = () => {
  const user = useUser();
  const imageUrl = "https://github.com/shadcn.png";

  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt={user?.userInfo?.name || "User Avatar"} />
      <AvatarFallback>{user?.userInfo?.name || "CN"}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
