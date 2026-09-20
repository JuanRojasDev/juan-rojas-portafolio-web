import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useLanguage } from "../../context/LanguageContext";
import { RevealBlock } from "./Reveal";

const List = styled.div`
  position: relative;
  border-top: 1px solid var(--rule);
`;

const Row = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16rem 5rem;
  align-items: baseline;
  gap: clamp(1rem, 2.5vw, 2.5rem);
  padding: clamp(1.65rem, 3.5vw, 2.8rem) 0;
  border-bottom: 1px solid var(--rule);
  transition: padding-left 0.65s var(--ease), background 0.3s ease;

  &:hover {
    padding-left: clamp(0.6rem, 1.5vw, 1.5rem);
    background: rgba(28, 29, 32, 0.015);
  }

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: clamp(0.8rem, 2vw, 1.5rem);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.4rem;
    padding: clamp(1.35rem, 3vw, 1.8rem) 0;
  }
`;

const Name = styled.h3`
  font-size: clamp(2rem, 5.2vw, 4.2rem);
  font-weight: 500;
  letter-spacing: var(--tracking-display);
  line-height: 1.02;
  transition: color 0.4s var(--ease);

  ${Row}:hover & {
    color: var(--accent);
  }

  @media (max-width: 640px) {
    font-size: clamp(1.75rem, 8vw, 2.5rem);
  }
`;

const Role = styled.span`
  font-size: var(--body);
  font-weight: 400;
  color: var(--ink);
  opacity: 0.6;
  letter-spacing: var(--tracking-body);
  line-height: 1.4;

  @media (max-width: 960px) {
    text-align: right;
  }

  @media (max-width: 640px) {
    text-align: left;
    font-size: var(--body-sm);
  }
`;

const Year = styled.span`
  font-family: var(--font-sans);
  font-size: var(--nav);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  color: var(--ink-faint);
  text-align: right;

  @media (max-width: 960px) {
    display: none;
  }
`;

// La ventana. Sigue al cursor y recorta la tira: lo que se ve por el hueco es
// un único proyecto, y durante el desplazamiento se asoman dos a la vez.
const Preview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: clamp(240px, 26vw, 380px);
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 12px;
  pointer-events: none;
  opacity: 0;
  will-change: transform;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 960px), (hover: none) {
    display: none;
  }
`;

// Todos los proyectos apilados en vertical. Cambiar de fila no cambia ninguna
// `src`: solo se desplaza esta tira, que es lo que produce el efecto persiana.
const Strip = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  will-change: transform;
`;

const Frame = styled.div`
  flex: 0 0 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ $accent }) => $accent || "var(--rule)"};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SLIDE = 0.62;

const WorkList = ({ items }) => {
  const { language } = useLanguage();
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const stripRef = useRef(null);
  const moveTo = useRef(null);
  const active = useRef(-1);
  const open = useRef(false);

  const handleEnter = (index) => {
    const el = previewRef.current;
    const strip = stripRef.current;
    if (!el || !strip) return;

    // La altura se lee en cada entrada porque el ancho del preview es un clamp
    // sobre vw: tras un resize, el desplazamiento de la tira cambia.
    const step = el.offsetHeight;

    if (!open.current) {
      // Primera entrada a la lista: se coloca la tira sin animar y se abre la
      // ventana. Deslizar desde el proyecto anterior aquí sería gratuito.
      gsap.set(strip, { y: -index * step });
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" });
      open.current = true;
    } else if (active.current !== index) {
      gsap.to(strip, {
        y: -index * step,
        duration: SLIDE,
        ease: "power3.inOut",
        overwrite: true,
      });
    }

    active.current = index;
  };

  // Va en la lista, no en cada fila: al pasar de un proyecto al siguiente el
  // mouseleave de la fila saliente cancelaría el deslizamiento con un fundido.
  const handleLeave = () => {
    if (!previewRef.current) return;
    open.current = false;
    active.current = -1;
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMove = (e) => {
    if (!previewRef.current) return;
    const bounds = listRef.current.getBoundingClientRect();
    const el = previewRef.current;

    if (!moveTo.current) {
      moveTo.current = {
        x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
      };
    }

    moveTo.current.x(e.clientX - bounds.left - el.offsetWidth / 2);
    moveTo.current.y(e.clientY - bounds.top - el.offsetHeight / 2);
  };

  return (
    <List ref={listRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <Preview ref={previewRef} aria-hidden="true">
        <Strip ref={stripRef}>
          {items.map((project) => {
            const shot = project.gallery && project.gallery[0];
            return (
              <Frame key={project.slug} $accent={project.accent}>
                {shot && <img src={shot.src} alt="" />}
              </Frame>
            );
          })}
        </Strip>
      </Preview>

      {items.map((project, i) => (
        <RevealBlock key={project.slug} delay={i * 0.04} y={24}>
          <Row
            to={`/work/${project.slug}`}
            data-cursor="View"
            onMouseEnter={() => handleEnter(i)}
          >
            <Name>{project.title}</Name>
            <Role>{project.role[language]}</Role>
            <Year>{project.year}</Year>
          </Row>
        </RevealBlock>
      ))}
    </List>
  );
};

export default WorkList;
