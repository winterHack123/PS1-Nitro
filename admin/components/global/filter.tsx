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
import { Filter as FilterIcon } from 'lucide-react';

const Filter = ({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center justify-center py-2 px-2 bg-white rounded-md border">
          <FilterIcon size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelected(0)}
        >
          <input
            type="radio"
            id="none"
            name="fav_language"
            value="0"
            checked={selected === 0}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="none">Last Added</label>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelected(1)}
        >
          <input
            type="radio"
            id="nameasc"
            name="fav_language"
            value="1"
            checked={selected === 1}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="nameasc">Name - Ascending</label>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelected(2)}
        >
          <input
            type="radio"
            id="namedsc"
            name="fav_language"
            value="2"
            checked={selected === 2}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="namedsc">Name - Descending</label>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelected(3)}
        >
          <input
            type="radio"
            id="spendingasc"
            name="fav_language"
            value="3"
            checked={selected === 3}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="spendingasc">Spending - High</label>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSelected(4)}
        >
          <input
            type="radio"
            id="spendingasc"
            name="fav_language"
            value="3"
            checked={selected === 4}
            className="border border-black w-3 h-3 bg-white checked:bg-black outline outline-black outline-offset-1 rounded-full mr-3"
          />
          <label htmlFor="spendingasc">Spending - Low</label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
