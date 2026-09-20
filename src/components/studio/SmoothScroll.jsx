import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Instancia única: los componentes que necesiten parar/arrancar el scroll
// (el menú overlay, el preloader) la piden con getLenis().
let lenis = null;
export const getLenis = () => lenis;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll suave global sincronizado con el ticker de GSAP.
 * Sin esto, ScrollTrigger y Lenis calculan posiciones en frames distintos
 * y los revelados llegan tarde.
 */
const SmoothScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenis = null;
    };
  }, []);

  // Al cambiar de página: arriba del todo y recalcular triggers
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
};

export default SmoothScroll;
