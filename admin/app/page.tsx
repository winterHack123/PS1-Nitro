"use client";
import CountGraph from "@/components/graph/dashboardCountGraph";
import SalesGraph from "@/components/graph/dashboardSalesGraph";
import { useAuth } from "@/components/providers/supabase-auth-provider";
import { useSupabase } from "@/components/providers/supabase-provider";
import PostDetailModal from "@/components/ui/post-detail-modal";
import { postTypes } from "@/data";
import { Post } from "@/types/collections";
import { toIndianCurrency } from "@/utils/currency";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { supabase } = useSupabase();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const [todaysAlignedPosts, setTodaysAlignedPosts] = useState<Post[]>([]);

  const [showClients, setShowClients] = useState(0);
  const [clientsCounts, setClientsCounts] = useState({
    today: 0,
    weekly: 0,
    monthly: 0,
    quarterly: 0,
    halfYearly: 0,
    yearly: 0,
  });

  const [companies, setCompanies] = useState<any>([]);
  const [roles, setRoles] = useState<any>([]);

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      router.push("/login");
    } else {
      const fetchCompanies = async () => {
        const { data, error } = await supabase.from("comapny").select();
        if (error) {
          console.log(error);
        } else {
          setCompanies(data);
        }
      };

      const fetchRoles = async () => {
        const { data, error } = await supabase.from("roles").select();
        if (error) {
          console.log(error);
        } else {
          setRoles(data);
        }
      };

      fetchCompanies();
      fetchRoles();
    }
  }, []);

  console.log({ companies, roles });

  const [yearOpts, setYearOpts] = useState(
    new Array(currentYear - 2018).fill(1)
  );

  const [salesCount, setSalesCount] = useState(new Array(12).fill(0));
  const [totalSales, setTotalSales] = useState(0);
  const [selectedSalesCountYear, setSelectedSalesCountYear] =
    useState(currentYear);

  return (
    <div className="flex w-full gap-3">
      <div className="bg-white overflow-hidden flex flex-col overflow-y-scroll shadow-md w-[65%] px-8 py-4 rounded-lg">
        <div className="text-lg border-b pb-2 font-semibold">Statistics</div>
        <div className="text-sm pt-3 flex-1 flex flex-col text-left">
          <div className="flex justify-between items-center mb-4">
            <div className="font-medium text-base  underline underline-offset-2">
              Companies
            </div>

            <select
              onChange={(e) => setShowClients(+e.target.value)}
              className="cursor-pointer bg-slate-200 rounded-sm px-2"
            >
              <option value={0}>Today</option>
              <option value={1}>This Week</option>
              <option value={2}>This Month</option>
            </select>
          </div>

          <div className="flex justify-between gap-4 border-b pb-7">
            {showClients === 0 ? (
              <div className="flex text-center border rounded-md py-2 px-4 w-1/4 flex-col">
                <div>Today</div>
                <div className="ml-1 font-medium text-lg">8</div>
              </div>
            ) : showClients === 1 ? (
              <div className="flex text-center border rounded-md py-2 px-4 w-1/4 flex-col">
                <div>This Week</div>
                <div className="ml-1 font-medium text-lg">20</div>
              </div>
            ) : (
              <div className="flex text-center border rounded-md py-2 px-4 w-1/4 flex-col">
                <div>This Month</div>
                <div className="ml-1 font-medium text-lg">20</div>
              </div>
            )}

            <div className="flex text-center border rounded-md py-2 px-4 w-1/4 flex-col">
              <div>Quaterly</div>
              <div className="ml-1 font-medium text-lg">20</div>
            </div>

            <div className="flex text-center border rounded-md py-2 px-4 w-1/4 flex-col">
              <div>Half Yearly</div>
              <div className="ml-1 font-medium text-lg">20</div>
            </div>

            <div className="flex text-center border rounded-md py-2 px-4 w-1/4 flex-col">
              <div>Yearly</div>
              <div className="ml-1 font-medium text-lg">20</div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-7 mb-3">
            <div className="flex gap-6">
              <div className="font-medium text-base underline underline-offset-2">
                Placement
              </div>

              <select
                onChange={(e) => setSelectedSalesCountYear(+e.target.value)}
                className="cursor-pointer bg-slate-200 rounded-sm px-2"
              >
                {yearOpts.map((data, index) => (
                  <option key={index} value={currentYear - index}>
                    {currentYear - index}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end flex-col text-[12px]">
              Total Placed
              <span className="text-[#01B4BC] text-lg -mt-1.5 font-semibold">
                {/* {toIndianCurrency(totalSales)} */}25
              </span>
            </div>
          </div>

          <SalesGraph salesCount={salesCount} />
        </div>
      </div>

      <div className="w-[35%] flex flex-col justify-between">
        <div className="bg-white overflow-hidden flex flex-col shadow-md py-4 rounded-lg h-full">
          <div className="flex justify-between pb-1 items-center px-6">
            <div className="text-base">Aligned for today</div>
          </div>

          <div className="overflow-y-scroll px-6 flex flex-col flex-1">
            <div className="flex justify-center h-full flex-col items-center flex-1">
              <img src="/empty.png" height={180} width={180} />
              <div className="text-gray-600 text-sm mt-2">
                No Companies Scheduled For Today
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
