import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );

  useEffect(() => {
    const updateMousePosition = (ev) => {
      if (!targetRef.current) return;
      const { clientX, clientY } = ev;
      targetRef.current.style.setProperty("--x", `${clientX}px`);
      targetRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.section
      style={{ opacity }}
      ref={targetRef}
      className="relative mb-[8rem] h-screen py-16 text-white before:pointer-events-none before:fixed before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-40"
    >
      <motion.div
        style={{ position, scale, x: "-50%" }}
        className="fixed left-1/2 z-0 flex flex-col items-center"
      >
        <p className="mb-2 text-xl font-light">
          <span className="font-medium">Smart</span> FX
        </p>
        <p className="mb-8 text-center text-xs font-light text-text">
          Smart Broker For ,
          <br />
          Smart Traders
        </p>

        <h1 className="mb-10 text-center font-heading text-3xl leading-[1]">
          Trading
          <br />
          Reimagined.
        </h1>

        <div className="flex gap-3">
          <button className="w-72 rounded-md bg-primary py-3 font-sans text-lg text-black">
            Start Trading
          </button>
          <button className="w-72 rounded-md bg-primary py-3 font-sans text-lg text-black">
            Practice
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};
