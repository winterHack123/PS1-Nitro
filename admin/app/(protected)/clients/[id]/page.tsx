'use client';
import CreateForm from '@/components/order/create-form';
import { useAuth } from '@/components/providers/supabase-auth-provider';
import { useSupabase } from '@/components/providers/supabase-provider';
import { Post } from '@/types/collections';
import { Customer } from '@/types/collections';
import { Instagram, Mail, Phone, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ClientDetail = () => {
  const { supabase } = useSupabase();
  const pathname = usePathname();

  const [roles, setRoles] = useState<any>([]);
  const [user, setUser] = useState<Customer>();
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [unscheduledPosts, setUnscheduledPosts] = useState<Post[]>([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('comapny')
          .select('*')
          .eq('id', +pathname.split('/')[2]);

        if (data && data.length > 0) {
          setUser(data[0]);
        }

        const { data: roles, error: error1 } = await supabase
          .from('roles')
          .select('*')
          .eq('companyId', +pathname.split('/')[2]);

        if (roles && roles.length > 0) {
          setRoles(roles);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col w-[65%] gap-3">
        <div className="bg-white overflow-hidden flex flex-col shadow-md  px-8 py-4 rounded-lg">
          <div className="font-semibold">{user?.name}</div>

          <div className="flex justify-between items-end">
            <div className="flex gap-2 text-slate-500">
              <a href={`tel:+91${user?.phone}`} target="_blank">
                <Phone className="cursor-pointer" size={16} />
              </a>

              <a href={`mail:${user?.email}`} target="_blank">
                <Mail className="cursor-pointer" size={16} />
              </a>
            </div>
          </div>
        </div>
        {roles.map((client: any, index: any) => (
          <div
            key={index}
            className="shadow-[0px_3px_30px_1px_rgba(0,0,0,0.10)] rounded-md bg-white p-4"
          >
            <div className="text-sm flex justify-between font-semibold text-slate-700">
              <div
                onClick={() => router.push(`/clients/${client.id}`)}
                className="flex flex-col cursor-pointer"
              >
                <div>{client.name}</div>
                <div className="text-[11px] text-slate-500">{client.brand}</div>
              </div>

              <div className="flex">
                <div
                  onClick={() => router.push(`/clients/${client.id}`)}
                  className="hover:bg-slate-300 p-2 h-fit rounded-full cursor-pointer"
                >
                  <Plus size={18} />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-2 text-slate-500">
                <a href={`tel:+91${client?.phone}`} target="_blank">
                  <Phone className="cursor-pointer" size={16} />
                </a>

                <a href={`mail:${client?.email}`} target="_blank">
                  <Mail className="cursor-pointer" size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDetail;
