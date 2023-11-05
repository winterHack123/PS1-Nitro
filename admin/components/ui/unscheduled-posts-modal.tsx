'use client';

import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Edit, X } from 'lucide-react';
import { useSupabase } from '../providers/supabase-provider';
import { useAppDispatch } from '@/store/hooks';
import { Post } from '@/types/collections';

const UnscheduledPostsModal = ({ post }: { post: Post }) => {
  const { supabase } = useSupabase();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [collab, setCollab] = useState<string>(post.collaboration || '');
  const [asset, setAsset] = useState<string>(post.asset || '');
  const [caption, setCaption] = useState<string>(post.caption || '');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const postUpdate = {
        asset: asset.length > 0 ? asset : undefined,
        caption: caption.length > 0 ? caption : undefined,
        collaboration: collab.length > 0 ? collab : undefined,
      };

      const { data, error: any } = await supabase
        .from('posts')
        .update(postUpdate)
        .eq('id', post.id)
        .select()
        .order('id', { ascending: true });

      console.log(data);

      // if (data && data?.length > 0) {
      //   dispatch(customerActions.addCustomer(data[0]));
      setOpen(false);
      // }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Edit size={18} className="text-blue-600" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Update Deliverable
          </Dialog.Title>

          <fieldset className="Fieldset mt-5">
            <label className="Label" htmlFor="name">
              Collab
            </label>

            <input
              className="border border-black bg-gray-100 w-full py-1 px-3 rounded-md"
              id="username"
              value={collab}
              onChange={(e) => setCollab(e.target.value)}
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Asset
            </label>

            <input
              className="border border-black bg-gray-100 w-full py-1 px-3 rounded-md"
              id="username"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Caption
            </label>
            <textarea
              className="border outline-none bg-gray-100 w-full py-1 -ml-1 px-3 rounded-md"
              id="username"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />{' '}
          </fieldset>

          <div
            style={{
              display: 'flex',
              marginTop: 15,
              justifyContent: 'flex-end',
            }}
          >
            {loading ? (
              <button className="bg-blue-600 cursor-pointer text-white px-4 py-0.5 rounded-md">
                Updating...
              </button>
            ) : (
              <button
                onClick={() => handleSubmit()}
                className="bg-blue-600 cursor-pointer text-white px-4 py-0.5 rounded-md"
              >
                Update
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

export default UnscheduledPostsModal;
