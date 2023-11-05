import { stagger, useAnimate } from "framer-motion";
import {
  Availability,
  Colors,
  FeatureCard,
  Music,
  SchedulingLinks,
  Team,
  Todo,
} from "./card";
import { FeatureTitle } from "./title";
import { MusicVisual, OtherVisual } from "./visual";
import { useFeatureStore } from "./store";
import { useEffect } from "react";

const features = [
  {
    title: "Use your calendar as a todo list",
    id: "todo-list",
    gradient: "from-[#f7f0ff] to-[#a78afe]",
    // card: Todo,
    visual: OtherVisual,
    name: "Fahad Ahmed",
    desc: `SmartFXはベストなシグナル、分析、入金方法を持つ素晴らしい会社です！1年前からSmartfx で取引していますが、これまでで最高の会社です！`,
    date: "2022年11月28日",

    // desc: `SmartFX is great company with best signals, analysis & deposit/withdrawals ways! I've been trading with smartFX from 1 year now, been a best company so far!`,
    // date: 'November 28, 2022',
  },
  {
    title: "Color your calendar to organize",
    id: "colors",
    gradient: "from-[#f5fbff] to-[#addeff]",
    // card: Colors,
    visual: OtherVisual,
    name: "Irfan Aisha",
    desc: "SmartFXは私の取引スキルを初心者の段階からより専門的に向上させるのに役立っています。彼らのアドバイスと分析サポートは毎日正確に取引するのに役立っています。さらに、入出金手続きも非常によく、手間がかかりません。",
    date: "2023年9月30日",

    // desc: 'Smartfx helps me to improve my trading skills from a beginner stage to more professional mode. Their advices and analytical supports helps us to choose the trades more accurately each and every day. Moreover the depositing and withdrawal procedures and very good and hassle free.',
    // date: 'September 30, 2023',
  },
  {
    title: "Instantly know if someone is available",
    id: "availability",
    gradient: "from-[#f5fff7] to-[#adf8ff]",
    // card: Availability,
    visual: OtherVisual,
    name: "Deepesh",
    desc: "優れたチーム、初めての人に優しいサポートです。",
    date: "2023年10月2日",

    // desc: 'Excellent team, great support for new joiners.',
    // date: 'October 02, 2023',
  },
  {
    title: "Track what you listened to when",
    id: "music",
    gradient: "from-[#f7fff5] to-[#adffd8]",
    // card: Music,
    visual: MusicVisual,
    name: "MUHAMMAD IBRAHIM MULLA",
    desc: "トップクオリティの素晴らしいサービスです。シグナルも他のブローカーと比較してかなり正確です。",
    date: "2023年10月2日",

    // desc: 'Amazing service. Service is of a top quality. Signals are pretty accurate as well compared to other brokers . Kudos',
    // date: 'October 02, 2023',
  },
  {
    title: "Send scheduling links guests love",
    id: "scheduling-links",
    gradient: "from-[#fff7f5] to-[#ffd8ad]",
    // card: SchedulingLinks,
    visual: OtherVisual,
    name: "Lubna",
    desc: "素晴らしいカスタマーサービスです。Smartfxで取引を始めることを皆さんにお勧めします。",
    date: "2023年9月1日",

    // desc: 'Amazing customer service, would recommend everyone to start trading with smartfx.',
    // date: 'September 01, 2023',
  },
  {
    title: "Always know what your team is up to",
    id: "team",
    gradient: "from-[#fef5ff] to-[#ffade1]",
    // card: Team,
    visual: OtherVisual,
    name: "Blesy Babu",
    desc: "カスタマーサービスは特別でした。",
    date: "2023年10月1日",

    // desc: 'The customer service was exceptional',
    // date: 'October 01, 2023',
  },
  {
    title: "Use your calendar as a todo list",
    id: "todo-list2",
    gradient: "from-[#f7f0ff] to-[#a78afe]",
    // card: Todo,
    visual: OtherVisual,
    name: "Manoj kumar",
    desc: "Smartfxでの経験は素晴らしいものでした。Smartfxで取引を開始することをお勧めします。",
    date: "2023年9月4日",

    // desc: 'My experience with Smartfx has been great, excellent customer service, would recommend to start trading with smartfx.',
    // date: 'September 04, 2023',
  },
];

function StickyScroll() {
  const [scope, animate] = useAnimate();
  const fullscreenFeature = useFeatureStore((state) => state.fullscreenFeature);
  const lastFullscreenFeature = useFeatureStore(
    (state) => state.lastFullscreenFeature
  );

  useEffect(() => {
    animate([
      [
        ".feature-title",
        { opacity: 1, x: "0px" },
        { duration: 0.3, delay: stagger(0.05) },
      ],
      [
        `.visual-${lastFullscreenFeature}`,
        { opacity: 0, scale: 0.75, pointerEvents: "none" },
        { at: "<" },
      ],
      [".active-card .gradient", { opacity: 1, scale: 1 }, { at: "<" }],
      [
        ".back-to-site-btn",
        { opacity: 0, y: "300px" },
        { at: "<", duration: 0.3 },
      ],
      [".active-card .show-me-btn", { opacity: 1 }],
    ]);
  }, [animate, fullscreenFeature, lastFullscreenFeature]);

  return (
    <div className="mx-auto w-[100vw] px-36 bg-slate-200">
      <div ref={scope}>
        {features.map((feature) => (
          <feature.visual id={feature.id} key={feature.id} />
        ))}

        <div className="flex items-start gap-20">
          <div className="w-full flex-col flex-1 sticky top-0 h-screen flex justify-center">
            <div className="text-6xl mb-3 ml-3">🙏</div>
            <div className=" text-7xl font-bold">
              WHAT COMPANIES SAY ABOUT US.
            </div>
          </div>

          <div className="w-[0px] overflow-x-hidden py-[40vh]">
            <ul>
              {features.map((feature) => (
                <li key={feature.id}>
                  <FeatureTitle id={feature.id}>{feature.title}</FeatureTitle>
                </li>
              ))}
            </ul>
          </div>

          <div className="sticky top-0 flex flex-1 h-screen w-full items-center">
            <div className="relative h-[60vh] w-full rounded-2xl bg-gray-100 [&:has(>_.active-card)]:bg-transparent">
              {features.map((feature) => (
                <FeatureCard
                  id={feature.id}
                  gradient={feature.gradient}
                  key={feature.id}
                  name={feature.name}
                  desc={feature.desc}
                  date={feature.date}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyScroll;
