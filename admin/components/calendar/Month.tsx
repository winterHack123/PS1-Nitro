import React, { useEffect, useState } from "react";
import Day from "./Day";
import { useSupabase } from "../providers/supabase-provider";
import { Post } from "@/types/collections";
import CalendarSchedulingModal from "../ui/calendar-scheduling-modal";
import { postTypeIndex, postTypes } from "@/data";
import { useAuth } from "../providers/supabase-auth-provider";

const Month = ({ month, posts, setPosts, monthIndex }: any) => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const [day, setDay] = useState<any>();
  const [client, setClient] = useState<number>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [dayPostCount, setDayPostCount] = React.useState<number[]>(
    new Array(postTypes.length).fill(0)
  );

  useEffect(() => {
    (async () => {
      if (client) {
        try {
          setUserPosts([]);
          let query = supabase
            .from("posts")
            .select("*, orders!inner(*)")
            .eq("orders.client_id", client)
            .is("scheduled", null);

          if (user && user.role !== "admin") {
            query = query.eq("orders.saleby", user.id);
          }

          const { data } = await query;

          if (data) {
            const newArr = data.filter((post) => {
              let idx = postTypeIndex[post.type];
              let maxLimit: number = !!postTypes[idx].max
                ? postTypes[idx].max!
                : 10;

              if (dayPostCount[idx] >= maxLimit) return false;
              return true;
            });
            setUserPosts([
              {
                id: 179,
                type: "Post",
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
                type: "Post",
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
      }
    })();
  }, [client]);

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      <CalendarSchedulingModal
        date={day}
        client={client}
        setClient={setClient}
        userPosts={userPosts}
        setUserPosts={setUserPosts}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        dayPostCount={dayPostCount}
        setPosts={setPosts}
      />

      {month.map((row: any, i: number) => (
        <React.Fragment key={i}>
          {row.map((day: any, idx: number) => (
            <Day
              day={day}
              key={idx}
              rowIdx={i}
              posts={posts}
              setDay={setDay}
              setModalOpen={setModalOpen}
              setDayPostCount={setDayPostCount}
              monthIndex={monthIndex}
              setPosts={setPosts}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
