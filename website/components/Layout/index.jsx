"use client";

import React from "react";
import Header from "../Header";
import { useScroll, useSpring, motion } from "framer-motion";

const Layout = ({ children }) => {
  const { scrollYProgress: scrollYProgressPercent } = useScroll();

  const scaleX = useSpring(scrollYProgressPercent, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className={`font-ubermove text-black`}>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
