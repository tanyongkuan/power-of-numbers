import { type ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { UserProvider } from "./UserContext";
import { type TUserInfo } from "~/types"; // Define this type based on your user info structure

export function DashboardContent({
  children,
  userInfo,
}: {
  children: ReactNode;
  userInfo: TUserInfo;
}) {
  return (
    <UserProvider initialUserInfo={userInfo}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-grow p-4 md:p-6">{children}</main>
        </div>
      </div>
    </UserProvider>
  );
}
