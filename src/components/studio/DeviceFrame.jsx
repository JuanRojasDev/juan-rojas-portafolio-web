import React from "react";
import styled from "styled-components";

/* ─── Marcos de dispositivo ───
   Las capturas no se muestran sueltas: van dentro de un monitor, un portátil,
   un navegador o un móvil dibujados en CSS, que es como el referente presenta
   cada proyecto. */

const Screen = styled.div`
  position: relative;
  overflow: hidden;
  background: #0b0b0d;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }
`;

/* Monitor de sobremesa con bisel ancho y pie, tipo pantalla de estudio */
const Monitor = styled.figure`
  margin: 0;
  width: 100%;
  max-width: 1100px;

  ${Screen} {
    aspect-ratio: 16 / 10;
    border: 12px solid #17181a;
    border-radius: 12px;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.22);
  }

  /* Cuello y base */
  &::after {
    content: "";
    display: block;
    width: 22%;
    height: 42px;
    margin: 0 auto;
    background: linear-gradient(180deg, #303236 0%, #9a9da1 78%, #7d8084 100%);
    border-radius: 0 0 10px 10px;
    clip-path: polygon(18% 0, 82% 0, 100% 100%, 0 100%);
  }

  @media (max-width: 720px) {
    ${Screen} {
      border-width: 7px;
      border-radius: 9px;
    }

    &::after {
      height: 26px;
    }
  }
`;

/* Portátil: pantalla con bisel y base trapezoidal */
const Laptop = styled.figure`
  margin: 0;
  width: 100%;
  max-width: 1000px;

  ${Screen} {
    aspect-ratio: 16 / 10;
    border: 11px solid #17181a;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: "";
    display: block;
    width: 112%;
    height: 16px;
    margin: 0 -6%;
    background: linear-gradient(180deg, #c7cace 0%, #8f9296 100%);
    border-radius: 0 0 12px 12px;
    clip-path: polygon(1.5% 0, 98.5% 0, 96% 100%, 4% 100%);
  }

  @media (max-width: 720px) {
    ${Screen} {
      border-width: 7px;
    }

    &::after {
      height: 10px;
    }
  }
`;

/* Ventana de navegador: barra superior con los tres puntos */
const Browser = styled.figure`
  margin: 0;
  width: 100%;
  max-width: 1200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.18);

  ${Screen} {
    aspect-ratio: 16 / 10;
  }

  &::before {
    content: "";
    display: block;
    height: 38px;
    background: #e6e7e9
      radial-gradient(circle 5px at 20px 19px, #ff5f57 98%, transparent)
      no-repeat;
    box-shadow: inset 38px 0 0 -33px #febc2e, inset 74px 0 0 -69px #28c840;
  }

  @media (max-width: 720px) {
    &::before {
      height: 26px;
    }
  }
`;

/* Móvil con muesca */
const Phone = styled.figure`
  margin: 0;
  width: 100%;
  max-width: 300px;

  ${Screen} {
    aspect-ratio: 390 / 845;
    border: 9px solid #17181a;
    border-radius: 34px;
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.26);
  }

  ${Screen}::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 34%;
    height: 16px;
    background: #17181a;
    border-radius: 0 0 12px 12px;
    z-index: 2;
  }

  @media (max-width: 720px) {
    max-width: 220px;
  }
`;

/* Sin marco, para capturas que ya traen su propio encuadre */
const Plain = styled.figure`
  margin: 0;
  width: 100%;

  ${Screen} {
    aspect-ratio: ${({ $ratio }) => $ratio || "16 / 10"};
    border-radius: 8px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16);
  }
`;

const frames = { monitor: Monitor, laptop: Laptop, browser: Browser, phone: Phone, plain: Plain };

const DeviceFrame = ({ type = "browser", src, alt, ratio, className }) => {
  const Frame = frames[type] || Browser;

  return (
    <Frame className={className} $ratio={ratio}>
      <Screen>
        <img src={src} alt={alt} loading="lazy" />
      </Screen>
    </Frame>
  );
};

export default DeviceFrame;
