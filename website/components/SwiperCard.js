import React from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";

const SwiperCards = ({ activePage, index, handleClick, detail }) => {
  return (
    <div className="w-full h-[inherit] shadow-lg rounded-xl p-7 md:p-6 flex flex-col">
      <div className="w-full">
        <div className="mt-2 w-full md:w-fit text-[1.5rem] font-semibold text-brand-tertiary">
          {detail.name}
        </div>
        <div className="mt-0.5 w-full md:w-fit text-[1.2rem] text-brand-secondary">
          {detail.date}
        </div>
      </div>

      <div className="flex flex-col mt-3 flex-1 py-auto">
        <BiSolidQuoteLeft className="text-brand-tertiary" />
        <div className="text-[1.6rem] w-full justify-center flex capitalize font-medium text-brand-tertiary">
          {detail.desc}
        </div>
      </div>
    </div>
  );
};

export default SwiperCards;
