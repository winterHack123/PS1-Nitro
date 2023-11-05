'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'lucide-react';
import { useSupabase } from '../providers/supabase-provider';
import { useAppDispatch } from '@/store/hooks';
import { toast } from 'react-hot-toast';
import { validateEmail, validatePhoneNumber } from '@/utils/validator';
import { useAuth } from '../providers/supabase-auth-provider';

const AddClientDialog = ({ showTxt = true }: any) => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');

  const clearState = () => {
    setName('');
    setBrand('');
    setEmailId('');
    setPhone('');
    setInstagram('');
  };

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (name.length === 0) return toast.error("Name can't be empty");
    else if (brand.length === 0) return toast.error("Brand can't be empty");
    else if (emailId.length === 0 || !validateEmail(emailId))
      return toast.error('Enter valid email');
    else if (phone.length === 0 || !validatePhoneNumber(phone))
      return toast.error('Enter valid phone number');

    setSubmitting(true);

    try {
      const newClient = {
        name,
        email: emailId,
        phone,
        address: brand,
      };
      const { data, error: any } = await supabase
        .from('comapny')
        .insert(newClient)
        .select();

      clearState();
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-[#01B4BC] text-white cursor-pointer flex items-center justify-center px-4 h-fit py-1.5 text-sm rounded-md">
          <Plus size={20} className={`${showTxt && 'mr-1'}`} />
          {showTxt ? 'New Company' : ''}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add Company</Dialog.Title>
          <fieldset className="Fieldset mt-5">
            <label className="Label" htmlFor="name">
              Name *
            </label>

            <input
              className="border border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              value={name}
              placeholder="Fullname (Google)"
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Address *
            </label>
            <input
              className="border border-black bg-gray-100 w-full text-sm py-2 px-3 rounded-md"
              id="username"
              value={brand}
              placeholder="Company Address (Noida, India)"
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
            />{' '}
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
                Add Company
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

export default AddClientDialog;
