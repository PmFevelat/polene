"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Section2 from "./section2";
import Section3 from "./section3";
import { ZoomContext } from "./header";

// Cette nouvelle version divise la progression en trois segments clairs :
// 0-0.33   : Section2 pleine page, scroll normal
// 0.33-0.66: phase de zoom progressive Section2 → Section3
// 0.66-1   : Section3 pleine page, scroll normal

export default function ZoomTransition() {
  const { setIsZooming } = useContext(ZoomContext);
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false);

  // Container de 300vh pour répartir la progression de scroll
  const containerRef = useRef<HTMLDivElement>(null);

  // Suivi du scroll relatif au container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Progression lissée pour les animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  // Zoom entre 0.33 et 0.66
  const zoomScale = useTransform(smoothProgress, [0.33, 0.66], [1, 2.2]);

  // Opacités
  const section2Opacity = useTransform(smoothProgress, [0, 0.33, 0.55], [1, 1, 0]);
  const section3Opacity = useTransform(smoothProgress, [0.45, 0.66, 1], [0, 1, 1]);

  // Overlay noir actif pendant tout le zoom jusqu’à 0.95
  const overlayOpacity = useTransform(smoothProgress, [0.3, 0.33, 0.95, 0.98], [0, 1, 1, 0]);

  // Contrôle de la navbar : uniquement masquée en plein zoom
  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      // Masquer la navbar pendant toute la phase de zoom (jusqu’à presque la fin)
      setIsZooming(v > 0.28 && v < 0.98);

      // Navigation vers /next quand la progression atteint 0.99 (fin du scroll)
      if (v >= 0.98 && !hasNavigated) {
        setHasNavigated(true);
        router.push("/next");
      }
    });
    return () => unsub();
  }, [smoothProgress, setIsZooming, hasNavigated, router]);

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      {/* Section2 collée (pinned) */}
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          opacity: section2Opacity,
        }}
      >
        <Section2 />
      </motion.div>

      {/* Overlay pour la partie zoom */}
      <motion.div
        className="fixed inset-0 w-full h-screen pointer-events-none z-50 bg-black"
        style={{ opacity: overlayOpacity }}
      >
        {/* Section2 zoomée */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: zoomScale, transformOrigin: "center center" }}
        >
          <Section2 />
        </motion.div>

        {/* Section3 révélée */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ opacity: section3Opacity }}
        >
          <Section3 />
        </motion.div>
      </motion.div>
    </div>
  );
} 