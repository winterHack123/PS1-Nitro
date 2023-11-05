'use client';
import { useAuth } from '@/components/providers/supabase-auth-provider';
import { useSupabase } from '@/components/providers/supabase-provider';
import { Profile } from '@/types/collections';
import { Edit, Mail, Phone, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AddUserDialog from './AddModal';
import EditUserDialog from './EditModal';

const Clients = () => {
  const router = useRouter();
  const { supabase } = useSupabase();

  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('students').select('*');

        if (data && data.length > 0) {
          console.log({ data });
          setUsers([...data]);
          setFilteredUsers([...data]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (search) {
      let newArr = users.filter((user) => {
        return (
          user.full_name &&
          user.full_name.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredUsers(newArr);
    }
  }, [search, users]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex w-[40%] bg-white rounded-md overflow-hidden border items-center">
          <input
            placeholder="Search for students"
            className="py-2 px-4 w-full outline-none text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={20} className="mr-2.5" />
        </div>

        <AddUserDialog setUsers={setUsers} />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-96">
          <img height={280} width={280} src={'/empty.webp'} />
          <div className="-mt-5 text-gray-600">
            No students to show. Add now to see them here.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className="shadow-[0px_3px_30px_1px_rgba(0,0,0,0.10)] rounded-md bg-white p-4"
            >
              <div className="text-sm flex justify-between font-semibold text-slate-700">
                <div className="flex">
                  {user.name}
                  <span className="ml-1 font-normal text-slate-500"></span>
                </div>

                <EditUserDialog setUsers={setUsers} user={user} />
              </div>

              <div className="flex justify-between items-end">
                <div className="flex gap-2 text-slate-500">
                  {user.phone && (
                    <a href={`tel:+91${user?.phone}`} target="_blank">
                      <Phone className="cursor-pointer" size={16} />
                    </a>
                  )}

                  <a href={`mail:${user?.email}`} target="_blank">
                    <Mail className="cursor-pointer" size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
