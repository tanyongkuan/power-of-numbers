import { HydrateClient, api } from "~/trpc/server";
import { auth } from "~/server/auth";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Suspense } from "react";
import Hero from "~/components/Hero";
import FAQ from "~/components/FAQ";
import { redirect } from "next/navigation";
// import FeaturesListicle from "~/components/FeaturesListicle";
// import Pricing from "~/components/Pricing";
// import CTA from "~/components/CTA";

export default async function Home() {
  const session = await auth();

  if (session) {
    const response = await api.user.getPythagoreanTriangle();
    if (response.pythagoreanTriangle) {
      redirect("/dashboard");
    }
    redirect("/onboarding");
  }

  return (
    <HydrateClient>
      <Suspense>
        <Header />
      </Suspense>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Hero />
        <FAQ />
        {/* <FeaturesListicle />
        <Pricing />
        <CTA /> */}
      </main>
      <Footer />
    </HydrateClient>
  );
}
