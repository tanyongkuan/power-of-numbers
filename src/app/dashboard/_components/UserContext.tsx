"use client";
import React, { createContext, useContext, useState } from "react";
import type { TUserInfo } from "~/types";

interface UserContextType {
  userInfo: TUserInfo | null;
  setUserInfo: (userInfo: TUserInfo) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  children,
  initialUserInfo,
}: {
  children: React.ReactNode;
  initialUserInfo: TUserInfo;
}) {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
