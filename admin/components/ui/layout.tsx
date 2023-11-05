"use client";
import React, { useState } from "react";
import Siderbar from "../global/siderbar";
import Header from "../global/header";
import { useAuth } from "../providers/supabase-auth-provider";
import { usePathname, useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  if (isLoading) {
    return (
      <div className="h-screen bg-brand-secondary w-screen flex flex-col items-center justify-center">
        <img
          src="HIAcolor.png"
          alt="logo"
          className="h-24 w-24 mx-auto animate-pulse"
        />
        <span className="text-brand-primary text-lg animate-pulse font-bold">
          NITGoa
        </span>
      </div>
    );
  }

  // if (!user && pathname !== "/password-reset") {
  //   if (pathname !== "/login" && !pathname.includes("/confirmation")) {
  //     router.replace("/login");
  //     return <div></div>;
  //   }
  // }

  if (pathname.includes("/confirmation")) {
    return <div className="flex h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen">
      <div
        className={`${
          showNavbar
            ? "sm:w-6/12 md:w-3/12 lg:w-2.5/12 md:block hidden"
            : "hidden w-0"
        }`}
      >
        <Siderbar />
      </div>
      <div className="w-full flex flex-col h-screen bg-[#FCFBFC]">
        <Header showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
        <div className="w-full max-h-full overflow-y-scroll flex flex-1 px-8 py-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
