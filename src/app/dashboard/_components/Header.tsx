import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { signOut } from "~/server/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { handleSignOut } from "~/actions/auth";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Self-Discovery Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* <UserAvatar /> */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem> */}
              <DropdownMenuItem>
                <form
                  action={async () => {
                    // signOut() Method will be declared later
                    "use server";
                    await signOut({ callbackUrl: "/" });
                  }}
                >
                  <button>Log Out</button>
                </form>
                {/* <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
