import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/* ─── Curva superior ───
   Es la técnica del referente (.rounded-div-wrap / .rounded-div): una franja
   con overflow oculto y, dentro, una elipse enorme (150% de ancho, 750% de
   alto) desplazada hacia arriba. Sólo asoma la cresta del arco.
   Al hacer scroll la franja pierde altura y la curva se va aplanando hasta
   desaparecer, mientras el contenido del footer entra por detras. */
const Wrap = styled.div`
  /* Es el borde inferior del contenido blanco: al deslizarse sobre el footer
     fijo, este arco descubre el negro. */
  position: relative;
  z-index: 2;
  width: 100%;
  /* La curvatura depende de la relación alto/ancho: atarla al ancho la
     mantiene igual de suave en cualquier pantalla (a 1440 son ~86px, como
     los 90px medidos en el referente). */
  height: clamp(62px, 7.5vw, 130px);
  overflow: hidden;
  will-change: height;
  pointer-events: none;

`;

/* Desplazada hacia arriba (el -86.666% del referente) queda a la vista su
   borde INFERIOR, que baja en el centro: el blanco se hunde sobre el negro. */
const Curve = styled.div`
  position: absolute;
  left: 50%;
  /* 150% es el valor del referente: con menos ancho, los extremos de la
     elipse se salen del recorte y el borde queda plano. */
  width: 150%;
  height: 750%;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  transform: translate(-50%, -86.666%);
`;

const CurveTop = ({ color = "var(--paper)" }) => {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        // La altura de partida se relee del CSS en cada recalculo
        { height: () => wrapRef.current.offsetHeight },
        {
          height: 0,
          ease: "none",
          scrollTrigger: {
            // Marcada al asomar por abajo, plana al llegar arriba del todo
            trigger: wrapRef.current,
            start: "top 45%",
            end: "top 90px",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <Wrap ref={wrapRef} aria-hidden="true">
      <Curve $color={color} />
    </Wrap>
  );
};

export default CurveTop;
