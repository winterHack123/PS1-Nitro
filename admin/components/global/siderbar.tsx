"use client";
import {
  Calendar,
  History,
  LayoutDashboard,
  ListOrdered,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import { useSupabase } from "../providers/supabase-provider";
import { customerActions } from "@/store/customer.store";
import { useAppDispatch } from "@/store/hooks";
import { useAuth } from "../providers/supabase-auth-provider";

interface ITab {
  title: string;
  icon: ReactElement;
  path: string;
  expression: RegExp;
}

const Tab = ({ tab }: { tab: ITab }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(tab.path)}
      className={`rounded-md ${
        RegExp(tab.expression).test(pathname)
          ? "bg-[#FFDE59] text-black"
          : "text-white"
      } text-base py-1.5 px-2 cursor-pointer flex items-center`}
    >
      {tab.icon}
      {tab.title}
    </div>
  );
};

const generalTabs: ITab[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="mr-2" size={14} />,
    path: "/",
    expression: /^\/$/,
  },
  {
    title: "Calendar",
    icon: <Calendar className="mr-2" size={14} />,
    path: "/calendar",
    expression: /\/calendar/,
  },
  {
    title: "Companies",
    icon: <UserCheck className="mr-2" size={14} />,
    path: "/clients",
    expression: /\/clients/,
  },
];

const Siderbar = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const { supabase } = useSupabase();
  const dispatch = useAppDispatch();

  const user = localStorage.getItem("email");

  useEffect(() => {
    getClients();
  }, []);

  async function getClients() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("clients")
        .select(`*`)
        .order("created_at", { ascending: false });

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        dispatch(customerActions.setCustomers([...data]));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`h-screen w-full`}>
      <div className="bg-[#01B4BC] h-full overflow-y-scroll w-full p-4 text-quaternary-blue ">
        <Link passHref href="/">
          <div className="flex relative items-center justify-between cursor-pointer rounded-2xl mb-4">
            <div className="rounded-full overflow-hidden h-20 w-20 mx-auto">
              {
                <img
                  src={
                    "data:image/png;base64,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"
                  }
                  className="h-20 w-20 object-cover"
                />
              }
            </div>
          </div>
        </Link>

        <hr className="mb-3" />

        <div className="space-y-1">
          <div className="text-[11px] text-gray-100 px-2 mb-2 font-light">
            GENERAL
          </div>

          {generalTabs.map((tab, index) => (
            <Tab key={index} tab={tab} />
          ))}

          {user === "tnp@nitgoa.ac.in" && (
            <Tab
              tab={{
                title: "Students",
                icon: <Users className="mr-2" size={14} />,
                path: "/students",
                expression: /\/students/,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Siderbar;
