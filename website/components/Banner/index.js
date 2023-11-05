import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const banner = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const letterAni = {
  initial: { y: 400 },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};

const AnimatedLetters = ({
  title,
  disabled,
  className = "",
  titleClassName = "",
}) => (
  <motion.span
    className={`text-[3rem] mx-2 font-medium relative inline-block whitespace-nowrap tracking-[-0.2px] ${titleClassName}`}
    variants={disabled ? null : banner}
    initial="initial"
    animate="animate"
  >
    {[...title].map((letter, index) => (
      <motion.span
        key={index}
        className={`text-[3rem] font-bold relative inline-block whitespace-nowrap ${className}`}
        variants={disabled ? null : letterAni}
      >
        {letter}
      </motion.span>
    ))}
  </motion.span>
);

const Banner = () => {
  return (
    <div className="z-30 relative mt-24 py-20 flex flex-col justify-center">
      <RowOne />
      <RowTwo />
      <RowThree />
    </div>
  );
};

const RowOne = () => {
  return (
    <motion.div
      className="flex items-center justify-center overflow-hidden"
      variants={banner}
    >
      <AnimatedLetters title={"Training"} />
      <AnimatedLetters titleClassName="text-[#4287f2]" title={"&"} />
      <AnimatedLetters title={"Placement"} />
      <AnimatedLetters titleClassName="text-[#4287f2]" title={"Cell"} />
    </motion.div>
  );
};

const RowTwo = () => {
  return (
    <motion.div
      className="flex items-center justify-center overflow-hidden text-xl mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeIn",
        duration: 1,
        delay: 1,
      }}
    >
      Simplified for Recruitors and Students
    </motion.div>
  );
};

const RowThree = () => {
  return (
    <motion.div
      className="flex items-center gap-7 justify-center overflow-hidden text-xl mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeIn",
        duration: 1,
        delay: 1,
      }}
    >
      <Link
        href={"/login"}
        className="w-[20rem] h-[5rem] group flex items-center justify-center text-center flex-col rounded-full bg-green-400 "
      >
        <div className="">Student Login</div>
        <div className="text-sm">Checkout the calendar</div>
      </Link>

      <Link
        href={"/login"}
        className="w-[20rem] h-[5rem] group flex items-center justify-center text-center flex-col rounded-full bg-blue-400 "
      >
        <div className="">Admin Login</div>
        <div className="text-sm">Manage Companies</div>
      </Link>
    </motion.div>
  );
};

export default Banner;
