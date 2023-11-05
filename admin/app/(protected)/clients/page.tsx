'use client';
import AddClientDialog from '@/components/ui/add-cient-dialog';
import { useAppSelector } from '@/store/hooks';
import {
  Edit,
  Instagram,
  Mail,
  Phone,
  Plus,
  Search,
  SortAsc,
  Table,
} from 'lucide-react';
import { useSupabase } from '@/components/providers/supabase-provider';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Filter from '@/components/global/filter';
import { toIndianCurrency } from '@/utils/currency';
import EditClientDialog from '@/components/ui/edit-cient-dialog';
import { Customer } from '@/types/collections';

const Clients = () => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const customers = useAppSelector((store) => store.customer.customers);

  const [filteredClients, setFilteredClients] = useState<Customer[]>([]);
  const [allClients, setAllClients] = useState<Customer[]>([]);
  const [search, setSearch] = useState<string>('');
  const [tableForm, setTableForm] = useState<boolean>(false);

  const [selectedSorting, setSelectedSorting] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('comapny').select();
      if (error) {
        console.log(error);
      } else {
        setAllClients(data);
        setFilteredClients(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredClients((x) =>
        allClients.filter((x) => x.name.includes(search))
      );
    }
  }, [search]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex w-[50%]">
          <div className="flex w-[60%] bg-white rounded-md overflow-hidden border items-center">
            <input
              placeholder="Search for companies"
              className="py-2 px-4 w-full outline-none text-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search size={20} className="mr-2.5" />
          </div>

          <div className="ml-2 flex items-center gap-3">
            <Filter
              selected={selectedSorting}
              setSelected={setSelectedSorting}
            />

            <div
              onClick={() => setTableForm((prev) => !prev)}
              className="cursor-pointer flex items-center justify-center py-2 px-2 bg-white rounded-md border"
            >
              <Table size={18} />
            </div>
          </div>
        </div>

        <AddClientDialog />
      </div>

      {filteredClients.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-96">
          <img height={280} width={280} src={'/empty.webp'} />
          <div className="-mt-5 text-gray-600">
            No comapnies to show. Add now to see them here.
          </div>
        </div>
      ) : !tableForm ? (
        <div className="grid grid-cols-3 gap-4 w-full">
          {filteredClients.map((client: Customer, index) => (
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
                  <div className="text-[11px] text-slate-500">
                    {client.brand}
                  </div>
                </div>

                <div className="flex">
                  <div
                    onClick={() => router.push(`/clients/${client.id}`)}
                    className="hover:bg-slate-300 p-2 h-fit rounded-full cursor-pointer"
                  >
                    <Plus size={18} />
                  </div>

                  <EditClientDialog client={client} />
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
      ) : (
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="font-medium dark:border-neutral-500">
                    <tr>
                      <th
                        onClick={() => {
                          if (selectedSorting === 1) {
                            setSelectedSorting(2);
                          } else {
                            setSelectedSorting(1);
                          }
                        }}
                        scope="col"
                        className="p-4 group cursor-pointer border flex justify-between items-center"
                      >
                        <div>Name</div>
                        <div className="hidden group-hover:block">
                          <SortAsc size={18} />
                        </div>
                      </th>
                      <th scope="col" className="p-4 border">
                        Brand
                      </th>
                      <th
                        onClick={() => {
                          if (selectedSorting === 3) {
                            setSelectedSorting(4);
                          } else {
                            setSelectedSorting(3);
                          }
                        }}
                        scope="col"
                        className="p-4 group cursor-pointer border flex justify-between items-center"
                      >
                        <div>Spend</div>
                        <div className="hidden group-hover:block">
                          <SortAsc size={18} />
                        </div>
                      </th>
                      <th scope="col" className="p-4 border">
                        Contact
                      </th>
                      <th scope="col" className="p-4 border">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {client.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {client.brand}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {toIndianCurrency(client.spent || 0)}
                        </td>
                        <td className="whitespace-nowrap p-4">
                          <div className="items-center flex gap-3">
                            <a href={`tel:+91${client?.phone}`} target="_blank">
                              <Phone size={17} />
                            </a>

                            <a href={`mail:${client?.email}`} target="_blank">
                              <Mail size={17} />
                            </a>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div
                              onClick={() =>
                                router.push(`/clients/${client.id}`)
                              }
                              className="hover:bg-slate-300 mr-2 p-2 rounded-full cursor-pointer"
                            >
                              <Plus size={18} />
                            </div>

                            <EditClientDialog client={client} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
