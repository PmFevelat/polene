"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
  restart?: boolean;
  restartDelay?: number;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, restart = false, restartDelay = 2000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        // Animation normale - ajouter le prochain élément
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
        }, delay);

        return () => clearTimeout(timeout);
      } else if (restart && index === childrenArray.length - 1) {
        // Animation terminée et restart activé - d'abord reset à -1 puis à 0
        const timeout = setTimeout(() => {
          setIndex(-1); // Reset à -1 pour tout cacher
          setTimeout(() => {
            setIndex(0); // Puis recommencer à 0
          }, 300); // Court délai pour l'effet de reset
        }, restartDelay);

        return () => clearTimeout(timeout);
      }
    }, [index, delay, restart, restartDelay, childrenArray.length]);

    const itemsToShow = useMemo(() => {
      if (index < 0) return []; // Aucun élément visible si index < 0
      const result = childrenArray.slice(0, index + 1).reverse();
      return result;
    }, [index, childrenArray]);

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";
