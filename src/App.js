import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import SmoothScroll from "./components/studio/SmoothScroll";
import Cursor from "./components/studio/Cursor";
import Preloader from "./components/studio/Preloader";
import Header from "./components/studio/Header";
import Footer from "./components/studio/Footer";
import CTASection from "./components/studio/CTASection";
import PageCurtain from "./components/studio/PageCurtain";
import CurveTop from "./components/studio/CurveTop";
import { useLanguage } from "./context/LanguageContext";
import FotoImg from "./images/juan-hero.jpg";

import Home from "./pages/Home";
import Work from "./pages/Work";
import CaseStudy from "./pages/CaseStudy";
import About from "./pages/About";
import Contact from "./pages/Contact";

const Frame = styled.div`
  position: relative;
  min-height: 100vh;
`;

/* ─── Footer tipo cortina ───
   El bloque oscuro se queda quieto al fondo de la ventana y el contenido
   blanco se desliza por encima hasta descubrirlo. */
const Content = styled.div`
  position: relative;
  z-index: 1;
  background: var(--paper);
`;

/* La curva va FUERA del contenedor blanco y sin fondo propio: así la elipse
   blanca se recorta contra el footer oscuro y el arco se ve. */
const CurveLayer = styled.div`
  position: relative;
  z-index: 1;
  background: transparent;
`;

/* Hueco transparente por el que asoma el footer fijo */
const Spacer = styled.div`
  height: ${({ $h }) => $h}px;
`;

const StickyFooter = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 0;
`;

/* Transición tipo wipe del referente: sale hacia arriba, entra desde abajo */
const pageMotion = {
  initial: { opacity: 0, y: 48 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    y: -36,
    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
  },
};

const Routed = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageMotion}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const Shell = () => {
  const { translate } = useLanguage();
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // El hueco que deja el contenido debe medir lo que mide el footer
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return undefined;

    const measure = () => setFooterHeight(el.offsetHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <Frame>
      <Header />
      <Content>
        <Routed />
      </Content>

      {/* El arco con el que termina el contenido blanco */}
      <CurveLayer>
        <CurveTop color="var(--paper)" />
      </CurveLayer>

      <Spacer $h={footerHeight} />

      <StickyFooter ref={footerRef}>
        <CTASection
          avatar={FotoImg}
          title={translate("studio.cta_title")}
          email="rojassalinasjuanandres@gmail.com"
          phone={translate("studio.nav_contact")}
          buttonText={translate("studio.get_in_touch")}
          buttonLink="/contact"
        />
        <Footer />
      </StickyFooter>
    </Frame>
  );
};

function App() {
  const [loaded, setLoaded] = useState(false);

  const finishIntro = () => setLoaded(true);

  return (
    <BrowserRouter>
      <SmoothScroll />
      <Cursor />
      <PageCurtain />
      {!loaded && <Preloader onDone={finishIntro} />}
      <Shell />
    </BrowserRouter>
  );
}

export default App;
