'use client';
import { MinusCircle, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSupabase } from '../providers/supabase-provider';
import { parentPostTypes, postTypes } from '@/data';
import { toast } from 'react-hot-toast';
import { Customer, Post, Profile } from '@/types/collections';
import { DeliverableBookingWhatsappMessage } from '@/utils/whatsapp';

const CreateForm = ({
  customer,
  setUnscheduledPosts,
  spent,
  setSpent,
  customerDetails,
}: {
  customer: number;
  setUnscheduledPosts: any;
  spent: number;
  setSpent: any;
  customerDetails: Customer;
}) => {
  const { supabase } = useSupabase();

  const [executives, setExecutives] = useState<Profile[]>([]);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [count, setCount] = useState(new Array(postTypes.length).fill(0));
  const [incentive, setIncentive] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [saleBy, setSaleBy] = useState<string>('');

  const [attachments, setAttachments] = useState<string>('');
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [paymentMode, setPaymentMode] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('*');

        if (data && data.length > 0) {
          setExecutives([...data]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!total) {
      return toast.error("Total can't be empty");
    } else if (!saleBy) {
      return toast.error('Choose executive to continue');
    } else if (paymentDone && paymentMode === '') {
      return toast.error('Select Payment Mode');
    }

    setSubmitting(true);

    let newOrder = {
      total,
      saleby: saleBy,
      client_id: customer,
      incentive: incentive,
      attachments,
      payment: paymentDone ? paymentMode : undefined,
    };

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(newOrder)
        .select();

      if (data && data.length > 0) {
        let posts = [];
        let orderSummaryString = '';

        for (let i = 0; i < count.length; i++) {
          if (count[i] > 0) {
            orderSummaryString = `${postTypes[i].title}: ${count[i]}, ${orderSummaryString}`;
            for (let j = 0; j < count[i]; j++) {
              posts.push({
                type: postTypes[i].title,
                order_id: data[0].id,
              });
            }
          }
        }

        const { data: newPosts } = await supabase
          .from('posts')
          .insert([...posts])
          .select();

        if (newPosts && newPosts.length > 0) {
          DeliverableBookingWhatsappMessage({
            name: customerDetails?.name,
            brand: customerDetails?.brand,
            deliverable: orderSummaryString,
            phone: customerDetails?.phone || '',
          });
          setUnscheduledPosts((prev: Post[]) => [...newPosts, ...prev]);
        }

        const { data: client, error } = await supabase
          .from('clients')
          .update({
            spent: spent + total,
          })
          .eq('id', customer);

        setSpent(spent + total);
        setCount(new Array(postTypes.length).fill(0));
        setSaleBy('');
        setTotal(0);
      }
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  return (
    <div className="mt-2">
      <div className="w-full gap-4 grid grid-cols-2">
        {parentPostTypes.map((parentPostType, i) => (
          <div key={i}>
            <div className="font-semibold flex items-center mb-2">
              <div className="h-3 w-3 mr-1 bg-yellow-500 rounded-full" />
              {parentPostType.title}
            </div>

            {parentPostType.postTypes.map((type, index) => (
              <div
                key={index}
                className="flex px-4 py-1.5 text-sm justify-between last:border-b-0 border-b"
              >
                <div>{postTypes[type].title}</div>
                <div className="flex items-center ml-9">
                  <MinusCircle
                    size={18}
                    className={`mr-1 ${
                      count[postTypes[type].id] > 0
                        ? 'text-red-600'
                        : 'text-gray-400'
                    } cursor-pointer`}
                    onClick={() => {
                      if (count[postTypes[type].id] > 0) {
                        count[postTypes[type].id]--;
                        setCount([...count]);
                      }
                    }}
                  />
                  <div className="w-4 text-center">
                    {count[postTypes[type].id]}
                  </div>
                  <PlusCircle
                    size={18}
                    className={`ml-1 ${'text-green-600'} cursor-pointer`}
                    onClick={() => {
                      count[postTypes[type].id]++;
                      setCount([...count]);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-2.5">
        <div>Total Cost</div>

        <div className="flex justify-between gap-5">
          <input
            className="bg-slate-100 h-10 px-4 rounded-md outline-none mt-2"
            style={{ width: '-webkit-fill-available' }}
            placeholder="Total Amount"
            value={total}
            onChange={(e) => setTotal(+e.target.value)}
          />

          <select
            className="bg-slate-100 h-10 px-4 rounded-md outline-none cursor-pointer mt-2"
            style={{ width: '-webkit-fill-available' }}
            onChange={(e) => setSaleBy(e.target.value)}
            value={saleBy}
          >
            <option value="">Choose Executive</option>
            {executives.map((executive, index) => (
              <option key={index} value={executive.id}>
                {executive.full_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex gap-12 items-center">
          <div className="flex-1">
            <input
              className="bg-slate-100 text-sm h-10 w-full px-4 rounded-md outline-none mt-2"
              value={attachments}
              onChange={(e) => setAttachments(e.target.value)}
              placeholder="Asset Drive Link (Comma seperated links)"
            />
          </div>

          <div className="flex items-center">
            <input
              className="checkbox ml-1 mr-2 cursor-pointer"
              type="checkbox"
              onChange={(e) => setIncentive(e.target.checked)}
              value={incentive.toString()}
              style={{ display: 'inline-block;' }}
            />
            <div>Valid for incentive</div>
          </div>
        </div>

        <div className="mt-3 flex gap-12 items-center">
          <div className="flex w-1/2 items-center justify-between">
            <div>Payment Done?</div>
            <input
              className="checkbox ml-2 mr-1 cursor-pointer"
              type="checkbox"
              onChange={(e) => setPaymentDone(e.target.checked)}
              checked={paymentDone}
              style={{ display: 'inline-block;' }}
            />
          </div>

          <div className="w-1/2 flex items-center h-10">
            {paymentDone && (
              <select
                className="bg-slate-100 text-sm h-10 w-full px-4 rounded-md outline-none mt-2"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                placeholder="Attachments (Comma seperated links)"
              >
                <option value={''}>Select payment mode</option>
                <option value={'Cash'}>Cash</option>
                <option value={'Card'}>Card</option>
                <option value={'UPI'}>UPI</option>
                <option value={'Bank Transfer'}>Bank Transfer</option>
              </select>
            )}
          </div>
        </div>

        {submitting ? (
          <button className="bg-[#01B4BC] text-white w-full mt-7 py-2 rounded-md text-center cursor-pointer">
            Submitting...
          </button>
        ) : (
          <button
            onClick={() => handleSubmit()}
            className="bg-[#01B4BC] text-white w-full mt-7 py-2 rounded-md text-center cursor-pointer"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
