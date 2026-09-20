import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useLanguage } from "../context/LanguageContext";
import { work } from "../data/work";
import { RevealText, RevealBlock } from "../components/studio/Reveal";
import { Link } from "react-router-dom";
import WorkList from "../components/studio/WorkList";
import Pill from "../components/studio/Pill";
import { Page, Shell, PageHead, PageTitle } from "../components/studio/Layout";

/* Fila de filtros a la izquierda y selector de vista a la derecha */
const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: clamp(1.75rem, 3.5vw, 2.75rem);
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 720px) {
    display: none;
  }
`;

/* Botones circulares del referente: 68px, el activo relleno en tinta */
const ViewButton = styled.button`
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid
    ${({ $active }) => ($active ? "transparent" : "var(--rule-solid)")};
  background: ${({ $active }) => ($active ? "var(--ink)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--paper-on-ink)" : "var(--ink)")};
  transition: background 0.4s var(--ease), color 0.4s var(--ease),
    border-color 0.4s var(--ease);

  &:hover {
    background: var(--ink);
    border-color: transparent;
    color: var(--paper-on-ink);
  }
`;

/* Vista en cuadrícula */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1.5rem, 3vw, 2.5rem);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: block;

  figure {
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: var(--paper-warm);
    border-radius: 12px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.8s var(--ease);
  }

  &:hover img {
    transform: scale(1.04);
  }

  h3 {
    margin-top: 1.1rem;
    font-size: clamp(1.3rem, 2.2vw, 1.8rem);
    font-weight: 450;
    letter-spacing: normal;
  }

  p {
    margin-top: 0.2rem;
    font-size: var(--body);
    color: var(--ink-soft);
  }
`;

const Count = styled.div`
  padding-bottom: var(--section);
  padding-top: 1.5rem;
  font-family: var(--font-sans);
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  color: var(--ink-faint);
`;

const Work = () => {
  const { language, translate } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("list");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(work.flatMap((p) => p.categories)))],
    []
  );

  const items = useMemo(
    () =>
      filter === "all"
        ? work
        : work.filter((p) => p.categories.includes(filter)),
    [filter]
  );

  return (
    <Page>
      <Shell>
        <PageHead>
          <PageTitle>
            <RevealText delay={0.05}>{translate("studio.work_title")}</RevealText>
          </PageTitle>
        </PageHead>

        <RevealBlock delay={0.2} y={20}>
          <FilterRow>
          <Filters>
            {categories.map((category) => (
              <Pill
                key={category}
                active={filter === category}
                count={
                  category === "all"
                    ? work.length
                    : work.filter((p) => p.categories.includes(category)).length
                }
                onClick={() => setFilter(category)}
              >
                {translate(`studio.cat_${category}`)}
              </Pill>
            ))}
          </Filters>

            <ViewToggle>
              <ViewButton
                $active={view === "list"}
                onClick={() => setView("list")}
                aria-label="Vista en lista"
                aria-pressed={view === "list"}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <g fill="currentColor">
                    <rect y="2" width="18" height="1.6" rx="0.8" />
                    <rect y="6.6" width="18" height="1.6" rx="0.8" />
                    <rect y="11.2" width="18" height="1.6" rx="0.8" />
                  </g>
                </svg>
              </ViewButton>

              <ViewButton
                $active={view === "grid"}
                onClick={() => setView("grid")}
                aria-label="Vista en cuadrícula"
                aria-pressed={view === "grid"}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <g fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="0.8" y="0.8" width="6.4" height="6.4" rx="1" />
                    <rect x="10.8" y="0.8" width="6.4" height="6.4" rx="1" />
                    <rect x="0.8" y="10.8" width="6.4" height="6.4" rx="1" />
                    <rect x="10.8" y="10.8" width="6.4" height="6.4" rx="1" />
                  </g>
                </svg>
              </ViewButton>
            </ViewToggle>
          </FilterRow>
        </RevealBlock>

        {/* La key fuerza el remontaje para que los revelados vuelvan a correr */}
        {view === "list" ? (
          <WorkList key={filter} items={items} />
        ) : (
          <Grid key={`grid-${filter}`}>
            {items.map((project, i) => (
              <RevealBlock key={project.slug} delay={i * 0.05} y={26}>
                <Card to={`/work/${project.slug}`} data-cursor="View">
                  <figure style={{ background: project.accent }}>
                    {project.gallery && project.gallery[0] && (
                      <img
                        src={project.gallery[0].src}
                        alt={project.gallery[0].alt}
                        loading="lazy"
                      />
                    )}
                  </figure>
                  <h3>{project.title}</h3>
                  <p>{project.role[language]}</p>
                </Card>
              </RevealBlock>
            ))}
          </Grid>
        )}

        <Count>
          {String(items.length).padStart(2, "0")} / {String(work.length).padStart(2, "0")}
        </Count>
      </Shell>
    </Page>
  );
};

export default Work;
