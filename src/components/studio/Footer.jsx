import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLanguage } from "../../context/LanguageContext";
import { Bio } from "../../data/constants";

const Foot = styled.footer`
  background: var(--ink);
  color: var(--paper-on-ink);
  padding: clamp(3.5rem, 8vw, 6rem) var(--gutter) clamp(2rem, 3.5vw, 3rem);
`;

const Grid = styled.div`
  max-width: var(--max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--rule-on-ink);

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Cell = styled.div`
  h4 {
    font-family: var(--font-sans);
    font-size: var(--nav);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--ink-soft-on-ink);
    margin-bottom: 0.95rem;
  }

  p,
  a {
    font-size: var(--body);
    font-weight: 400;
    display: block;
    line-height: 1.5;
    opacity: 0.9;
  }

  a {
    width: fit-content;
    transition: color 0.35s var(--ease), opacity 0.3s ease;

    &:hover {
      color: var(--accent-hover);
      opacity: 1;
    }
  }
`;

const Socials = styled(Cell)`
  @media (min-width: 961px) {
    justify-self: end;
    text-align: right;

    a {
      margin-left: auto;
    }
  }

  @media (max-width: 640px) {
    text-align: left;
  }
`;

const useLocalTime = (timeZone) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone,
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
};

const Footer = () => {
  const { translate } = useLanguage();
  const time = useLocalTime("America/Bogota");

  return (
    <Foot>
      <Grid>
        <Cell>
          <h4>{translate("studio.version")}</h4>
          <p>2026 © Edition</p>
        </Cell>

        <Cell>
          <h4>{translate("studio.local_time")}</h4>
          <p>{time} COL</p>
        </Cell>

        <Socials>
          <h4>{translate("studio.socials")}</h4>
          <a href={Bio.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={Bio.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </Socials>
      </Grid>
    </Foot>
  );
};

export default Footer;
