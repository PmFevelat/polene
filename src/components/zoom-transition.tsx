"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import Section2 from "./section2";
import Section3 from "./section3";
import { ZoomContext } from "./header";

// Section2 → Zoom progressif → Section3 (fond noir complet, centré)
// 0-0.5   : Section2 pleine page avec navbar
// 0.5-0.8 : Zoom de Section2, navbar disparaît
// 0.8-1   : Section3 visible, SANS navbar, fond noir complet

export default function ZoomTransition() {
  const { setIsZooming } = useContext(ZoomContext);

  // Container pour la progression de scroll
  const containerRef = useRef<HTMLDivElement>(null);

  // Suivi du scroll relatif au container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Progression lissée
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  // Zoom entre 0.5 et 0.8
  const zoomScale = useTransform(smoothProgress, [0.5, 0.8], [1, 3.5]);

  // Transitions nettes sans overlap
  const section2Opacity = useTransform(smoothProgress, [0, 0.5, 0.75], [1, 1, 0]);
  const section3Opacity = useTransform(smoothProgress, [0.75, 0.8, 1], [0, 1, 1]);

  // Overlay noir UNIQUEMENT pendant le zoom
  const overlayOpacity = useTransform(smoothProgress, [0.45, 0.5, 0.8, 0.85], [0, 1, 1, 0]);

  // Contrôle de la navbar - MASQUÉE dès le début du zoom et pendant section3
  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      // Navbar masquée pendant le zoom ET dans section3
      setIsZooming(v > 0.45);
    });
    return () => unsub();
  }, [smoothProgress, setIsZooming]);

  return (
    <div style={{ position: "relative", background: "black" }}>
      {/* Container de scroll pour Section2 */}
      <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
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

        {/* Overlay pour le zoom */}
        <motion.div
          className="fixed inset-0 w-full h-screen pointer-events-none z-50 bg-black"
          style={{ opacity: overlayOpacity }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ scale: zoomScale, transformOrigin: "center center" }}
          >
            <Section2 />
          </motion.div>
        </motion.div>
      </div>

      {/* Section3 - Affichage final SANS navbar, fond noir complet */}
      <motion.div
        style={{ 
          opacity: section3Opacity,
          position: "relative",
          zIndex: 10,
          background: "black",
          margin: 0,
          padding: 0,
          minHeight: "100vh",
        }}
      >
        <Section3 />
      </motion.div>
    </div>
  );
} 