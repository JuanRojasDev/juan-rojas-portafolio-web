import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { featuredWork } from "../data/work";
import { RevealText, RevealBlock } from "../components/studio/Reveal";
import WorkList from "../components/studio/WorkList";
import Pill from "../components/studio/Pill";
import { ArrowDownRight, GlobeIcon } from "../components/studio/Icons";
import HeroPortrait from "../images/juan-hero.jpg";
import { Page, Shell, LabelRow } from "../components/studio/Layout";

gsap.registerPlugin(ScrollTrigger);

/* ─── Hero ───
   Medidas tomadas del referente a 1440x900:
   nombre 216px (15vw) peso 450 sin mayúsculas y con la base a 6vh del suelo,
   rol 33px (2.3vw) al 70.8% / 45%, y la foto a 126vh desbordando por arriba. */
const Hero = styled.section`
  position: relative;
  height: 100svh;
  min-height: 600px;
  overflow: hidden;
  /* El gris del fondo del propio retrato */
  background: #8e9194;
`;

const HeroPhoto = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  /* La foto es cuadrada: si sólo se fija el alto, en ventanas estrechas el
     ancho se dispara. Se limita por los dos lados y se apoya en el suelo. */
  img {
    position: absolute;
    left: 50%;
    /* Baja para dejar aire sobre la cabeza y centrar el rostro */
    bottom: -22vh;
    transform: translateX(-50%);
    width: min(46vw, 84vh);
    height: auto;
    max-width: none;
  }

  @media (max-width: 860px) {
    img {
      /* Encuadrada por alto y apoyada en el suelo. Midiendola por ancho, en
         un movil la foto arrancaba al 68% de la pantalla y dejaba dos tercios
         de gris vacio encima. */
      width: auto;
      /* Alto y desbordamiento resueltos para que el rostro caiga al 30% de la
         pantalla, que es donde lo pone el referente:
         0.77*alto + desbordamiento = 0.70*vh, con el rostro al 23% del alto. */
      height: 100vh;
      bottom: -7vh;
      /* -63% y no -50%: el rostro esta al 63% del ancho del recorte, asi que
         ese es el desplazamiento que lo deja centrado en pantalla. */
      transform: translateX(-63%);
    }
  }
`;

/* Cinta con el nombre: el referente repite "Nombre —" y la desplaza */
const SliderContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 6vh;
  z-index: 10;
  width: 100%;
  pointer-events: none;
  overflow: hidden;

  /* En movil el nombre va por encima del rol y la ubicacion, como en el
     referente; abajo del todo quedaba pegado al borde. */
  @media (max-width: 860px) {
    bottom: 28vh;
  }
`;

const Slider = styled.div`
  position: relative;
  white-space: nowrap;
  will-change: transform;
`;

const SliderText = styled.p`
  position: relative;
  display: inline-block;
  margin: 0;
  color: #ffffff;
  font-size: 15vw;
  font-weight: 450;
  letter-spacing: normal;
  line-height: 1;
  text-transform: none;

  @media (max-width: 720px) {
    /* 36vw: el referente pone 38.4vw en movil. A 19vw el nombre se quedaba a
       la mitad y no llegaba a recortarse contra los bordes. */
    font-size: 36vw;
  }
`;

const Role = styled.div`
  position: absolute;
  left: 70.8%;
  top: 45%;
  z-index: 20;
  color: #ffffff;
  font-size: 2.3vw;
  font-weight: 450;
  letter-spacing: normal;
  line-height: 1.4;
  white-space: nowrap;

  @media (max-width: 860px) {
    left: var(--gap-padding);
    top: auto;
    bottom: 6vh;
    font-size: 5vw;
  }
`;

const Arrow = styled.div`
  position: absolute;
  left: 70.8%;
  top: 36%;
  z-index: 20;
  color: #ffffff;
  line-height: 0;

  svg {
    width: 1.6vw;
    height: 1.6vw;
    min-width: 18px;
    min-height: 18px;
  }

  @media (max-width: 860px) {
    left: var(--gap-padding);
    top: auto;
    bottom: 19vh;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

/* Píldora del referente: 257x104 a 1440, fondo #1C1D20 y un círculo que
   deja ver el gris del fondo. El texto va a 17.28px, peso 450, interlineado 1.2. */
const LocationPill = styled.div`
  position: absolute;
  left: 0;
  top: 45%;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 257px;
  height: 104px;
  padding: 0 21px 0 43.2px;
  border-radius: 0 52px 52px 0;
  background: var(--ink);
  color: var(--paper-on-ink);

  /* En movil el referente prescinde de la pastilla y de la ubicacion: abajo
     solo queda el rol a la izquierda y el globo a la derecha. */
  @media (max-width: 860px) {
    left: auto;
    right: var(--gap-padding);
    top: auto;
    bottom: 6vh;
    width: auto;
    height: auto;
    padding: 0;
    border-radius: 0;
    background: none;
  }
`;

const LocationText = styled.span`
  font-size: 17.28px;
  font-weight: 450;
  line-height: 1.2;
  letter-spacing: normal;
  display: flex;
  flex-direction: column;

  @media (max-width: 860px) {
    display: none;
  }
`;

/* El círculo no lleva borde: es del gris del fondo, como si fuese un calado */
const Globe = styled.span`
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #8e9194;
  color: #ffffff;
  flex-shrink: 0;

  svg {
    width: 26px;
    height: 26px;
  }

  /* Sin la pastilla detras, el disco gris del calado no tiene sentido. */
  @media (max-width: 860px) {
    width: auto;
    height: auto;
    background: none;

    svg {
      width: 38px;
      height: 38px;
    }
  }
`;

const Intro = styled.section`
  padding: clamp(6rem, 14vw, 10rem) 0 clamp(5rem, 12vw, 9rem);
  background: #ffffff;
  
  @media (max-width: 720px) {
    padding: clamp(4.5rem, 12vw, 6rem) 0 clamp(4rem, 10vw, 5rem);
  }
`;

const IntroGrid = styled.div`
  /* Su retícula: 685px de texto grande y 294px de columna derecha */
  display: grid;
  grid-template-columns: 685fr 294fr;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const Statement = styled.div`
  font-size: clamp(1.5rem, 2.3vw, 2.07rem);
  font-weight: 450;
  line-height: 1.45;
  letter-spacing: normal;
  color: var(--ink);
  padding-right: clamp(1rem, 3vw, 3rem);
`;

const Aside = styled.div`
  max-width: 294px;
`;

const AsideText = styled.div`
  p {
    font-size: 1.08rem;
    font-weight: 450;
    line-height: 1.6;
    letter-spacing: normal;
    color: var(--ink);
  }
`;

/* Botón circular de 173px, la medida que usa el referente en toda la web */
const CircleLink = styled(Link)`
  display: grid;
  place-items: center;
  width: 173px;
  height: 173px;
  margin-top: clamp(2rem, 4vw, 3rem);
  border-radius: 50%;
  background: var(--ink);
  color: var(--paper-on-ink);
  font-size: 1rem;
  font-weight: 450;
  text-align: center;
  transition: transform 0.5s var(--ease), background 0.4s var(--ease);

  &:hover {
    transform: scale(1.06);
    background: var(--accent);
  }

  @media (max-width: 720px) {
    width: 140px;
    height: 140px;
  }
`;

const Work = styled.section`
  padding-bottom: clamp(6rem, 14vw, 10rem);
  background: #ffffff;
`;

/* Su "More work" va centrado y con aire por encima */
const MoreRow = styled.div`
  display: flex;
  justify-content: center;
  padding: clamp(2.5rem, 5vw, 4rem) 0 0;
`;

const HERO_NAME = " Juan Andres Rojas — ";

const Home = () => {
  const { translate } = useLanguage();
  const firstText = useRef(null);
  const secondText = useRef(null);
  const sliderRef = useRef(null);
  const directionRef = useRef(-1);
  const xPercentRef = useRef(0);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.to(sliderRef.current, {
        x: "-500px",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.25,
          start: 0,
          end: () => window.innerHeight,
          onUpdate: (self) => {
            directionRef.current = self.direction * -1;
          },
        },
      });
    });

    const tick = () => {
      let x = xPercentRef.current;
      if (x < -100) x = 0;
      else if (x > 0) x = -100;
      gsap.set([firstText.current, secondText.current], { xPercent: x });
      xPercentRef.current = x + 0.06 * directionRef.current;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, []);

  return (
    <Page>
      <Hero>
        <HeroPhoto>
          <img src={HeroPortrait} alt="Juan Andrés Rojas" />
        </HeroPhoto>

        <SliderContainer>
          <Slider ref={sliderRef}>
            <SliderText ref={firstText}>{HERO_NAME}</SliderText>
            <SliderText ref={secondText} aria-hidden="true">
              {HERO_NAME}
            </SliderText>
          </Slider>
        </SliderContainer>

        <Arrow aria-hidden="true">
          <ArrowDownRight size={20} />
        </Arrow>

        <Role>
          {translate("studio.hero_line_1")}
          <br />
          {translate("studio.hero_line_2")}
        </Role>

        <LocationPill>
          <LocationText>
            <span>{translate("studio.located_l1")}</span>
            <span>{translate("studio.located_l2")}</span>
            <span>{translate("studio.located_l3")}</span>
          </LocationText>
          <Globe aria-hidden="true">
            <GlobeIcon size={20} />
          </Globe>
        </LocationPill>
      </Hero>

      <Shell>
        <Intro>
          <IntroGrid>
            <Statement>
              <RevealText stagger={0.03}>{translate("studio.statement")}</RevealText>
            </Statement>

            <Aside>
              <AsideText>
                <RevealBlock delay={0.1}>
                  <p>{translate("studio.about_short")}</p>
                </RevealBlock>
              </AsideText>
              <RevealBlock delay={0.18} y={24}>
                <CircleLink to="/about">{translate("studio.about_link")}</CircleLink>
              </RevealBlock>
            </Aside>
          </IntroGrid>
        </Intro>

        <Work>
          <LabelRow>
            <span className="label">{translate("studio.recent_work")}</span>
          </LabelRow>
          <WorkList items={featuredWork} />
          <MoreRow>
            <Pill to="/work" count={featuredWork.length}>
              {translate("studio.more_work")}
            </Pill>
          </MoreRow>
        </Work>
      </Shell>

    </Page>
  );
};

export default Home;
