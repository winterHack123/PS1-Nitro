import { useState } from "react";
import { CSSTabs } from "./css";
import { useTabs } from "./useTabs";
import { FAQ1, FAQ2, FAQ3, FAQ4 } from "./faqPages";

export default function FaqsComponent({ context }) {
  const [hookProps] = useState({
    tabs: [
      {
        label: context[0].title,
        children: <FAQ1 context={context[0].faqs} />,
        id: "General",
      },
      {
        label: context[1].title,
        children: <FAQ2 context={context[1].faqs} />,
        id: "Getting Started",
      },
      {
        label: context[2].title,
        children: <FAQ3 context={context[2].faqs} />,
        id: "Deposit & Withdrawals",
      },
      {
        label: context[3].title,
        children: <FAQ4 context={context[3].faqs} />,
        id: "Trading",
      },
    ],
    initialTabId: "General",
  });

  const css = useTabs(hookProps);

  return (
    <div className="w-full mb-20 flex flex-col items-center justify-center">
      <CSSTabs {...css.tabProps} />
      <div className=" mt-2 w-[70%] flex flex-col items-center">
        {css.selectedTab.children}
      </div>
    </div>
  );
}
