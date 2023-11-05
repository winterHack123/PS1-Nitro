"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const users = [
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
  {
    badge: "Mentor",
    name: "Manu Arora",
    designation: "Founder, nkjbjhb",
    image:
      "https://fastly.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ",
  },
];

export const HeroScrollPreview = () => {
  return (
    <div className="flex flex-col bg-white">
      <HeroScroll />
    </div>
  );
};

export const HeroScroll = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="h-[120vh] flex items-center justify-center relative ">
      <div
        className="py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} />
        <Card rotate={rotate} translate={translate} scale={scale} />
      </div>
    </div>
  );
};

export const Header = ({ translate }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      <h1 className="text-4xl font-semibold">
        Unleash the power of <br />{" "}
        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
          Scroll Animations
        </span>
      </h1>
    </motion.div>
  );
};

export const Card = ({ rotate, scale, translate }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="bg-gray-100 h-full w-full rounded-2xl grid grid-cols-3 md:grid-cols-5 gap-4 overflow-hidden p-4">
        {users.map((user, idx) => (
          <motion.div
            key={`user-${idx}`}
            className="bg-white rounded-md cursor-pointer relative"
            style={{ translateY: translate }}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            }}
          >
            <div className="absolute top-2 right-2 rounded-full text-xs font-bold bg-white px-2 py-1">
              {user.badge}
            </div>
            <img
              src={user.image}
              className="rounded-tr-md rounded-tl-md text-sm "
            />
            <div className="p-4">
              <h1 className="font-semibold text-sm ">{user.name}</h1>
              <h2 className=" text-gray-500 text-xs ">{user.designation}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
