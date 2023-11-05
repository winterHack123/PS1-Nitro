'use client';

import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Edit, Plus, X } from 'lucide-react';
import { Profile } from '@/types/collections';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { useSupabase } from '@/components/providers/supabase-provider';

const EditUserDialog = ({ setUsers, user }: any) => {
  const { supabase } = useSupabase();

  // Access auth admin api
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('HIA');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setPhone(user.phone);
    setOrganisation(user.organisation);
  }, [user]);

  const handleSubmit = async () => {
    if (name.length === 0 || phone.length === 0 || organisation.length === 0)
      return toast.error('Fill in all fields');

    if (phone.length !== 10) return toast.error('Enter a valid number');

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('students')
        .update({
          name: name,
          phone: phone,
          organisation: organisation,
        })
        .eq('id', user.id);

      setUsers((prev: any[]) => {
        let newArr = [...prev];

        newArr.filter((usr) => {
          if (usr.id === user.id) {
            usr['name'] = name;
            usr['phone'] = phone;
            usr['organisation'] = organisation;

            return usr;
          }
          return usr;
        });

        return newArr;
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const { data, error } = await supabase
        .from('students')
        .delete()
        .eq('id', user.id);
      setUsers((prev: any[]) => [...prev.filter((usr) => usr.id !== user.id)]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div className="bg-slate-300 p-2 h-fit rounded-full cursor-pointer">
          <Edit size={18} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit Student</Dialog.Title>
          <fieldset className="Fieldset mt-5">
            <label className="Label" htmlFor="name">
              Name
            </label>

            <input
              className="border border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              value={name}
              placeholder="Fullname (John Doe)"
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>

          <fieldset className="Fieldset cursor-not-allowed">
            <label className="Label cursor-not-allowed" htmlFor="username">
              Email
            </label>
            <input
              className="border cursor-not-allowed text-gray-500 border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              placeholder="Email (john@mail.com)"
              value={email}
              disabled
            />
          </fieldset>

          <fieldset className="Fieldset border border-black">
            <label className="Label" htmlFor="username">
              Phone
            </label>
            <input
              className="border border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              placeholder="Phone No. (1234567890)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </fieldset>

          <div
            style={{
              display: 'flex',
              marginTop: 15,
              justifyContent: 'flex-end',
              gap: '12px',
            }}
          >
            {deleting ? (
              <button className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-md">
                Deleting...
              </button>
            ) : (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this executive? This action cannot be undone.'
                    )
                  ) {
                    handleDelete();
                  }
                }}
                className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-md"
              >
                Delete Student
              </button>
            )}

            {submitting ? (
              <button className="bg-[#01B4BC] cursor-pointer text-white px-4 py-0.5 rounded-md">
                Updating...
              </button>
            ) : (
              <button
                onClick={() => handleSubmit()}
                className="bg-[#01B4BC] cursor-pointer text-white px-4 py-0.5 rounded-md"
              >
                Update Student
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

export default EditUserDialog;
