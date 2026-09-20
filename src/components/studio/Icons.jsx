import React from "react";
import styled, { keyframes } from "styled-components";

/** Flecha ↘ del hero — stroke fino como en el referente. */
export const ArrowDownRight = ({ size = 24, strokeWidth = 1.25, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M7 7l10 10M17 9v8H9"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Globo ───
   El referente no usa un gif: son meridianos cuyo ancho oscila de completo a
   cero. Esa es justamente la proyeccion de un meridiano que gira (|cos t|), y
   con tres desfasados un tercio de ciclo se lee como una esfera rodando. */
const spin = keyframes`
  0%   { transform: scaleX(1); }
  50%  { transform: scaleX(0.02); }
  100% { transform: scaleX(1); }
`;

const tilt = keyframes`
  0%   { transform: rotate(-13deg); }
  50%  { transform: rotate(13deg); }
  100% { transform: rotate(-13deg); }
`;

const GlobeSvg = styled.svg`
  /* Igual que el referente: 2.7s lineal en los meridianos y un balanceo de
     5.4s sobre el conjunto. */
  animation: ${tilt} 5.4s cubic-bezier(0.35, 0, 0.65, 1) infinite;
  transform-origin: center;

  .meridian {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${spin} 2.7s linear infinite;
  }

  .meridian:nth-of-type(2) {
    animation-delay: -0.9s;
  }

  .meridian:nth-of-type(3) {
    animation-delay: -1.8s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    .meridian {
      animation: none;
    }
  }
`;

export const GlobeIcon = ({ size = 22, strokeWidth = 1.15, ...props }) => (
  <GlobeSvg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M3 12h18M4.6 7.5h14.8M4.6 16.5h14.8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {[0, 1, 2].map((i) => (
      <ellipse
        key={i}
        className="meridian"
        cx="12"
        cy="12"
        rx="9"
        ry="9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    ))}
  </GlobeSvg>
);

/** Enlace externo ↗. */
export const ArrowUpRight = ({ size = 14, strokeWidth = 1.35, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M7 17L17 7M9 7h8v8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
