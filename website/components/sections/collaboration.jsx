import { useTransform, useScroll, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const Collaboration = ({ loading }) => {
  const targetRef = useRef(null);
  const extendedRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });
  const { scrollYProgress: scrollYProgressIncludingOverlap } = useScroll({
    target: extendedRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(
    scrollYProgressIncludingOverlap,
    [0.1, 0.4, 0.75, 1],
    [1, 2.5, 4.2, 1]
  );
  const x = useTransform(
    scrollYProgressIncludingOverlap,
    [0.1, 0.25, 0.75, 1],
    ["0vw", "-55vw", "-135vw", "-18vw"]
  );
  const y = useTransform(
    scrollYProgressIncludingOverlap,
    [0.75, 1],
    ["0vh", "40vh"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.14, 0.15, 0.9, 1],
    [0, 1, 1, 0]
  );

  const avatarGroupOpacity = useTransform(
    scrollYProgress,
    [0, 0.23, 0.25],
    [0, 0, 1]
  );

  const avatarGroupX = useTransform(
    scrollYProgress,
    [0, 0.23, 0.25, 0.4, 0.45, 0.6, 0.65],
    ["60px", "60px", "40px", "40px", "20px", "20px", "0px"]
  );

  const avatarOneScale = useTransform(
    scrollYProgress,
    [0, 0.23, 0.25, 0.85, 0.9],
    [0, 0, 1, 1, 0]
  );

  const avatarTwoScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.45],
    [0, 0, 1]
  );

  const avatarTwoOpacity = useTransform(
    scrollYProgressIncludingOverlap,
    [0.9999, 1],
    [1, 0]
  );

  const avatarThreeScale = useTransform(
    scrollYProgress,
    [0, 0.6, 0.65, 0.85, 0.9],
    [0, 0, 1, 1, 0]
  );

  return (
    <section ref={targetRef} className="relative z-10 h-[70vh]">
      {/* <div ref={extendedRef} className="mb-[-120vh] h-[420vh] w-full"></div> */}
    </section>
  );
};
