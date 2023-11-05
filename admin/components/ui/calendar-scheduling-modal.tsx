"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useSupabase } from "../providers/supabase-provider";
import { Customer, Post } from "@/types/collections";
import dayjs from "dayjs";
import { validateLink } from "@/utils/validator";
import { toast } from "react-hot-toast";
import { useAuth } from "../providers/supabase-auth-provider";
import { DeliverableSchedulingWhatsappMessage } from "@/utils/whatsapp";

const CalendarSchedulingModal = ({
  date,
  client,
  setClient,
  userPosts,
  setUserPosts,
  modalOpen: open,
  setModalOpen: setOpen,
  dayPostCount,
  setPosts,
}: {
  date: any;
  setClient: any;
  client: number | undefined;
  userPosts: Post[];
  setUserPosts: Dispatch<SetStateAction<Post[]>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  dayPostCount: number[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
}) => {
  const { supabase } = useSupabase();
  const { user } = useAuth();

  const [customers, setCustomers] = useState<any[]>([]);

  // const customers = useAppSelector((store) => store.customer.customers);

  const [loading, setLoading] = React.useState(false);

  const [tempResult, setTempResult] = useState<{
    [key: string]: any;
  }>({});

  const [selectedPost, setSelectedPost] = useState<number>();
  const [post, setPost] = useState<number>();
  const [asset, setAsset] = useState<string | undefined>("");
  const [caption, setCaption] = useState<string | undefined>("");
  const [note, setNote] = useState<string | undefined>("");
  const [time, setTime] = useState<string | undefined>("");

  console.log(customers.find((c) => c.id === client));

  const handleSubmit = async () => {
    // setLoading(true);
    try {
      const day = dayjs(date + " " + time);
      const postUpdate = {
        asset: asset && asset?.length > 0 ? asset : undefined,
        caption: caption && caption?.length > 0 ? caption : undefined,
        scheduled: day.format("YYYY-MM-DD HH:mm:ss"),
        collaboration: note,
      };

      const { data, error } = await supabase
        .from("posts")
        .update(postUpdate)
        .eq("id", post)
        .select(
          "*, orders!inner(*, clients!inner(id, name, brand), saleby(*))"
        );

      if (data && data.length > 0) {
        let choosenCustomer = customers.find((c) => c.id === client);

        DeliverableSchedulingWhatsappMessage({
          name: choosenCustomer?.name,
          quantity: "1",
          dateTime: day.format("DD MMM YYYY hh:mm A"),
          phone: choosenCustomer?.phone,
          deliverable: data[0]?.type,
          executive: `${data[0]?.orders?.saleby?.full_name} - ${data[0]?.orders?.saleby?.email}`,
        });
        setPosts((prev) => [...prev, data[0]]);
        setClient();
        setSelectedPost(undefined);
        setPost(undefined);
        setAsset("");
        setCaption("");
        setNote("");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    let newObj: {
      [key: string]: any;
    } = {};
    for (let post of userPosts)
      newObj[post.type] = {
        ...post,
        count: newObj[post.type] ? newObj[post.type].count + 1 : 1,
      };

    setTempResult({ ...newObj });
  }, [userPosts]);

  useEffect(() => {
    (async () => {
      try {
        let query = supabase
          .from("posts")
          .select("*, order_id(client_id(*)), orders!inner(*)")
          .is("scheduled", null);

        if (user && user.role !== "admin") {
          query = query.eq("orders.saleby", user.id);
        }

        const { data } = await query;

        if (data) {
          let filteredData = data.filter(
            (value: any, index, self) =>
              self.findIndex(
                (v: any) =>
                  v?.order_id?.client_id.id === value?.order_id?.client_id.id
              ) === index
          );

          filteredData = filteredData.map(
            (value: any, index) => value?.order_id?.client_id
          );

          setCustomers([...filteredData]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* <Dialog.Trigger asChild>
        <button className="bg-slate-200 rounded-sm py-1 flex cursor-pointer justify-center w-full text-center">
          <Plus size={18} className="text-[#01B4BC]" />
        </button>
      </Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Schedule Deliverable
          </Dialog.Title>

          <fieldset className="Fieldset mt-5">
            <label className="Label" htmlFor="name">
              Company*
            </label>

            <select
              value={client}
              onChange={(e) => setClient(+e.target.value)}
              className="outline-none cursor-pointer bg-gray-100 -ml-1 w-full py-2 px-3 rounded-md"
            >
              <option
                value="default"
                selected={true}
                disabled={true}
                className="text-gray-400"
              >
                Choose Company
              </option>
              {customers.map((customer, index) => (
                <option key={index} value={customer.id}>
                  {customer.name} - {customer.brand}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Role*
            </label>

            <select
              value={selectedPost}
              onChange={(e) => {
                setSelectedPost(+e.target.value);
                setPost(userPosts[+e.target.value].id);
                setAsset(
                  userPosts[+e.target.value].asset
                    ? userPosts[+e.target.value].asset
                    : ""
                );
                setCaption(
                  userPosts[+e.target.value].caption
                    ? userPosts[+e.target.value].caption
                    : ""
                );
              }}
              className="outline-none cursor-pointer bg-gray-100 w-full -ml-1 py-2 px-3 rounded-md"
            >
              <option
                value="default"
                selected={true}
                disabled={true}
                className="text-gray-400"
              >
                Choose Role
              </option>

              {userPosts.map((post, index) => (
                <option key={index} value={index}>
                  {post.type + " (" + tempResult[post.type]?.count + ")"}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              <div className="pt-2">Time*</div>
            </label>

            <input
              type="time"
              id="appt"
              className="outline-none cursor-pointer bg-gray-100 w-full -ml-1 py-2 px-3 rounded-md"
              name="appt"
              onChange={(e) => setTime(e.target.value)}
            ></input>
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Notes
            </label>
            <textarea
              className="border outline-none bg-gray-100 w-full py-1 -ml-1 px-3 rounded-md"
              id="username"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </fieldset>

          <div
            style={{
              display: "flex",
              marginTop: 15,
              justifyContent: "flex-end",
            }}
          >
            {loading ? (
              <button className="bg-[#01B4BC] cursor-pointer text-white px-4 py-0.5 rounded-md">
                Scheduling...
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!post) return toast.error("Choose a deliverable");
                  if (!time) return toast.error("Choose a valid time");
                  if (!asset || (asset && !validateLink(asset)))
                    return toast.error("Enter a valid asset link");

                  handleSubmit();
                }}
                className="bg-[#01B4BC] cursor-pointer text-white px-4 py-0.5 rounded-md"
              >
                Schedule
              </button>
            )}
          </div>

          <Dialog.Close asChild>
            <button className="IconButton cursor-pointer" aria-label="Close">
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CalendarSchedulingModal;
