"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CreditCard,
  LogOut,
  Settings,
  User,
  BellIcon,
  Menu,
} from "lucide-react";
import { useAuth } from "../providers/supabase-auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";

const Header = ({
  showNavbar,
  setShowNavbar,
}: {
  showNavbar: boolean;
  setShowNavbar: Dispatch<SetStateAction<boolean>>;
}) => {
  const { signOut } = useAuth();

  const pathname = usePathname();

  const user = localStorage.getItem("email");

  console.log(user);

  type IOPathnameTitle = {
    [key: string]: string;
  };

  const pathnameTitle: IOPathnameTitle = {
    "/": "DASHBOARD",
    "/clients": "COMPANIES",
    "/calendar": "CALENDAR",
    "/deliverables": "DELIVERABLES",
    "/history": "ORDER HISTORY",
    "/students": "STUDENTS",
  };

  return (
    <div className="w-full bg-white py-4 px-8 border-b flex justify-between items-center">
      <div className="text-base flex text-gray-700 font-medium text-center">
        <div
          onClick={() => setShowNavbar((prev) => !prev)}
          className="mr-4 cursor-pointer"
        >
          <Menu />
        </div>
        {pathnameTitle[pathname] || ""}
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              {/* <AvatarImage src={user?. ?? ''} alt="@shadcn" /> */}
              <AvatarFallback>
                {user === "tnp@nitgoa.ac.in" ? "NIT" : "SG"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}

            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
