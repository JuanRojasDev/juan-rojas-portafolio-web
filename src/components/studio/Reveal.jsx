import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Wrap = styled.span`
  display: block;
`;

const Word = styled.span`
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  /* Sin este colchón, la máscara corta las colas de la g y la j */
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;

  > span {
    display: inline-block;
    will-change: transform;
  }
`;

const Fade = styled.div`
  will-change: transform, opacity;
`;

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Revelado palabra por palabra desde debajo de una máscara.
 * `as` permite renderizar el mismo efecto sobre h1, h2, p, etc.
 */
export const RevealText = ({ children, as = "div", delay = 0, stagger = 0.045, className }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (reduced()) return undefined;

    // context + revert deja los estilos en línea como estaban: sin esto, el
    // doble montaje de StrictMode puede dejar el texto congelado fuera de vista.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word] > span",
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.15,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 86%", once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [children, delay, stagger]);

  const words = String(children).split(" ");

  return (
    <Wrap as={as} ref={ref} className={className}>
      {words.map((word, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Word data-word key={`${word}-${i}`}>
          <span>{word}</span>
          {i < words.length - 1 ? " " : ""}
        </Word>
      ))}
    </Wrap>
  );
};

/** Entrada sobria para bloques que no son texto (imágenes, filas, tarjetas). */
export const RevealBlock = ({ children, delay = 0, y = 40, className }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (reduced()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Fade ref={ref} className={className}>
      {children}
    </Fade>
  );
};

export default RevealText;
