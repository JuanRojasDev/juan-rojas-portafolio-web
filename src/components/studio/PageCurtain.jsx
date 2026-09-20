import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getWork } from "../../data/work";

/* ─── Cortina de cambio de página ───
   Al navegar, una pantalla oscura sube cubriendo, muestra el nombre de la
   sección y sale por arriba dejando ver la página nueva. */
const Screen = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9200;
  background: var(--ink-dark);
  display: grid;
  place-items: center;
  pointer-events: none;
`;

const Name = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.5vw, 16px);
  color: var(--paper-on-ink);
  font-size: clamp(1.9rem, 3.1vw, 3.75rem);
  font-weight: 450;
  letter-spacing: normal;
  line-height: 1.2;

  &::before {
    content: "";
    width: clamp(9px, 1vw, 11px);
    height: clamp(9px, 1vw, 11px);
    border-radius: 50%;
    background: var(--color-white);
    flex-shrink: 0;
  }
`;

/** Nombre legible de la ruta actual: las secciones por su rótulo del menú y
 *  las fichas de proyecto por el nombre del proyecto. */
const useSectionName = (pathname) => {
  const { language, translate } = useLanguage();

  if (pathname === "/") return translate("studio.nav_home");
  if (pathname === "/work") return translate("studio.nav_work");
  if (pathname === "/about") return translate("studio.nav_about");
  if (pathname === "/contact") return translate("studio.nav_contact");

  if (pathname.startsWith("/work/")) {
    const project = getWork(pathname.replace("/work/", ""));
    if (project) return project.title;
    return translate("studio.nav_work");
  }

  return language === "es" ? "Inicio" : "Home";
};

const PageCurtain = () => {
  const { pathname } = useLocation();
  const name = useSectionName(pathname);

  return (
    <AnimatePresence mode="wait">
      <Screen
        key={pathname}
        initial={{ y: "100%" }}
        animate={{ y: ["100%", "0%", "0%", "-100%"] }}
        transition={{
          duration: 1.5,
          times: [0, 0.32, 0.56, 1],
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <Name
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, times: [0, 0.34, 0.54, 0.7] }}
        >
          {name}
        </Name>
      </Screen>
    </AnimatePresence>
  );
};

export { useParams };
export default PageCurtain;
