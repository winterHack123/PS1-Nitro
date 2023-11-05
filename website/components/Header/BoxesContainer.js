import React from "react";
import { motion } from "framer-motion";

export const BoxesContainer = ({ title, subtitle }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  let colors = [
    "#7dd3fc",
    "#F9A8D4",
    "#CC9966",
    "#fde047",
    "#FF99FF",
    "#CCFFCC",
    "#99ccff",
    "#B4FCA5",
    "#FFCCCC",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="h-[30vh] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <div
        style={{
          transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
        }}
        className="absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 bg-blue-300 -translate-y-1/2 w-full h-full z-0 "
      >
        {rows.map((_, i) => (
          <motion.div
            key={`row` + i}
            className="w-16 h-8  border-l  border-slate-700 relative"
          >
            {cols.map((_, j) => (
              <motion.div
                whileHover={{
                  backgroundColor: `${getRandomColor()}`,
                  transition: { duration: 0 },
                }}
                animate={{
                  transition: { duration: 2 },
                }}
                key={`col` + j}
                className="w-16 h-8  border-r border-t border-slate-700 relative"
              >
                {j % 2 === 0 && i % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                ) : null}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      <h1 className="md:text-7xl text-xl text-center text-white relative z-20 !p-0 !m-0">
        {title}
      </h1>

      <p className="text-center mt-2 text-neutral-300 relative z-20">
        {subtitle}
      </p>
    </div>
  );
};
