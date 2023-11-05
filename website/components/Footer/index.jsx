import { useStore } from "@/store";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { en, jp } from "@/context/footer";

const Footer = () => {
  let context = true ? en : jp;

  return (
    <section className="relative flex flex-col w-screen justify-around z-10 pt-[3rem] bg-white items-center">
      <div className="w-[85%] text-[18px] flex justify-around">
        <div className="flex flex-col">
          <Link
            href={context.section1.btn1.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section1.btn1.title}
          </Link>
          <Link
            href={context.section1.btn1.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section1.btn2.title}
          </Link>
          <Link
            href={context.section1.btn3.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section1.btn3.title}
          </Link>
          <Link
            href={context.section1.btn4.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section1.btn4.title}
          </Link>
        </div>

        <div className="flex flex-col">
          <Link
            href={context.section2.btn1.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section2.btn1.title}
          </Link>

          <Link
            href={context.section2.btn2.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section2.btn2.title}
          </Link>

          <Link
            href={context.section2.btn3.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section2.btn3.title}
          </Link>

          <Link
            href={context.section2.btn4.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section2.btn4.title}
          </Link>
        </div>

        <div className="flex flex-col">
          <Link
            href={context.section3.btn1.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section3.btn1.title}
          </Link>

          <Link
            href={context.section3.btn2.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section3.btn2.title}
          </Link>

          <Link
            href={context.section3.btn3.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section3.btn3.title}
          </Link>

          <Link
            href={context.section3.btn4.link}
            className="mb-2 cursor-pointer hover:text-primary-blue"
          >
            {context.section3.btn4.title}
          </Link>
        </div>

        <img className="h-[12rem] -mt-5" src="/images/footerimage.png" />
      </div>

      <div className="bg-primary-blue text-white w-full mt-10 text-[16px] py-2 px-8 flex justify-between">
        <div>© {context.disclaimer}</div>

        <div className="flex text-[17px] gap-2">
          <Link href={"/"} className="flex gap-2 items-center">
            <FaInstagram />
          </Link>

          <Link href={"/"} className="flex gap-2 items-center">
            <FaTwitter />
          </Link>

          <Link href={"/"} className="flex gap-2 items-center">
            <FaLinkedin />
          </Link>

          <Link href={"/"} className="flex gap-2 items-center">
            <FaFacebook />
          </Link>

          <Link href={"/"} className="flex gap-2 items-center">
            <FaYoutube />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
