import type { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "~/app/icon.png";
import config from "~/lib/config";
import { signIn } from "~/server/auth";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Menu } from "lucide-react";

import { Button } from "./ui/button";

const links: {
  href: string;
  label: string;
}[] = [
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#testimonials",
    label: "Reviews",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

const cta: JSX.Element = (
  <form
    action={async () => {
      "use server";
      await signIn("google");
    }}
  >
    <Button type="submit">Get Started</Button>
  </form>
);

const LogoLink: JSX.Element = (
  <Link
    className="flex shrink-0 items-center gap-2"
    href="/"
    title={`${config.appName} hompage`}
  >
    <Image
      src={logo}
      alt={`${config.appName} logo`}
      className="w-8"
      placeholder="blur"
      priority={true}
    />
    <span className="text-lg font-extrabold">{config.appName}</span>
  </Link>
);

// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = () => {
  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5"
        aria-label="Global"
      >
        {/* Your logo/name on large screens */}
        <div className="flex lg:flex-1">{LogoLink}</div>
        {/* Burger button to open menu on mobile */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <span className="sr-only">Open main menu</span>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{LogoLink}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flow-root">
                <div className="py-4">
                  <div className="flex flex-col items-start gap-y-4">
                    {links.map((link) => (
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          key={link.href}
                          className="link link-hover"
                          title={link.label}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
                <div className="divider"></div>
                {/* Your CTA on small screens */}
                <div className="flex flex-col">{cta}</div>
              </div>
              {/* <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter> */}
            </SheetContent>
          </Sheet>
        </div>

        {/* Your links on large screens */}
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-12">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover"
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA on large screens */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">{cta}</div>
      </nav>
    </header>
  );
};

export default Header;
