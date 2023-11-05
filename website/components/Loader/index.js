import React from "react";
import { motion } from "framer-motion";

import Image from "../Image";

const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      // ease: [0.6, 0.01, -0.05, 0.95],
      ease: "easeInOut",
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      // ease: [0.6, 0.01, -0.05, 0.95],
      ease: "easeInOut",
      duration: 1.6,
    },
  },
};

const Loader = ({ setLoading }) => {
  return (
    <motion.div
      style={{
        zIndex: 9999,
      }}
    >
      <motion.div
        variants={container}
        onAnimationComplete={() => setLoading(false)}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <ImageBlock
          variants={item}
          className="w-[400px] xs:left-[16%] xs:bottom-[14%] left-[4%] bottom-[28%]"
          id="image-1"
        />

        <motion.div
          variants={itemMain}
          className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center"
        >
          <motion.img
            transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.6 }}
            className="w-[800px] flex"
            layoutId="main-image-1"
            src="/main-screen.jpeg"
            // src={`/images/image-2.jpg`}
          />
        </motion.div>

        <ImageBlock
          variants={item}
          className="w-[300px] xs:right-[12%] xs:top-[8%] right-[4%] top-[16%]"
          id="image-3"
        />

        <ImageBlock
          variants={item}
          className="max-w-[400px] w-[40%] xs:right-[20%] xs:bottom-[10%] right-[6%] bottom-[32%]"
          id="image-4"
        />

        <ImageBlock
          variants={item}
          className="w-[280px] xs:left-[14%] xs:top-[12%] left-[6%] top-[18%]"
          id="image-5"
        />
      </motion.div>
    </motion.div>
  );
};

export const ImageBlock = ({ posX, posY, variants, id, className }) => {
  return (
    <motion.div
      variants={variants}
      className={`absolute origin-center flex items-center justify-center ${className}`}
      style={{
        top: `${posY}vh`,
        left: `${posX}vw `,
      }}
    >
      <Image
        className="w-full object-fill"
        src={`/images/${id}.webp`}
        fallback={`/images/${id}.jpg`}
        alt={id}
      />
    </motion.div>
  );
};

export default Loader;
