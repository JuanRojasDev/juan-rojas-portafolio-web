import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";

/* Bolita del referente (.mouse-pos-list-span): azul, arranca en 0 y crece
   sólo sobre las zonas marcadas. No sustituye al cursor del sistema. */
const Dot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 26;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--accent);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  will-change: transform, width, height;

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

const Label = styled.span`
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 450;
  letter-spacing: normal;
  color: var(--color-white);
  white-space: nowrap;
  opacity: 0;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.33em;
`;

const Cursor = () => {
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return undefined;


    const dot = dotRef.current;
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    const x = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e) => {
      x(e.clientX);
      y(e.clientY);
    };

    const grow = (text) => {
      setLabel(text);
      gsap.to(dot, { width: 112, height: 112, duration: 0.45, ease: "expo.out" });
      gsap.to(labelRef.current, { opacity: 1, duration: 0.3, delay: 0.1 });
    };

    // Vuelve a cero: fuera de las zonas marcadas no hay bolita, sólo el
    // cursor del sistema.
    const shrink = () => {
      gsap.to(labelRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(dot, { width: 0, height: 0, duration: 0.4, ease: "expo.out" });
    };

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) grow(target.dataset.cursor);
    };

    const onOut = (e) => {
      if (e.target.closest("[data-cursor]")) shrink();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <Dot ref={dotRef} aria-hidden="true">
      <Label ref={labelRef}>
        {label}
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M3 11L11 3M11 3H4.5M11 3v6.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Label>
    </Dot>
  );
};

export default Cursor;
