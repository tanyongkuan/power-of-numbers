import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function OnboardingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (session === null) {
    redirect("/");
  }

  const userInfo = await api.user.getPythagoreanTriangle();

  if (userInfo.pythagoreanTriangle) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
