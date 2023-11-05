import clsx from "clsx";
import React from "react";

export const BecomeIBSteps = ({ number = 20, text = "", img, title }) => {
  const meteors = new Array(number || 20).fill(true);

  return (
    <div className=" relative">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />

      <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-start items-start">
        <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-2 w-2 text-gray-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
            />
          </svg>
        </div>

        {img && <img src={img} className="h-14 mx-auto mb-5 -mt-7" />}

        {title && (
          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {title}
          </h1>
        )}

        {text && (
          <p
            className={`font-normal text-[15px] ${
              title ? "text-left" : "text-center"
            } text-slate-500 mb-4 relative z-50`}
          >
            {text}
          </p>
        )}

        {/* Meaty part - Meteor effect */}
        {meteors.map((el, idx) => (
          <span
            key={"meteor" + idx}
            className={clsx(
              "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
            )}
            style={{
              top: 0,
              left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
              animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
              animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
            }}
          />
        ))}
      </div>
    </div>
  );
};
