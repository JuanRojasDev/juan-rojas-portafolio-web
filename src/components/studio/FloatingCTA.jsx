import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const Button = styled(Link)`
  position: fixed;
  bottom: clamp(2rem, 4vw, 3rem);
  right: clamp(2rem, 4vw, 3rem);
  z-index: 800;
  width: clamp(140px, 18vw, 200px);
  height: clamp(140px, 18vw, 200px);
  border-radius: 50%;
  background: var(--accent);
  color: var(--paper-on-ink);
  display: grid;
  place-items: center;
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 
    0 8px 40px rgba(69, 92, 233, 0.35),
    0 2px 12px rgba(69, 92, 233, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.5s var(--ease);
  animation: ${float} 3.5s ease-in-out infinite;
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
  will-change: transform, opacity;

  &:hover {
    background: var(--accent-hover);
    transform: scale(1.08);
    box-shadow: 
      0 12px 48px rgba(69, 92, 233, 0.45),
      0 4px 16px rgba(69, 92, 233, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
    animation: none;
  }

  &:active {
    transform: scale(1.02);
  }

  @media (max-width: 960px) {
    width: 120px;
    height: 120px;
    font-size: 0.875rem;
  }

  @media (max-width: 640px) {
    width: 100px;
    height: 100px;
    font-size: 0.8rem;
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

const FloatingCTA = ({ to = "/contact", children = "Get in touch" }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    if (!btnRef.current) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const btn = btnRef.current;

    const ctx = gsap.context(() => {
      // Mostrar el botón después de cierto scroll
      gsap.to(btn, {
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: document.body,
          start: "top top-=100",
          end: "top top-=100",
          onEnter: () => {
            gsap.to(btn, {
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              duration: 0.6,
              ease: "back.out(1.4)",
            });
          },
          onLeaveBack: () => {
            gsap.to(btn, {
              opacity: 0,
              scale: 0.8,
              pointerEvents: "none",
              duration: 0.4,
              ease: "power2.in",
            });
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Button ref={btnRef} to={to} aria-label={children}>
      {children}
    </Button>
  );
};

export default FloatingCTA;
