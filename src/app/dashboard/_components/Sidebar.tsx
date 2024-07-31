// app/dashboard/_components/Sidebar.tsx
"use client";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { id: "power-of-numbers", label: "Power of Numbers" },
    // { id: "root-number", label: "Root Number Analysis" },
    // { id: "life-path", label: "Life Path Analysis" },
    // { id: "career", label: "Career Rankings" },
    // { id: "health", label: "Health Analysis" },
    // { id: "strengths", label: "Strengths to Leverage" },
    // { id: "improvements", label: "Areas for Improvement" },
    // { id: "pitfalls", label: "Potential Pitfalls" },
    // { id: "career-paths", label: "Suggested Career Paths" },
  ];

  const SidebarContent = () => (
    <nav className="space-y-2">
      {menuItems.map((item) => (
        <Link href={`/dashboard/${item.id}`} key={item.id}>
          <Button variant="ghost" className="w-full justify-start">
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-shrink-0 bg-gray-100 p-4 md:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-50 md:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};
