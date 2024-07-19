import { type ReactNode } from "react";
import { redirect } from "next/navigation";
import config from "~/lib/config";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { DashboardContent } from "./_components/DashboardContent";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  const userInfo = await api.user.getUserInfo();

  return (
    <DashboardContent userInfo={userInfo.data}>{children}</DashboardContent>
  );
};

export default DashboardLayout;
