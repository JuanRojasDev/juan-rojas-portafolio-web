import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

// Diámetro del botón circular. Vive en una variable porque la fila de píldoras
// necesita el mismo valor para dejarle sitio: el círculo va montado sobre la
// regla, así que sobresale media altura hacia abajo.
const DIAL = "clamp(160px, 20vw, 220px)";
const DIAL_SM = "140px";

const Section = styled.section`
  position: relative;
  background: var(--ink);
  color: var(--paper-on-ink);
  padding: clamp(3rem, 6vw, 5rem) 0 clamp(5rem, 12vw, 8rem);
  overflow: visible;
  margin-top: 0;

  @media (max-width: 720px) {
    padding: clamp(2.5rem, 8vw, 4rem) 0 clamp(4rem, 10vw, 5rem);
    margin-top: clamp(60px, 12vw, 120px);
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--gutter);
`;

const TopRow = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: clamp(1rem, 2vw, 1.5rem);
`;

// El recorte de Juan es un PNG sin fondo, así que sobre el footer oscuro
// flotaba recortado. El disco gris se lo devuelve, como en la referencia.
const Avatar = styled.span`
  position: relative;
  display: block;
  width: clamp(50px, 8vw, 80px);
  height: clamp(50px, 8vw, 80px);
  border-radius: 50%;
  overflow: hidden;
  background: #9ea2a6;
  flex-shrink: 0;
  will-change: transform, opacity;

  img {
    position: absolute;
    /* El rostro está al 63% del ancho y al 27% del alto del recorte. Con el
       borde superior izquierdo en el centro del disco, ese mismo par movido en
       negativo lo deja centrado — sea cual sea el zoom de abajo. */
    left: 50%;
    top: 50%;
    width: 155%;
    /* La regla global "img { max-width: 100% }" de index.css recortaria el
       zoom a 100% del disco y dejaria el encuadre a medias. */
    max-width: none;
    height: auto;
    transform: translate(-63%, -27%);
  }
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 6.5vw, 4.5rem);
  font-weight: 500;
  letter-spacing: var(--tracking-display);
  line-height: 1.1;
  margin: 0;
  /* En em: el titular parte en dos líneas igual en cualquier ancho e idioma. */
  max-width: 8em;
`;

const Arrow = styled.span`
  position: absolute;
  right: 0;
  bottom: 0.35em;
  font-size: clamp(1.1rem, 1.6vw, 1.5rem);
  line-height: 1;
  color: var(--paper-on-ink);
  opacity: 0.85;
  will-change: opacity;

  @media (max-width: 960px) {
    display: none;
  }
`;

// La regla ocupa el ancho completo y el círculo se monta encima, centrado en
// ella — es lo que da la composición de la referencia.
const RuleWrap = styled.div`
  position: relative;
  margin-top: clamp(2.5rem, 5vw, 4rem);
`;

const Rule = styled.div`
  height: 1px;
  width: 100%;
  background: var(--rule-on-ink);
`;

const CTAButton = styled(Link)`
  position: absolute;
  right: clamp(0.5rem, 4vw, 5rem);
  top: 50%;
  transform: translateY(-50%);
  width: ${DIAL};
  height: ${DIAL};
  border-radius: 50%;
  background: var(--accent);
  color: var(--paper-on-ink);
  display: grid;
  place-items: center;
  font-size: clamp(0.95rem, 1.3vw, 1.1rem);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  box-shadow:
    0 8px 40px rgba(69, 92, 233, 0.35),
    0 2px 12px rgba(69, 92, 233, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: background 0.5s var(--ease), transform 0.5s var(--ease),
    box-shadow 0.5s var(--ease);
  will-change: transform, opacity;

  &:hover {
    background: var(--accent-hover);
    transform: translateY(-50%) scale(1.08);
    box-shadow:
      0 12px 48px rgba(69, 92, 233, 0.45),
      0 4px 16px rgba(69, 92, 233, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: translateY(-50%) scale(1.02);
  }

  /* Apilado: el círculo deja de montarse sobre la regla y pasa a ser un bloque
     centrado, porque a este ancho no cabe al lado de las píldoras. */
  @media (max-width: 960px) {
    position: static;
    transform: none;
    width: ${DIAL_SM};
    height: ${DIAL_SM};
    font-size: 0.9rem;
    margin: clamp(2rem, 6vw, 3rem) auto 0;

    &:hover {
      transform: scale(1.08);
    }

    &:active {
      transform: scale(1.02);
    }
  }
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1rem, 2vw, 1.5rem);
  /* Media altura del círculo + aire, para pasar por debajo de lo que sobresale. */
  margin-top: calc(${DIAL} / 2 + clamp(1.25rem, 2.5vw, 2rem));

  @media (max-width: 960px) {
    margin-top: clamp(2rem, 6vw, 3rem);
    justify-content: center;
  }
`;

const ContactPill = styled.a`
  display: inline-block;
  padding: clamp(0.75rem, 1.2vw, 1rem) clamp(1.25rem, 2vw, 1.75rem);
  border: 1.5px solid var(--rule-on-ink);
  border-radius: 999px;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  font-weight: 400;
  color: var(--paper-on-ink);
  text-decoration: none;
  transition: all 0.4s var(--ease);
  will-change: transform, opacity;

  &:hover {
    border-color: var(--accent);
    background: rgba(69, 92, 233, 0.1);
    transform: translateY(-2px);
  }
`;

const CTASection = ({
  avatar,
  title = "Let's work together",
  email = "rojassalinasjuanandres@gmail.com",
  phone = "+57 123 456 7890",
  buttonText = "Get in touch",
  buttonLink = "/contact",
}) => {
  const sectionRef = useRef(null);
  const avatarRef = useRef(null);
  const buttonRef = useRef(null);
  const arrowRef = useRef(null);
  const pillsRef = useRef([]);

  return (
    <Section ref={sectionRef}>
      <Container data-cta-content>
        <TopRow>
          {avatar && (
            <Avatar ref={avatarRef}>
              <img src={avatar} alt="Juan Andrés Rojas" />
            </Avatar>
          )}
          <Title>
            <RevealText>{title}</RevealText>
          </Title>
          <Arrow ref={arrowRef}>↙</Arrow>
        </TopRow>

        <RuleWrap>
          <Rule />
          <CTAButton ref={buttonRef} to={buttonLink}>
            {buttonText}
          </CTAButton>
        </RuleWrap>

        <ContactRow>
          <ContactPill
            ref={(el) => (pillsRef.current[0] = el)}
            href={`mailto:${email}`}
          >
            {email}
          </ContactPill>
          {phone && (
            <ContactPill
              ref={(el) => (pillsRef.current[1] = el)}
              href={buttonLink}
            >
              {phone}
            </ContactPill>
          )}
        </ContactRow>
      </Container>
    </Section>
  );
};

export default CTASection;
