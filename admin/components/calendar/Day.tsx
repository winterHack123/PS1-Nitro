import { Post } from "@/types/collections";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { postTypeIndex, postTypes } from "@/data";
import PostDetailModal from "../ui/post-detail-modal";

const daySelected = new Date();

export default function Day({
  day,
  rowIdx,
  posts,
  setDay,
  setModalOpen,
  setDayPostCount,
  monthIndex,
  setPosts,
}: any) {
  const [dayEvents, setDayEvents] = useState<Post[]>([]);
  const [count, setCount] = React.useState<number[]>(
    new Array(postTypes.length).fill(0)
  );

  useEffect(() => {
    let newArr = new Array(postTypes.length).fill(0);

    const events = posts.filter((post: Post) => {
      if (dayjs(post.scheduled).format("DD-MM-YY") === day.format("DD-MM-YY")) {
        newArr[postTypeIndex[post.type]]++;
        return true;
      }
      return false;
    });

    setCount([...newArr]);
    setDayEvents(events);
  }, [posts, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  const user = localStorage.getItem("email");

  return (
    <div className="border border-gray-700 flex flex-col">
      <header className="flex flex-col w-full">
        {rowIdx === 0 && (
          <div className="text-sm text-white bg-[#01B4BC] w-full text-center py-2 border-b">
            {day.format("ddd").toUpperCase()}
          </div>
        )}

        {day.month() == (12 + (monthIndex % 12)) % 12 && (
          <p className={`text-sm p-0.5 text-center ${getCurrentDayClass()}`}>
            {day.format("DD")}
          </p>
        )}
      </header>

      {day.month() == (12 + (monthIndex % 12)) % 12 ? (
        <div
          className="flex-1 flex flex-col w-full"
          onClick={() => {
            // setDay(day);
            // setDaySelected(day);
            // setShowEventModal(true);
          }}
        >
          {dayEvents.map((post: Post, idx) => (
            <PostDetailModal key={idx} post={post} setPosts={setPosts}>
              <div
                key={idx}
                className={`${
                  dayjs(post.scheduled).isAfter(dayjs())
                    ? post.insight
                      ? "bg-yellow-500 text-white"
                      : post.link
                      ? "bg-[#01B4BC] text-white"
                      : "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                } p-1 mx-2 text-gray-600 cursor-pointer text-sm rounded my-0.5 truncate`}
              >
                {dayjs(post.scheduled).format("DD-MM-YY") ===
                day.format("DD-MM-YY")
                  ? post.type + " - " + post?.orders?.clients.brand
                  : ""}
              </div>
            </PostDetailModal>
          ))}

          {user == "tnp@nitgoa.ac.in" && (
            <div className="p-1 mt-auto">
              {dayjs(day).format("DD-MM-YY") === dayjs().format("DD-MM-YY") ||
              dayjs(day).isAfter(dayjs()) ? (
                <button
                  onClick={() => {
                    setDayPostCount([...count]);
                    setDay(dayjs(day).format("YYYY-MM-DD"));
                    setModalOpen(true);
                  }}
                  className="bg-slate-200 rounded-sm py-0.5 flex cursor-pointer justify-center w-full text-center"
                >
                  <Plus size={18} className="text-[#01B4BC]" />
                </button>
              ) : (
                <button className="bg-gray-200 cursor-not-allowed rounded-sm py-0.5 flex justify-center w-full text-center">
                  <Plus size={18} className="text-gray-600" />
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white flex-1" />
      )}
    </div>
  );
}
