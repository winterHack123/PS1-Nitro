"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Banner from "@/components/Banner";
import Loader from "@/components/Loader";
import { Collaboration } from "@/components/sections/collaboration";
import { SamePage } from "@/components/sections/same-page";
import { StreamlinedExperience } from "@/components/sections/streamlined-experience";
import { Features } from "@/components/sections/features";
import { MoreFeatures } from "@/components/sections/more-features";
import Footer from "@/components/Footer";
import HorizontalScrollCarousel from "@/components/sections/carousel";
import StickyScroll from "@/components/StickyScroll";

export default function Home() {
  const targetRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.03, 1], [1, 0, 0]);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div key="loader">
          <Loader setLoading={setLoading} />
        </motion.div>
      ) : (
        <div ref={targetRef}>
          <Banner />

          <div className="relative z-10 w-full overflow-x-clip h-screen">
            <div className="w-full absolute left-0 top-0 flex items-center justify-center">
              <motion.img
                // style={{ opacity }}
                src="/main-screen.jpeg"
                // transition={{
                //   ease: "easeIn",
                //   duration: 1,
                //   delay: 1,
                // }}
                className="w-[80vw] mx-auto"
                transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.6 }}
                layoutId="main-image-1"
              />
            </div>
            <Collaboration loading={loading} />
            {/* <SamePage />
            <StreamlinedExperience />
            <Features /> */}

            <div className="flex flex-col justify-center items-center mx-44 pb-20 border-slate-500 mt-36 border-b">
              <div className="text-6xl font-bold">Why NIT Goa?</div>

              <div className="text-lg mt-5 text-slate-500 text-center">
                21 Timeframes, 6 types of pending orders, Hedging and Netting
                allowed and many more. 21 Timeframes, 6 types of pending orders,
                Hedging and Netting allowed and many more.21 Timeframes, 6 types
                of pending orders, Hedging and Netting allowed and many more.21
                Timeframes, 6 types of pending orders, Hedging and Netting
                allowed and many more.21 Timeframes, 6 types of pending orders,
                Hedging and Netting allowed and many more.21 Timeframes, 6 types
                of pending orders, Hedging and Netting allowed and many more.
              </div>

              <button className="text-lg mt-7 font-bold mx-auto bg-green-400 px-10 py-4 cursor-pointer rounded-lg">
                Learn More
              </button>
            </div>

            <div className="flex flex-col justify-center items-center mx-44 pb-20 border-slate-500 mt-20 border-b">
              <div className="text-6xl font-bold">Hear From Our Heads</div>

              <div className="grid grid-cols-2 mt-14 gap-10">
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full bg-slate-700"></div>
                  <div className="text-xl font-bold mt-3">Lalat indu</div>
                  <div className="text-sm text-slate-600 mb-2">Director</div>
                  <div className="text-center text-slate-700">
                    21 Timeframes, 6 types of pending orders, Hedging and
                    Netting allowed and many more. 21 Timeframes, 6 types of
                    pending orders, Hedging and Netting allowed and many more.21
                    Timeframes, 6 types of pending orders, Hedging and Netting
                    allowed and many more.21 Timeframes, 6 types of pending
                    orders, Hedging and Netting.
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full bg-slate-700"></div>
                  <div className="text-xl font-bold mt-3">Lalat indu</div>
                  <div className="text-sm text-slate-600 mb-2">Director</div>

                  <div className="text-center text-slate-700">
                    21 Timeframes, 6 types of pending orders, Hedging and
                    Netting allowed and many more. 21 Timeframes, 6 types of
                    pending orders, Hedging and Netting allowed and many more.21
                    Timeframes, 6 types of pending orders, Hedging and Netting
                    allowed and many more.21 Timeframes, 6 types of pending
                    orders, Hedging and Netting.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mx-44 pb-20 border-slate-500 mt-20 border-b">
              <div className="text-6xl font-bold">Quick Links</div>

              <div className="grid grid-cols-4 mt-14 gap-10 w-full">
                <div className="flex flex-col items-center bg-slate-100 rounded-xl py-8">
                  <div className="h-24 w-24 rounded-full bg-slate-700"></div>
                  <div className="text-xl font-bold mt-3">
                    Research & Internship
                  </div>
                  <div className="text-sm text-blue-700 cursor-pointer mb-2">
                    See Current Stats
                  </div>
                </div>

                <div className="flex flex-col items-center bg-slate-100 rounded-xl py-8">
                  <div className="h-24 w-24 rounded-full bg-slate-700"></div>
                  <div className="text-xl font-bold mt-3">
                    Research & Internship
                  </div>
                  <div className="text-sm text-blue-700 cursor-pointer mb-2">
                    See Current Stats
                  </div>
                </div>

                <div className="flex flex-col items-center bg-slate-100 rounded-xl py-8">
                  <div className="h-24 w-24 rounded-full bg-slate-700"></div>
                  <div className="text-xl font-bold mt-3">
                    Research & Internship
                  </div>
                  <div className="text-sm text-blue-700 cursor-pointer mb-2">
                    See Current Stats
                  </div>
                </div>

                <div className="flex flex-col items-center bg-slate-100 rounded-xl py-8">
                  <div className="h-24 w-24 rounded-full bg-slate-700"></div>
                  <div className="text-xl font-bold mt-3">
                    Research & Internship
                  </div>
                  <div className="text-sm text-blue-700 cursor-pointer mb-2">
                    See Current Stats
                  </div>
                </div>
              </div>
            </div>

            {/* <MoreFeatures /> */}
            <HorizontalScrollCarousel />
            <StickyScroll />

            <Footer />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
