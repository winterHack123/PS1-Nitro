"use client";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Edit, X } from "lucide-react";
import { useSupabase } from "../providers/supabase-provider";
import { useAppDispatch } from "@/store/hooks";
import { customerActions } from "@/store/customer.store";
import { toast } from "react-hot-toast";
import { validateEmail, validatePhoneNumber } from "@/utils/validator";
import { Customer } from "@/types/collections";
import { confirmAlert } from "react-confirm-alert";

const EditClientDialog = ({ client }: { client: Customer }) => {
  const { supabase } = useSupabase();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");

  const clearState = () => {
    setName("");
    setBrand("");
    setEmailId("");
    setPhone("");
    setInstagram("");
  };

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (name.length === 0) return toast.error("Name can't be empty");
    else if (brand.length === 0) return toast.error("Brand can't be empty");
    else if (emailId.length === 0 || !validateEmail(emailId))
      return toast.error("Enter valid email");
    else if (phone.length === 0 || !validatePhoneNumber(phone))
      return toast.error("Enter valid phone number");
    else if (instagram.length === 0)
      return toast.error("Instagram can't be empty");

    setSubmitting(true);

    try {
      const newClient = {
        name: name !== client.name ? name : undefined,
        brand: brand !== client.brand ? brand : undefined,
        email: emailId !== client.email ? emailId : undefined,
        phone: phone !== client.phone ? phone : undefined,
        instagram: instagram !== client.instagram ? instagram : undefined,
      };

      const { data, error: any } = await supabase
        .from("clients")
        .update(newClient)
        .eq("id", +client.id)
        .select();

      if (data && data?.length > 0) {
        dispatch(customerActions.updateCustomer(data[0]));
        clearState();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  const handleDelete = async () => {
    try {
      const { data, error: any } = await supabase
        .from("clients")
        .delete()
        .eq("id", +client.id);

      if (!data) {
        dispatch(customerActions.deleteCustomer(+client.id));
        clearState();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (client) {
      setName(client.name);
      setBrand(client.brand);
      setEmailId(client.email);
      setPhone(client?.phone || "");
      setInstagram(client?.instagram || "");
    }
  }, [client]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div className="hover:bg-slate-300 p-2 h-fit rounded-full cursor-pointer">
          <Edit size={18} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Update Client</Dialog.Title>
          <fieldset className="Fieldset mt-5">
            <label className="Label" htmlFor="name">
              Name *
            </label>

            <input
              className="border border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              value={name}
              placeholder="Fullname (John Doe)"
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Brand *
            </label>
            <input
              className="border border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              value={brand}
              placeholder="Brand Name (Mediax)"
              onChange={(e) => setBrand(e.target.value)}
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Email *
            </label>
            <input
              className="border border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              placeholder="Email (john@mail.com)"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />{" "}
          </fieldset>

          <fieldset className="Fieldset border border-black">
            <label className="Label" htmlFor="username">
              Phone *
            </label>
            <input
              className="border border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              placeholder="Phone No. (1234567890)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Insta *
            </label>
            <input
              className="border border-black bg-gray-100  w-full text-sm py-2 px-3 rounded-md"
              id="username"
              placeholder="Enter username (johndoe)"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />{" "}
          </fieldset>

          <div
            style={{
              display: "flex",
              marginTop: 15,
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
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
                        <h1>Delete client - {client.name}</h1>

                        <button
                          onClick={() => {
                            onClose();
                          }}
                          style={{
                            padding: "4px 10px",
                            backgroundColor: "#01B4BC",
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
                            handleDelete();
                            onClose();
                          }}
                          style={{
                            padding: "4px 10px",
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "8px",
                            marginTop: 10,
                            cursor: "pointer",
                          }}
                        >
                          Yes, Delete it!
                        </button>
                      </div>
                    );
                  },
                });
              }}
              className="bg-red-600 cursor-pointer text-white px-4 py-0.5 mr-2 rounded-md"
            >
              Delete Company
            </button>

            {submitting ? (
              <button className="bg-[#01B4BC] cursor-pointer text-white px-4 py-0.5 rounded-md">
                Updating...
              </button>
            ) : (
              <button
                onClick={() => handleSubmit()}
                className="bg-[#01B4BC] cursor-pointer text-white px-4 py-0.5 rounded-md"
              >
                Update Company
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

export default EditClientDialog;
