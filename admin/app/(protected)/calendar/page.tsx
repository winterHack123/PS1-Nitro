"use client";
import React, { useEffect, useState } from "react";
import { getMonth } from "@/utils/time";
import Month from "@/components/calendar/Month";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import dayjs from "dayjs";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Post } from "@/types/collections";
import { useAuth } from "@/components/providers/supabase-auth-provider";

const Apps = () => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 179,
      type: "SDE 1",
      scheduled: "2023-11-03T17:13:00",
      // posted: null,
      // link: null,
      asset: "drive.com",
      // caption: null,
      collaboration: "",
      order_id: 55,
      created_at: "2023-10-07T12:41:34.004677+00:00",
      insight: null,
      orders: {
        id: 55,
        client_id: 110,
        saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
        total: 10000,
        created_at: "2023-10-07T12:41:33.522409+00:00",
        incentive: true,
        attachments: "",
        payment: "UPI",
        clients: {
          id: 110,
          name: "Rahul Agarwal",
          brand: "Amazon",
        },
      },
    },
    {
      id: 178,
      type: "DevOps",
      scheduled: "2023-11-07T16:14:00",
      // posted: null,
      // link: null,
      asset: "drive.com",
      // caption: null,
      collaboration: "",
      order_id: 55,
      created_at: "2023-10-07T12:41:34.004677+00:00",
      insight: null,
      orders: {
        id: 55,
        client_id: 110,
        saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
        total: 10000,
        created_at: "2023-10-07T12:41:33.522409+00:00",
        incentive: true,
        attachments: "",
        payment: "UPI",
        clients: {
          id: 110,
          name: "Rahul Agarwal",
          brand: "Google",
        },
      },
    },
    {
      id: 184,
      type: "SDE 3",
      scheduled: "2023-11-10T18:14:00",
      // posted: null,
      // link: null,
      asset: "drive.com",
      // caption: null,
      collaboration: "",
      order_id: 55,
      created_at: "2023-10-07T12:41:34.004677+00:00",
      insight: null,
      orders: {
        id: 55,
        client_id: 110,
        saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
        total: 10000,
        created_at: "2023-10-07T12:41:33.522409+00:00",
        incentive: true,
        attachments: "",
        payment: "UPI",
        clients: {
          id: 110,
          name: "Rahul Agarwal",
          brand: "Uber",
        },
      },
    },
    {
      id: 185,
      type: "Database Engineer",
      scheduled: "2023-11-08T18:15:00",
      // posted: null,
      // link: null,
      asset: "drive.com",
      // caption: null,
      collaboration: "",
      order_id: 55,
      created_at: "2023-10-07T12:41:34.004677+00:00",
      insight: null,
      orders: {
        id: 55,
        client_id: 110,
        saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
        total: 10000,
        created_at: "2023-10-07T12:41:33.522409+00:00",
        incentive: true,
        attachments: "",
        payment: "UPI",
        clients: {
          id: 110,
          name: "Rahul Agarwal",
          brand: "Amazon",
        },
      },
    },
    {
      id: 186,
      type: "SDE 1",
      scheduled: "2023-11-04T18:24:00",
      // posted: null,
      // link: null,
      asset: "drive.com",
      // caption: null,
      collaboration: "",
      order_id: 55,
      created_at: "2023-10-07T12:41:34.004677+00:00",
      insight: null,
      orders: {
        id: 55,
        client_id: 110,
        saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
        total: 10000,
        created_at: "2023-10-07T12:41:33.522409+00:00",
        incentive: true,
        attachments: "",
        payment: "UPI",
        clients: {
          id: 110,
          name: "Rahul Agarwal",
          brand: "DD UNIVERSAL STUDIO",
        },
      },
    },
  ]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));

    var date = new Date(dayjs().year(), monthIndex);
    var startDate = dayjs(
      new Date(date.getFullYear(), date.getMonth(), 1)
    ).toISOString();
    var lastDate = dayjs(
      new Date(date.getFullYear(), date.getMonth() + 1, 0)
    ).toISOString();

    (async () => {
      try {
        let query = supabase
          .from("posts")
          .select("*, orders(*, clients(id, name, brand))")
          // .is('link', null)
          .lt("scheduled", lastDate)
          .gt("scheduled", startDate);

        if (user && user.role !== "admin") {
          query = query.eq("orders.saleby", user.id);
        }

        const { data } = await query;

        if (data) {
          setPosts([
            {
              id: 179,
              type: "",
              scheduled: "2023-11-03T17:13:00",
              // posted: null,
              // link: null,
              asset: "drive.com",
              // caption: null,
              collaboration: "",
              order_id: 55,
              created_at: "2023-10-07T12:41:34.004677+00:00",
              insight: null,
              orders: {
                id: 55,
                client_id: 110,
                saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
                total: 10000,
                created_at: "2023-10-07T12:41:33.522409+00:00",
                incentive: true,
                attachments: "",
                payment: "UPI",
                clients: {
                  id: 110,
                  name: "Rahul Agarwal",
                  brand: "DD UNIVERSAL STUDIO",
                },
              },
            },
            {
              id: 178,
              type: "",
              scheduled: "2023-11-07T16:14:00",
              // posted: null,
              // link: null,
              asset: "drive.com",
              // caption: null,
              collaboration: "",
              order_id: 55,
              created_at: "2023-10-07T12:41:34.004677+00:00",
              insight: null,
              orders: {
                id: 55,
                client_id: 110,
                saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
                total: 10000,
                created_at: "2023-10-07T12:41:33.522409+00:00",
                incentive: true,
                attachments: "",
                payment: "UPI",
                clients: {
                  id: 110,
                  name: "Rahul Agarwal",
                  brand: "DD UNIVERSAL STUDIO",
                },
              },
            },
            {
              id: 184,
              type: "Story",
              scheduled: "2023-11-10T18:14:00",
              // posted: null,
              // link: null,
              asset: "drive.com",
              // caption: null,
              collaboration: "",
              order_id: 55,
              created_at: "2023-10-07T12:41:34.004677+00:00",
              insight: null,
              orders: {
                id: 55,
                client_id: 110,
                saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
                total: 10000,
                created_at: "2023-10-07T12:41:33.522409+00:00",
                incentive: true,
                attachments: "",
                payment: "UPI",
                clients: {
                  id: 110,
                  name: "Rahul Agarwal",
                  brand: "DD UNIVERSAL STUDIO",
                },
              },
            },
            {
              id: 185,
              type: "Ads Amplification",
              scheduled: "2023-11-08T18:15:00",
              // posted: null,
              // link: null,
              asset: "drive.com",
              // caption: null,
              collaboration: "",
              order_id: 55,
              created_at: "2023-10-07T12:41:34.004677+00:00",
              insight: null,
              orders: {
                id: 55,
                client_id: 110,
                saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
                total: 10000,
                created_at: "2023-10-07T12:41:33.522409+00:00",
                incentive: true,
                attachments: "",
                payment: "UPI",
                clients: {
                  id: 110,
                  name: "Rahul Agarwal",
                  brand: "DD UNIVERSAL STUDIO",
                },
              },
            },
            {
              id: 186,
              type: "Ads Amplification",
              scheduled: "2023-11-04T18:24:00",
              // posted: null,
              // link: null,
              asset: "drive.com",
              // caption: null,
              collaboration: "",
              order_id: 55,
              created_at: "2023-10-07T12:41:34.004677+00:00",
              insight: null,
              orders: {
                id: 55,
                client_id: 110,
                saleby: "a3571bcb-1fef-4c5c-b1ff-13fc7a8870ea",
                total: 10000,
                created_at: "2023-10-07T12:41:33.522409+00:00",
                incentive: true,
                attachments: "",
                payment: "UPI",
                clients: {
                  id: 110,
                  name: "Rahul Agarwal",
                  brand: "DD UNIVERSAL STUDIO",
                },
              },
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [monthIndex]);

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="flex items-center mr-4">
          <div className="h-2 w-2 bg-red-500 mr-2" />
          <div>Interviewed</div>
        </div>
        |
        <div className="flex items-center mx-4">
          <div className="h-2 w-2 bg-green-500 mr-2" />
          <div>Scheduled</div>
        </div>
      </div>
      <CalendarHeader monthIndex={monthIndex} setMonthIndex={setMonthIndex} />
      <Month
        month={currenMonth}
        monthIndex={monthIndex}
        posts={posts}
        setPosts={() => {}}
      />
    </div>
  );
};

export default Apps;
