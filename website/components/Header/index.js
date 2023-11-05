"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LinkComponent from "./Link";
import { useStore } from "@/store";
import { en, jp } from "@/context/header";

const languages = [
  {
    code: "EN",
    name: "English",
    image: "/flags/us.png",
  },
  {
    code: "JP",
    name: "Japanese",
    image: "/flags/jp.webp",
  },
];

const Header = () => {
  const [showDropDown, setShowDropDown] = React.useState(0);

  const { language, setLanguage } = useStore();
  let context = true ? en : jp;

  return (
    <motion.div
      initial={{ opacity: 0, y: -180 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 1,
        delay: 3.3,
      }}
      className="md:text-[1.8rem] -mb-24 font-ubermove z-40 xs:h-[156px] flex justify-center md:p-[0_108px] text-[#24242a] p-[0_12px] h-[96px] text-[1.2rem] xs:p-[0_72px] xs:text-[1.6rem]"
    >
      <div className="w-full flex z-50 items-center justify-between">
        <Link
          href={"/"}
          className="font-bold flex-[4] md:flex-auto md:text-[3.6rem] text-[3.2rem]"
        >
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/en/e/e6/NIT_Goa_logo.png"
            }
            className="w-16"
          />
        </Link>

        <nav className="md:flex items-center text-2xl justify-center absolute left-1/2 -translate-x-1/2 hidden">
          {context.navLinks.map((link, index) => (
            <LinkComponent
              key={index}
              index={index + 1}
              name={link.name}
              dropMenu={link.dropMenu}
              link={link.link}
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
            />
          ))}
        </nav>

        <div className="md:flex-1 flex-auto flex justify-end items-center">
          <a
            className="text-[#24242a] text-lg uppercase no-underline flex items-center decoration-black border-[#24242a] whitespace-nowrap xs:border-b-2"
            href="/"
          >
            {context.btn}
          </a>
        </div>

        <div className="h-14 w-14 rounded-full flex justify-center items-center flex-col cursor-pointer md:hidden hover:bg-red-700 transition-[0.2s_cubic-bezier(0.215,0.61,0.355,1)]">
          <span className="w-5 h-[3px] my-[3px] block bg-[#24242a]"></span>
          <span className="w-5 h-[3px] my-[3px] block bg-[#24242a]"></span>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
