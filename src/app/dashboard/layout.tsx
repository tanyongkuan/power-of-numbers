import { type ReactNode } from "react";
import { redirect } from "next/navigation";
import config from "~/lib/config";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { DashboardContent } from "./_components/DashboardContent";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  const userInfo = await api.user.getUserInfo();

  return (
    <DashboardContent userInfo={userInfo.data}>{children}</DashboardContent>
  );
};

export default DashboardLayout;
