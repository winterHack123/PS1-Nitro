import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Filter } from 'lucide-react';

const OrdersFilter = ({
  selected,
  setSelected,
  selectedExecutive,
  setSelectedExecutive,
  executives,
  selectedSort,
  setSelectedSort,
}: {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  selectedExecutive: string;
  setSelectedExecutive: React.Dispatch<React.SetStateAction<string>>;
  executives: any[];
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center justify-center py-2 px-2 bg-white rounded-md border">
          <Filter size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Sort By</DropdownMenuLabel> */}

        <select
          value={selectedExecutive}
          onChange={(e) => setSelectedExecutive(e.target.value)}
          className="w-full my-1 outline-none px-3 cursor-pointer"
        >
          <option value="">All</option>
          {executives.map((executive, i) => (
            <option key={i} value={executive}>
              {executive}
            </option>
          ))}
        </select>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelected(0)}
        >
          <input
            type="radio"
            id="all"
            name="fav_language"
            value="0"
            checked={selected === 0}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="all">All</label>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelected(1)}
        >
          <input
            type="radio"
            id="unscheduled"
            name="fav_language"
            value="1"
            checked={selected === 1}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="unscheduled">Unscheduled</label>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelected(2)}
        >
          <input
            type="radio"
            id="unposted"
            name="fav_language"
            value="2"
            checked={selected === 2}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="unposted">Scheduled</label>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelected(3)}
        >
          <input
            type="radio"
            id="posted"
            name="fav_language"
            value="3"
            checked={selected === 3}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="posted">Posted</label>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelectedSort('asc')}
        >
          <input
            type="radio"
            id="asc"
            name="ascdsc"
            value="asc"
            checked={selectedSort === 'asc'}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="posted">Scheduled - Ascending</label>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelectedSort('dsc')}
        >
          <input
            type="radio"
            id="dsc"
            name="ascdsc"
            value="dsc"
            checked={selectedSort === 'dsc'}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="posted">Scheduled - Descending</label>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelectedSort('bookdsc')}
        >
          <input
            type="radio"
            id="bookdsc"
            name="ascdsc"
            value="bookdsc"
            checked={selectedSort === 'bookdsc'}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="posted">Created At - Old First</label>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelectedSort('bookasc')}
        >
          <input
            type="radio"
            id="bookasc"
            name="ascdsc"
            value="bookasc"
            checked={selectedSort === 'bookasc'}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="posted">Created At - Latest First</label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrdersFilter;
