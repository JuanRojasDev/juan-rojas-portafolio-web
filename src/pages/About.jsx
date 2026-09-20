import React from "react";
import styled from "styled-components";
import { useLanguage } from "../context/LanguageContext";
import { experiences, education, frameworks } from "../data/constants";
import { RevealText, RevealBlock } from "../components/studio/Reveal";
import HeroPortrait from "../images/juan-hero.jpg";
import { Page, Shell, PageHead, PageTitle } from "../components/studio/Layout";

const Lede = styled.div`
  font-size: clamp(1.4rem, 2.6vw, 2.2rem);
  line-height: 1.26;
  letter-spacing: -0.03em;
  max-width: 28ch;
  margin-top: clamp(2rem, 5vw, 3.5rem);

  @media (min-width: 900px) {
    margin-left: 33%;
  }
`;

const Portrait = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin-bottom: var(--section);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(180deg, #6f767f 0%, #7b828a 55%, #848b93 100%);

  img {
    height: 100%;
    width: auto;
    max-width: none;
    object-fit: cover;
    object-position: center top;
    filter: grayscale(1) contrast(1.04);
  }

  @media (max-width: 720px) {
    aspect-ratio: 4 / 3;
  }
`;

// ─── Secciones en dos columnas: etiqueta a la izquierda, contenido a la derecha ───
const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 2.2fr;
  gap: clamp(1.5rem, 5vw, 5rem);
  padding-bottom: var(--section);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SectionLabel = styled.h2`
  font-family: var(--font-sans);
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--ink-faint);
  align-self: start;
  position: sticky;
  top: calc(var(--gutter) + 2rem);

  @media (max-width: 860px) {
    position: static;
  }
`;

const Entry = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(1rem, 3vw, 2.5rem);
  padding: clamp(1.25rem, 2.5vw, 2rem) 0;
  border-top: 1px solid var(--rule);

  &:last-child {
    border-bottom: 1px solid var(--rule);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const EntryDate = styled.div`
  font-family: var(--font-sans);
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  color: var(--ink-faint);
  min-width: 11ch;
  padding-top: 0.45rem;
`;

const EntryBody = styled.div`
  h3 {
    font-size: clamp(1.25rem, 2.2vw, 1.75rem);
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.2;
  }

  h4 {
    font-size: 0.95rem;
    font-weight: 400;
    color: var(--ink-soft);
    margin-top: 0.2rem;
  }

  p {
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--ink-soft);
    margin-top: 0.9rem;
    max-width: 62ch;
  }
`;

const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  margin-top: 1rem;

  li {
    font-family: var(--font-sans);
    font-size: var(--label);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    color: var(--ink-faint);
  }
`;

const StackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
`;

const StackGroup = styled.div`
  h4 {
    font-family: var(--font-sans);
    font-size: var(--label);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--ink-faint);
    padding-bottom: 0.7rem;
    border-bottom: 1px solid var(--rule);
    margin-bottom: 0.7rem;
  }

  ul {
    list-style: none;
  }

  li {
    font-size: 0.95rem;
    padding: 0.2rem 0;
  }
`;

const About = () => {
  const { translate } = useLanguage();

  return (
    <Page>
      <Shell>
        <PageHead>
          <PageTitle>
            <RevealText delay={0.05}>{translate("studio.about_title")}</RevealText>
          </PageTitle>
          <Lede>
            <RevealText delay={0.2} stagger={0.03}>
              {translate("studio.about_lede")}
            </RevealText>
          </Lede>
        </PageHead>

        <RevealBlock>
          <Portrait>
            <img src={HeroPortrait} alt="Juan Andrés Rojas" />
          </Portrait>
        </RevealBlock>

        <Section>
          <SectionLabel>{translate("studio.experience")}</SectionLabel>
          <div>
            {experiences.map((item) => (
              <RevealBlock key={item.id} y={24}>
                <Entry>
                  <EntryDate>{item.date}</EntryDate>
                  <EntryBody>
                    <h3>{item.role}</h3>
                    <h4>{item.company}</h4>
                    <Tags>
                      {(item.skills || []).map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </Tags>
                  </EntryBody>
                </Entry>
              </RevealBlock>
            ))}
          </div>
        </Section>

        <Section>
          <SectionLabel>{translate("studio.stack")}</SectionLabel>
          <StackGrid>
            {frameworks.map((group) => (
              <RevealBlock key={group.title} y={24}>
                <StackGroup>
                  <h4>{translate(group.title)}</h4>
                  <ul>
                    {(group.frameworks || []).map((skill) => (
                      <li key={skill.name}>{skill.name}</li>
                    ))}
                  </ul>
                </StackGroup>
              </RevealBlock>
            ))}
          </StackGrid>
        </Section>

        <Section>
          <SectionLabel>{translate("studio.education")}</SectionLabel>
          <div>
            {education.map((item) => (
              <RevealBlock key={item.id} y={24}>
                <Entry>
                  <EntryDate>{item.date}</EntryDate>
                  <EntryBody>
                    <h3>{item.school}</h3>
                    <h4>{item.degree}</h4>
                  </EntryBody>
                </Entry>
              </RevealBlock>
            ))}
          </div>
        </Section>
      </Shell>

    </Page>
  );
};

export default About;
