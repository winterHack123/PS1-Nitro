'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { Profile } from '@/types/collections';
import { createClient } from '@supabase/supabase-js';

const AddUserDialog = ({ setUsers }: any) => {
  const supabase = createClient(
    'https://envmlpgayiwqbudvahva.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVudm1scGdheWl3cWJ1ZHZhaHZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjAzMzcyMiwiZXhwIjoyMDAxNjA5NzIyfQ.QcuHPUUYPqYmmkeNTDFgFlNBiya5MedBN_lde0qXaEU',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  // Access auth admin api
  const adminAuthClient = supabase.auth.admin;
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('HIA');

  const [instagram, setInstagram] = useState('');

  const clearState = () => {
    setName('');
    setEmail('');
    setPhone('');
    setOrganisation('');
  };

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (
      name.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      organisation.length === 0
    )
      return;

    setSubmitting(true);

    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: 'testpassword',
        user_metadata: {
          full_name: name,
          role: 'user',
          phone: phone,
          organisation: organisation,
        },
      });

      if (data && data.user) {
        setUsers((prev: Profile[]) => [...prev, data.user.user_metadata]);
        clearState();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-[#01B4BC] text-white cursor-pointer flex items-center justify-center px-2 h-fit py-1.5 text-sm rounded-md">
          <Plus size={20} className="mr-1" />
          New Student
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add Executive</Dialog.Title>
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

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Email
            </label>
            <input
              className="border border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              placeholder="Email (john@mail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{' '}
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
            }}
          >
            {submitting ? (
              <button className="bg-[#01B4BC] cursor-pointer text-white px-4 py-0.5 rounded-md">
                Adding...
              </button>
            ) : (
              <button
                onClick={() => handleSubmit()}
                className="bg-[#01B4BC] cursor-pointer text-white px-4 py-0.5 rounded-md"
              >
                Add Executive
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

export default AddUserDialog;
