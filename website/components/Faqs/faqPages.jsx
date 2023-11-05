import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classnames from "classnames";

export function FAQ1({ context }) {
  const [expandedItem, setExpandedItem] = useState();
  const boxAnimation = {
    initial: {
      y: 0,
    },
    float: {
      y: -20,
    },
  };

  const caretAnimation = {
    initial: {
      rotate: 0,
    },
    expanded: {
      rotate: 180,
    },
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      {context?.map((item) => (
        <motion.div
          key={item.id}
          onClick={() => setExpandedItem(item.id)}
          className="group w-full flex flex-1 flex-col cursor-pointer"
        >
          <div className="flex justify-between items-center py-3">
            <p
              className={classnames(
                "text-[18px] transition-color duration-150 text-desaturated-dark-blue group-hover:text-soft-red font-body",
                { "font-bold": expandedItem === item.id }
              )}
            >
              {item.title}
            </p>

            <motion.img
              alt="Caret"
              src="arrowdown.svg"
              className="h-2.5"
              variants={caretAnimation}
              animate={expandedItem === item.id ? "expanded" : "initial"}
            />
          </div>
          <AnimatePresence>
            {expandedItem === item.id && (
              <motion.p
                className="font-body text-gray-700 text-[15px] mb-3"
                key={item.id}
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: "auto", opacity: 1, marginBottom: 12 }}
                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                transition={{ type: "tween" }}
              >
                {item.description}
              </motion.p>
            )}
          </AnimatePresence>
          <hr className="border-light-blue" />
        </motion.div>
      ))}
    </div>
  );
}

export function FAQ2({ context }) {
  const [expandedItem, setExpandedItem] = useState();
  const boxAnimation = {
    initial: {
      y: 0,
    },
    float: {
      y: -20,
    },
  };

  const caretAnimation = {
    initial: {
      rotate: 0,
    },
    expanded: {
      rotate: 180,
    },
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      {context.map((item) => (
        <motion.div
          key={item.id}
          onClick={() => setExpandedItem(item.id)}
          className="group w-full flex flex-1 flex-col cursor-pointer"
        >
          <div className="flex justify-between items-center py-3">
            <p
              className={classnames(
                "text-[18px] transition-color duration-150 text-desaturated-dark-blue group-hover:text-soft-red font-body",
                { "font-bold": expandedItem === item.id }
              )}
            >
              {item.title}
            </p>

            <motion.img
              alt="Caret"
              src="arrowdown.svg"
              className="h-2.5"
              variants={caretAnimation}
              animate={expandedItem === item.id ? "expanded" : "initial"}
            />
          </div>
          <AnimatePresence>
            {expandedItem === item.id && (
              <motion.p
                className="font-body text-gray-700 text-[15px] mb-3"
                key={item.id}
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: "auto", opacity: 1, marginBottom: 12 }}
                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                transition={{ type: "tween" }}
              >
                {item.description}
              </motion.p>
            )}
          </AnimatePresence>
          <hr className="border-light-blue" />
        </motion.div>
      ))}
    </div>
  );
}

export function FAQ3({ context }) {
  const [expandedItem, setExpandedItem] = useState();
  const boxAnimation = {
    initial: {
      y: 0,
    },
    float: {
      y: -20,
    },
  };

  const caretAnimation = {
    initial: {
      rotate: 0,
    },
    expanded: {
      rotate: 180,
    },
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      {context.map((item) => (
        <motion.div
          key={item.id}
          onClick={() => setExpandedItem(item.id)}
          className="group w-full flex flex-1 flex-col cursor-pointer"
        >
          <div className="flex justify-between items-center py-3">
            <p
              className={classnames(
                "text-[18px] transition-color duration-150 text-desaturated-dark-blue group-hover:text-soft-red font-body",
                { "font-bold": expandedItem === item.id }
              )}
            >
              {item.title}
            </p>

            <motion.img
              alt="Caret"
              src="arrowdown.svg"
              className="h-2.5"
              variants={caretAnimation}
              animate={expandedItem === item.id ? "expanded" : "initial"}
            />
          </div>
          <AnimatePresence>
            {expandedItem === item.id && (
              <motion.p
                className="font-body text-gray-700 text-[15px] mb-3"
                key={item.id}
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: "auto", opacity: 1, marginBottom: 12 }}
                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                transition={{ type: "tween" }}
              >
                {item.description}
              </motion.p>
            )}
          </AnimatePresence>
          <hr className="border-light-blue" />
        </motion.div>
      ))}
    </div>
  );
}

export function FAQ4({ context }) {
  const [expandedItem, setExpandedItem] = useState();
  const boxAnimation = {
    initial: {
      y: 0,
    },
    float: {
      y: -20,
    },
  };

  const caretAnimation = {
    initial: {
      rotate: 0,
    },
    expanded: {
      rotate: 180,
    },
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      {context.map((item) => (
        <motion.div
          key={item.id}
          onClick={() => setExpandedItem(item.id)}
          className="group w-full flex flex-1 flex-col cursor-pointer"
        >
          <div className="flex justify-between items-center py-3">
            <p
              className={classnames(
                "text-[18px] transition-color duration-150 text-desaturated-dark-blue group-hover:text-soft-red font-body",
                { "font-bold": expandedItem === item.id }
              )}
            >
              {item.title}
            </p>

            <motion.img
              alt="Caret"
              src="arrowdown.svg"
              className="h-2.5"
              variants={caretAnimation}
              animate={expandedItem === item.id ? "expanded" : "initial"}
            />
          </div>
          <AnimatePresence>
            {expandedItem === item.id && (
              <motion.p
                className="font-body text-gray-700 text-[15px] mb-3"
                key={item.id}
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: "auto", opacity: 1, marginBottom: 12 }}
                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                transition={{ type: "tween" }}
              >
                {item.description}
              </motion.p>
            )}
          </AnimatePresence>
          <hr className="border-light-blue" />
        </motion.div>
      ))}
    </div>
  );
}
