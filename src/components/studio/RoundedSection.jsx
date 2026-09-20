import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  position: relative;
  background: var(--ink);
  color: var(--paper-on-ink);
  padding: clamp(8rem, 16vw, 12rem) 0 clamp(5rem, 12vw, 8rem);
  overflow: visible;
  
  /* Curva CÓNCAVA en la parte superior (entra hacia adentro) */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: clamp(100px, 15vw, 200px);
    background: #ffffff;
    border-radius: 0 0 50% 50%;
    z-index: 1;
  }
  
  @media (max-width: 720px) {
    padding: clamp(6rem, 14vw, 9rem) 0 clamp(4rem, 10vw, 5rem);
    
    &::before {
      height: clamp(60px, 12vw, 120px);
    }
  }
`;

const RoundedTop = styled.div`
  display: none;
`;

const RoundedSection = ({ children, className }) => {
  const sectionRef = useRef(null);
  const roundedRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // Animar el ::before con CSS variables o transforms
      const beforeElement = section;
      
      gsap.fromTo(
        beforeElement,
        {
          "--curve-scale": "0.3",
        },
        {
          "--curve-scale": "1",
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=50",
            end: "top center",
            scrub: 1.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} className={className}>
      <RoundedTop ref={roundedRef} aria-hidden="true" />
      {children}
    </Section>
  );
};

export default RoundedSection;
