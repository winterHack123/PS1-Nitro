import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

// const Example = () => {
//   return (
//     <div className="bg-neutral-800">
//       <div className="flex h-48 items-center justify-center">
//         <span className="font-semibold uppercase text-neutral-500">
//           Scroll down
//         </span>
//       </div>
//       <HorizontalScrollCarousel />
//       <div className="flex h-48 items-center justify-center">
//         <span className="font-semibold uppercase text-neutral-500">
//           Scroll up
//         </span>
//       </div>
//     </div>
//   );
// };

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-60%"]);

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-neutral-900">
      <div className="sticky top-0 flex flex-col h-screen justify-center overflow-hidden">
        <div className="text-white text-center mb-24 font-bold text-7xl">
          COMPANIES VISITED
        </div>

        <div className="flex items-center">
          <motion.div style={{ x }} className="flex gap-4">
            {cards.map((card) => {
              return <Card card={card} key={card.id} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[250px] w-[350px] overflow-hidden rounded-3xl bg-white"
    >
      <div
        // style={{
        //   backgroundImage: `url(${card.url})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <img src={card.url} />
      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;

const cards = [
  {
    url: "/imgs/logo1.png",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/imgs/logo2.png",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/imgs/logo3.png",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/imgs/logo4.png",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/imgs/logo5.png",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/imgs/logo6.png",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/imgs/logo7.png",
    title: "Title 7",
    id: 7,
  },
  {
    url: "/imgs/logo8.png",
    title: "Title 7",
    id: 7,
  },
];
