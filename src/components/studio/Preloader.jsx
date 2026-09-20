import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { getLenis } from "./SmoothScroll";

/* Mismos saludos del referente / intro Awwwards */
const greetings = [
  "Hello",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "Olá",
  "おい",
  "Hallå",
  "Guten tag",
  "Hallo",
  "Hola",
];

const Screen = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: var(--ink-dark);
  display: grid;
  place-items: center;
`;

const Greeting = styled.div`
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
    width: clamp(10px, 1.2vw, 12px);
    height: clamp(10px, 1.2vw, 12px);
    border-radius: 50%;
    background: var(--color-white);
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    gap: 10px;
    
    &::before {
      width: 9px;
      height: 9px;
    }
  }
`;


const Preloader = ({ onDone }) => {
  const screenRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";

    // Los 2.75s eran lo que tardaba el contador en llegar a 100. Sin contador
    // se mantienen como espera, para que la rotacion de saludos siga cuadrando.
    const tl = gsap.timeline({ delay: 2.75 });

    tl.to(screenRef.current, {
      yPercent: -100,
      duration: 1.15,
      ease: "expo.inOut",
    })
      .call(() => {
        document.body.style.overflow = "";
        const l = getLenis();
        if (l) l.start();
        onDone();
      });

    // Primer saludo más largo, luego rotación rápida (como el referente)
    const timers = [];
    let i = 0;
    const schedule = (delay) => {
      const id = setTimeout(() => {
        i += 1;
        if (i < greetings.length) {
          setIndex(i);
          schedule(140);
        }
      }, delay);
      timers.push(id);
    };
    schedule(950);

    return () => {
      timers.forEach(clearTimeout);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <Screen ref={screenRef} aria-hidden="true">
      <Greeting>{greetings[index]}</Greeting>
    </Screen>
  );
};

export default Preloader;
