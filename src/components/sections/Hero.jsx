import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Tilt } from "react-tilt";
import Typewriter from "typewriter-effect";
import { Bio } from "../../data/constants";
import FotoImg from "../../images/Foto.jpg";
import HeroBgAnimation from "../HeroBgAnimation";
import StarCanvas from "../canvas/Stars";
import { useLanguage } from "../../context/LanguageContext";
import {
  headContainerAnimation,
  headTextAnimation,
  headContentAnimation,
} from "../../utils/motion";

// ─── Keyframes ───
const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-10px) rotate(0.4deg); }
  66%       { transform: translateY(5px) rotate(-0.4deg); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50%       { opacity: 0.9;  transform: scale(1.08); }
`;

const orbitSpin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const meteorFall = keyframes`
  0% {
    transform: translate(-100px, -100px) rotate(-45deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translate(800px, 800px) rotate(-45deg);
    opacity: 0;
  }
`;

const borderGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255,127,0,0.4), 0 0 60px rgba(133,76,230,0.15); }
  50%       { box-shadow: 0 0 40px rgba(255,127,0,0.7), 0 0 80px rgba(133,76,230,0.30); }
`;

const scanLine = keyframes`
  0%   { transform: translateY(-100%); opacity: 0; }
  10%  { opacity: 0.4; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(400px); opacity: 0; }
`;

// ─── Layout ───
const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
  /* Ambient purple glow from top */
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(133,76,230,0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 960px) { padding: 66px 16px; }
  @media (max-width: 640px) { padding: 32px 16px; }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: visible;
  padding: 0;
  pointer-events: none;
  will-change: transform;
  contain: layout style paint;

  /* Mover la animación hacia la derecha para que coincida con el avatar */
  > * {
    position: absolute;
    right: 10%;
    transform: translateX(0);
  }

  @media (max-width: 960px) {
    > * {
      position: relative;
      right: auto;
      transform: none;
    }
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  z-index: 1;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;

  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 960px) {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

// ─── Typography ───
const Title = styled.div`
  font-weight: 800;
  font-size: clamp(2.6rem, 5.5vw, 4rem);
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.1;
  letter-spacing: -0.03em;

  .name-gradient {
    background: linear-gradient(
      135deg,
      #F2F3F4 0%,
      #FF7F00 40%,
      #FFA040 60%,
      #854CE6 100%
    );
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${gradientShift} 5s ease infinite;
  }

  @media (max-width: 960px) {
    text-align: center;
    font-size: clamp(2.2rem, 7vw, 3rem);
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: clamp(1.3rem, 2.8vw, 1.9rem);
  display: flex;
  gap: 12px;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.4;
  margin-top: 8px;
  flex-wrap: nowrap;
  white-space: nowrap;
  /* Ancho mínimo para evitar que empuje la imagen */
  min-width: 500px;

  @media (max-width: 960px) {
    font-size: clamp(1.1rem, 4vw, 1.5rem);
    margin-bottom: 16px;
    justify-content: center;
    /* Allow wrap only on very small screens */
    flex-wrap: wrap;
    white-space: normal;
    min-width: auto;
  }
`;

const Span = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  /* Ancho fijo para el contenedor del typewriter */
  display: inline-block;
  min-width: 400px;
  text-align: left;
`;

const SubTitle = styled.div`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  line-height: 1.8;
  margin-bottom: 44px;
  margin-top: 16px;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 520px;

  @media (max-width: 960px) {
    text-align: center;
    font-size: 1rem;
    max-width: 480px;
  }
`;

// ─── CTA Buttons ───
const CTARow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

// Primary CTA — magnetic, animated border, glow
const PrimaryBtn = styled(motion.a)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 15px 32px;
  border-radius: 50px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  /* Gradient fill */
  background: linear-gradient(225deg, #A0522D 0%, #FF7F00 40%, #FF9A00 100%);
  background-size: 200% 200%;
  animation: ${gradientShift} 4s ease infinite;
  /* Glow */
  box-shadow:
    0 0 0 1px rgba(255,127,0,0.3),
    0 4px 20px rgba(255,127,0,0.35),
    0 8px 40px rgba(255,127,0,0.15),
    inset 0 1px 0 rgba(255,255,255,0.2);
  transition: box-shadow 0.3s ease, transform 0.2s ease;

  /* Shine sweep */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.25),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    box-shadow:
      0 0 0 1px rgba(255,127,0,0.5),
      0 8px 32px rgba(255,127,0,0.55),
      0 16px 60px rgba(255,127,0,0.25),
      inset 0 1px 0 rgba(255,255,255,0.25);
    &::before { left: 140%; }
  }

  svg { flex-shrink: 0; }

  @media (max-width: 640px) {
    padding: 13px 26px;
    font-size: 0.95rem;
  }
`;

// Secondary CTA — ghost with animated border
const SecondaryBtn = styled(motion.a)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 14px 30px;
  border-radius: 50px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(133, 76, 230, 0.5);
    color: ${({ theme }) => theme.secondaryLight};
    background: rgba(133, 76, 230, 0.08);
    box-shadow: 0 0 24px rgba(133, 76, 230, 0.2);
  }

  svg { flex-shrink: 0; }

  @media (max-width: 640px) {
    padding: 12px 24px;
    font-size: 0.95rem;
  }
`;

// ─── Avatar ───
const AvatarWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  animation: ${float} 7s ease-in-out infinite;
  will-change: transform;
  /* Asegurar que mantenga su espacio */
  flex-shrink: 0;

  @media (max-width: 640px) {
    max-width: 280px;
  }
`;

// (Tech badges removed - meteorites are now in Stars.jsx)

// Outer ambient glow — orange + purple
const AvatarAmbient = styled.div`
  position: absolute;
  inset: -40px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255,127,0,0.25) 0%,
    rgba(133,76,230,0.12) 50%,
    transparent 70%
  );
  animation: ${glowPulse} 3.5s ease-in-out infinite;
  z-index: 0;
`;

// Spinning conic ring — orange to purple
const AvatarRing = styled.div`
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #FF7F00 0deg,
    #FF4500 90deg,
    #854CE6 180deg,
    #A78BFA 270deg,
    #FF7F00 360deg
  );
  animation: ${orbitSpin} 9s linear infinite;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: ${({ theme }) => theme.bg};
  }
`;

const Img = styled.img`
  position: relative;
  z-index: 2;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
  object-position: center center;
  animation: ${borderGlow} 4s ease-in-out infinite;
  display: block;
  /* Prevenir layout shift */
  aspect-ratio: 1 / 1;

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

// Scan line effect on avatar
const ScanLine = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  z-index: 3;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,127,0,0.6),
      transparent
    );
    animation: ${scanLine} 4s ease-in-out infinite;
    animation-delay: 1s;
  }
`;

// ─── Magnetic button hook ───
function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
}

// ─── Component ───
const Hero = () => {
  const { translate } = useLanguage();
  const primaryMag  = useMagnetic(0.3);
  const secondaryMag = useMagnetic(0.25);

  const roles = [
    translate("full_stack_developer"),
    translate("mobile_developer"),
    translate("ai_developer"),
    translate("ui_ux_designer"),
  ];

  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>

        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            {/* ── Left ── */}
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title>
                  {translate("hi")} <br />
                  <span className="name-gradient">{Bio.name}</span>
                </Title>
                <TextLoop>
                  {translate("i_am_a")}
                  <Span>
                    <Typewriter
                      options={{ strings: roles, autoStart: true, loop: true }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>{translate("bio_description")}</SubTitle>
              </motion.div>

              {/* ── Premium CTA buttons ── */}
              <CTARow
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Primary — View CV */}
                <motion.div
                  ref={primaryMag.ref}
                  style={{ x: primaryMag.springX, y: primaryMag.springY }}
                  onMouseMove={primaryMag.handleMouseMove}
                  onMouseLeave={primaryMag.handleMouseLeave}
                >
                  <PrimaryBtn
                    href={Bio.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.96 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    {translate("view_cv")}
                  </PrimaryBtn>
                </motion.div>

                {/* Secondary — Projects */}
                <motion.div
                  ref={secondaryMag.ref}
                  style={{ x: secondaryMag.springX, y: secondaryMag.springY }}
                  onMouseMove={secondaryMag.handleMouseMove}
                  onMouseLeave={secondaryMag.handleMouseLeave}
                >
                  <SecondaryBtn
                    href="#Projects"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("Projects")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {translate("projects_title")}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </SecondaryBtn>
                </motion.div>
              </CTARow>
            </HeroLeftContainer>

            {/* ── Right — Avatar ── */}
            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt
                  options={{
                    max: 14,
                    scale: 1.04,
                    speed: 500,
                    glare: true,
                    "max-glare": 0.18,
                  }}
                >
                  <AvatarWrapper>
                    <AvatarAmbient />
                    <AvatarRing />
                    <Img src={FotoImg} alt="Juan Andres Rojas" />
                    <ScanLine />
                  </AvatarWrapper>
                </Tilt>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default Hero;
