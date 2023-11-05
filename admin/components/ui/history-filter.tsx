import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Filter } from 'lucide-react';

const OrderHistoryFilter = ({
  selectedExecutive,
  setSelectedExecutive,
  executives,
  selectedSort,
  setSelectedSort,
  incentive,
  setIncentive,
}: {
  selectedExecutive: string;
  setSelectedExecutive: React.Dispatch<React.SetStateAction<string>>;
  executives: any[];
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  incentive: boolean;
  setIncentive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center justify-center py-2 px-2 bg-white rounded-md border">
          <Filter size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <select
          value={selectedExecutive}
          onChange={(e) => setSelectedExecutive(e.target.value)}
          className="w-full my-1 outline-none px-3 cursor-pointer"
        >
          <option value="">Select Executive</option>
          {executives.map((executive, i) => (
            <option key={i} value={executive}>
              {executive}
            </option>
          ))}
        </select>

        <DropdownMenuSeparator />

        <div className="flex px-2">
          <input
            type="checkbox"
            checked={incentive}
            onChange={() => setIncentive((prev) => !prev)}
            className="cursor-pointer"
          />
          <div className="ml-2">Incentive</div>
        </div>

        <DropdownMenuSeparator />

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
          <label htmlFor="posted">Created At - Latest first</label>
        </DropdownMenuItem>

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
          <label htmlFor="posted">Created At - Old first</label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderHistoryFilter;
