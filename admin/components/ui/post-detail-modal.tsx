"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Loader, X } from "lucide-react";
import { Post } from "@/types/collections";
import { Separator } from "./seperator";
import { useRouter } from "next/navigation";
import { useSupabase } from "../providers/supabase-provider";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { validateLink } from "@/utils/validator";
import { confirmAlert } from "react-confirm-alert";
import {
  DeliverablePostingWhatsappMessage,
  ReportPostingWhatsappMessage,
} from "@/utils/whatsapp";

const PostDetailModal = ({
  post,
  setPosts,
  children,
}: {
  post: Post;
  setPosts: any;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [open, setOpen] = React.useState(false);

  const [postLink, setPostLink] = React.useState<string>("");
  const [insightLink, setInsightLink] = React.useState<string>("");
  const [postLinkSubmitting, setPostLinkSubmitting] =
    React.useState<boolean>(false);
  const [insightLinkSubmitting, setInsightLinkSubmitting] =
    React.useState<boolean>(false);

  const handlePostLinkSubmit = async () => {
    if (postLink.length === 0) return;

    setPostLinkSubmitting(true);

    try {
      const { data } = await supabase
        .from("posts")
        .update({ link: postLink })
        .eq("id", +post.id)
        .select(
          "*, orders!inner(*, clients!inner(id, name, brand, phone), saleby(*))"
        )
        .single();

      if (data) {
        setPosts((prev: Post[]) => [
          ...prev.map((item) => {
            if (item.id == +post.id) item.link = postLink;
            return item;
          }),
        ]);

        DeliverablePostingWhatsappMessage({
          phone: data?.orders?.clients?.phone,
          name: data?.orders?.clients?.name,
          deliverable: data.type,
          quantity: "1",
          link: postLink,
          executive: `${data?.orders?.saleby?.full_name} - ${data?.orders?.saleby?.email}`,
        });

        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
    setPostLinkSubmitting(false);
  };

  const handlePostInsightSubmit = async () => {
    if (insightLink.length === 0 || !validateLink(insightLink))
      return toast.error("Enter a valid link");

    setInsightLinkSubmitting(true);

    try {
      const { data } = await supabase
        .from("posts")
        .update({ insight: insightLink })
        .eq("id", +post.id)
        .select(
          "*, orders!inner(*, clients!inner(id, name, brand, phone), saleby(*))"
        )
        .single();

      if (data) {
        ReportPostingWhatsappMessage({
          phone: data?.orders?.clients?.phone,
          name: data?.orders?.clients?.name,
          deliverable: data.type,
          quantity: "1",
          brand: data?.orders?.clients?.brand,
          executive: `${data?.orders?.saleby?.full_name} - ${data?.orders?.saleby?.email}`,
          link: insightLink,
        });
      }

      setPosts((prev: Post[]) => [
        ...prev.map((item) => {
          if (item.id == +post.id) item.insight = insightLink;
          return item;
        }),
      ]);

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    setInsightLinkSubmitting(false);
  };

  const handleUnschedulePost = async () => {
    try {
      const { data } = await supabase
        .from("posts")
        .update({ scheduled: null })
        .eq("id", +post.id);

      setPosts((prev: Post[]) => [
        ...prev.map((item) => {
          if (item.id === +post.id) {
            item.scheduled = null;
            return post;
          }
          return item;
        }),
      ]);

      toast.success("Post unscheduled!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div className="w-full" onClick={() => setOpen(true)}>
          {children}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{post.type}</Dialog.Title>

          <Separator />

          <div className="flex flex-col">
            <div className="flex justify-between mt-4">
              <div>Interviewer</div>
              <div
                onClick={() =>
                  router.push(`/clients/${post?.orders?.clients?.id}`)
                }
                className="text-blue-600 cursor-pointer text-sm"
              >
                {post?.orders?.clients?.name}
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <div>Meeting Link</div>
              {post?.asset ? (
                <a
                  target="_blank"
                  className="text-blue-600 text-sm"
                  href={post?.asset}
                >
                  Link
                </a>
              ) : (
                "-"
              )}
            </div>

            <div className="flex justify-between mt-3">
              <div>Note</div>
              <div className="text-gray-700 text-sm">
                {post?.collaboration ? post?.collaboration : "-"}
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <div>Scheduled</div>
              <div className="text-gray-700 text-sm">
                {dayjs(post?.scheduled).isAfter(dayjs()) ? (
                  post?.scheduled ? (
                    dayjs(post.scheduled).format("hh:mm A - DD/MM/YY")
                  ) : (
                    "Unscheduled"
                  )
                ) : post?.scheduled ? (
                  <button
                    className="bg-[#01B4BC] text-white rounded-md cursor-pointer py-1 px-3"
                    onClick={() => handleUnschedulePost()}
                  >
                    Realign
                  </button>
                ) : (
                  <button
                    className="bg-[#01B4BC] text-white rounded-md cursor-pointer py-1 px-3"
                    onClick={() => router.push("/calendar")}
                  >
                    Schedule
                  </button>
                )}
              </div>
            </div>

            {!post?.link && post?.scheduled ? (
              <div className="flex gap-3 mt-4">
                <input
                  placeholder="Post Link"
                  value={postLink}
                  onChange={(e) => setPostLink(e.target.value)}
                  className="text-sm bg-slate-100 px-4 py-2 rounded-md flex-1"
                />
                {postLinkSubmitting ? (
                  <button className="bg-[#01B4BC] text-white cursor-pointer rounded-md p-2">
                    <Loader size={20} className="animate-spin" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!validateLink(postLink))
                        return toast.error("Enter a valid link");

                      setOpen(false);

                      confirmAlert({
                        customUI: ({ onClose }) => {
                          return (
                            <div
                              style={{
                                zIndex: 1000,
                                backgroundColor: "white",
                                position: "fixed",
                                bottom: 20,
                                right: 20,
                                padding: 20,
                                borderRadius: 15,
                              }}
                            >
                              <h1>Are you sure the deliverable is posted?</h1>

                              <button
                                onClick={() => {
                                  setPostLink("");
                                  onClose();
                                }}
                                style={{
                                  padding: "4px 10px",
                                  backgroundColor: "red",

                                  color: "white",
                                  borderRadius: "8px",
                                  marginRight: 10,
                                  marginTop: 10,
                                  cursor: "pointer",
                                }}
                              >
                                No
                              </button>
                              <button
                                onClick={() => {
                                  handlePostLinkSubmit();
                                  setPostLink("");
                                  onClose();
                                }}
                                style={{
                                  padding: "4px 10px",
                                  color: "white",
                                  backgroundColor: "#01B4BC",

                                  borderRadius: "8px",
                                  marginTop: 10,
                                  cursor: "pointer",
                                }}
                              >
                                Yes, Confirm!
                              </button>
                            </div>
                          );
                        },
                      });
                    }}
                    className="bg-[#01B4BC] text-white cursor-pointer rounded-md p-2"
                  >
                    <Check size={20} />
                  </button>
                )}
              </div>
            ) : post?.link && post?.scheduled ? (
              <div className="flex justify-between mt-3">
                <div>Post Link</div>
                <a href={post?.link} className="text-blue-600 text-sm">
                  Link
                </a>
              </div>
            ) : null}

            {!post?.insight && post?.link ? (
              <div className="flex gap-3 mt-4">
                <input
                  placeholder="Insight link"
                  value={insightLink}
                  onChange={(e) => setInsightLink(e.target.value)}
                  className="text-sm bg-slate-100 px-4 py-2 rounded-md flex-1"
                />

                {insightLinkSubmitting ? (
                  <button className="bg-[#01B4BC] text-white cursor-pointer rounded-md p-2">
                    <Loader size={20} className="animate-spin" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!validateLink(insightLink))
                        return toast.error("Enter a valid link");

                      setOpen(false);

                      confirmAlert({
                        customUI: ({ onClose }) => {
                          return (
                            <div
                              style={{
                                zIndex: 1000,
                                backgroundColor: "white",
                                position: "fixed",
                                bottom: 20,
                                right: 20,
                                padding: 20,
                                borderRadius: 15,
                              }}
                            >
                              <h1>
                                Are you sure you want to submit the insight?
                              </h1>

                              <button
                                onClick={() => {
                                  setInsightLink("");
                                  onClose();
                                }}
                                style={{
                                  padding: "4px 10px",
                                  backgroundColor: "red",

                                  color: "white",
                                  borderRadius: "8px",
                                  marginRight: 10,
                                  marginTop: 10,
                                  cursor: "pointer",
                                }}
                              >
                                No
                              </button>
                              <button
                                onClick={() => {
                                  handlePostInsightSubmit();
                                  setInsightLink("");
                                  onClose();
                                }}
                                style={{
                                  padding: "4px 10px",
                                  color: "white",
                                  backgroundColor: "#01B4BC",

                                  borderRadius: "8px",
                                  marginTop: 10,
                                  cursor: "pointer",
                                }}
                              >
                                Yes, Confirm!
                              </button>
                            </div>
                          );
                        },
                      });
                    }}
                    className="bg-[#01B4BC] text-white cursor-pointer rounded-md p-2"
                  >
                    <Check size={20} />
                  </button>
                )}
              </div>
            ) : post?.insight && post?.link ? (
              <div className="flex justify-between mt-3">
                <div>Insight</div>
                <a href={post?.insight} className="text-blue-600 text-sm">
                  Link
                </a>
              </div>
            ) : null}

            {post?.scheduled &&
            dayjs(post?.scheduled).isAfter(dayjs()) &&
            !post?.link ? (
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-red-500 text-white px-6 rounded-md text-sm py-1 cursor-pointer"
                  onClick={() => handleUnschedulePost()}
                >
                  Realign
                </button>
              </div>
            ) : null}
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

export default PostDetailModal;
