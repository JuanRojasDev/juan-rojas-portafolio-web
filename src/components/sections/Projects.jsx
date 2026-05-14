import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../../data/constants";
import { useLanguage } from "../../context/LanguageContext";

// ─── Layout ───
const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
  padding: 0 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Title = styled(motion.div)`
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  text-align: center;
  font-weight: 800;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.03em;

  @media (max-width: 768px) {
    font-size: clamp(1.9rem, 6vw, 2.6rem);
  }
`;

const Desc = styled(motion.div)`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 700px;
  line-height: 1.75;
`;

// ─── Filter tabs ───
const FilterRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  margin: 20px 0 36px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0;
    background: transparent;
    border: none;
  }
`;

const FilterBtn = styled(motion.button)`
  position: relative;
  padding: 8px 20px;
  border-radius: 10px;
  border: none;
  background: none;
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ $active, theme }) => $active ? "#fff" : theme.text_secondary};
  transition: color 0.2s ease;
  z-index: 1;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover { color: ${({ theme }) => theme.text_primary}; }

  @media (max-width: 768px) {
    display: none;
  }
`;

const FilterIndicator = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primaryDark});
  box-shadow: 0 4px 16px rgba(255,127,0,0.35);
  z-index: 0;
`;

// ─── Mobile Custom Dropdown ───
const MobileDropdownWrapper = styled.div`
  display: none;
  position: relative;
  width: 100%;
  max-width: 100%;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileDropdownButton = styled(motion.button)`
  width: 100%;
  min-width: 280px;
  padding: 14px 20px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background: rgba(255, 127, 0, 0.15);
  border: 2px solid rgba(255, 127, 0, 0.5);
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 127, 0, 0.22);
    border-color: rgba(255, 127, 0, 0.7);
  }

  svg {
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    flex-shrink: 0;
  }
`;

const MobileDropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  min-width: 280px;
  background: #1e1e2d;
  border: 2px solid rgba(255, 127, 0, 0.4);
  border-radius: 12px;
  overflow: hidden;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

const MobileDropdownOption = styled(motion.button)`
  width: 100%;
  padding: 14px 20px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 700;
  color: ${({ $active }) => $active ? '#FF7F00' : '#fff'};
  background: ${({ $active }) => $active ? 'rgba(255, 127, 0, 0.15)' : 'transparent'};
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 127, 0, 0.12);
    color: #FF7F00;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

// ─── Bento grid ───
// First project is featured (large), rest are standard
const BentoGrid = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Project card ───
const CardRoot = styled(motion.article)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.card};
  border: 1px solid rgba(255, 255, 255, 0.06);
  aspect-ratio: ${({ $featured }) => $featured ? "16/9" : "4/3"};
  grid-column: ${({ $featured }) => $featured ? "1 / -1" : "auto"};

  @media (max-width: 560px) {
    grid-column: 1;
    aspect-ratio: 4/3;
  }
`;

const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              filter 0.6s ease;
  filter: brightness(0.55) saturate(0.9);

  ${CardRoot}:hover & {
    transform: scale(1.06);
    filter: brightness(0.35) saturate(0.7);
  }
`;

// Gradient overlay — always present, deepens on hover
const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 20%,
    rgba(9, 9, 23, 0.5) 60%,
    rgba(9, 9, 23, 0.92) 100%
  );
  transition: opacity 0.4s ease;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: translateY(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;
`;

const CardTag = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  background: rgba(255, 127, 0, 0.15);
  border: 1px solid rgba(255, 127, 0, 0.3);
  padding: 2px 8px;
  border-radius: 9999px;
  font-family: var(--font-mono);
  backdrop-filter: blur(4px);
`;

const CardTitle = styled.h3`
  font-size: ${({ $featured }) => $featured ? "clamp(1.3rem, 2.5vw, 1.8rem)" : "clamp(1rem, 1.5vw, 1.15rem)"};
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
`;

const CardDate = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  font-family: var(--font-mono);
`;

const CardDesc = styled.p`
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.75);
  display: -webkit-box;
  -webkit-line-clamp: ${({ $featured }) => $featured ? 3 : 2};
  -webkit-box-orient: vertical;
  overflow: hidden;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.35s ease 0.15s, transform 0.35s ease 0.15s;
`;

const CardMembers = styled.div`
  display: flex;
  align-items: center;
`;

const MemberAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  margin-left: -8px;
  object-fit: cover;
  &:first-child { margin-left: 0; }
`;

const ViewBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  background: rgba(255,127,0,0.12);
  border: 1px solid rgba(255,127,0,0.25);
  padding: 5px 12px;
  border-radius: 9999px;
  backdrop-filter: blur(8px);
`;

// Category badge top-right
const CategoryBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(9,9,23,0.7);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.7);
  backdrop-filter: blur(8px);
  font-family: var(--font-mono);
`;

// ─── Animation variants ───
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ─── Filter config ───
const FILTERS = [
  { key: "all",              label: "all" },
  { key: "web app",          label: "web_apps" },
  { key: "mobile app",      label: "android_apps" },
  { key: "machine learning", label: "machine_learning" },
];

// ─── Component ───
const Projects = ({ openModal, setOpenModal }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { translate } = useLanguage();

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleFilterChange = (key) => {
    setActiveFilter(key);
    setDropdownOpen(false);
  };

  const activeFilterLabel = FILTERS.find(f => f.key === activeFilter)?.label || "all";

  return (
    <Container id="Projects">
      <Wrapper>
        <Title
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {translate("projects_title")}
        </Title>
        <Desc
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {translate("projects_desc")}
        </Desc>

        {/* Filter tabs - Desktop */}
        <FilterRow
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {FILTERS.map(({ key, label }) => (
            <FilterBtn
              key={key}
              $active={activeFilter === key}
              onClick={() => setActiveFilter(key)}
              whileTap={{ scale: 0.96 }}
            >
              {activeFilter === key && (
                <FilterIndicator
                  layoutId="proj-filter"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>
                {translate(label)}
              </span>
            </FilterBtn>
          ))}
          
          {/* Mobile Custom Dropdown */}
          <MobileDropdownWrapper>
            <MobileDropdownButton
              $isOpen={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              whileTap={{ scale: 0.98 }}
            >
              <span>{translate(activeFilterLabel)}</span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#FF7F00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MobileDropdownButton>
            
            <AnimatePresence>
              {dropdownOpen && (
                <MobileDropdownMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {FILTERS.map(({ key, label }) => (
                    <MobileDropdownOption
                      key={key}
                      $active={activeFilter === key}
                      onClick={() => handleFilterChange(key)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {translate(label)}
                    </MobileDropdownOption>
                  ))}
                </MobileDropdownMenu>
              )}
            </AnimatePresence>
          </MobileDropdownWrapper>
        </FilterRow>

        {/* Bento grid */}
        <AnimatePresence mode="wait">
          <BentoGrid
            key={activeFilter}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filtered.map((project, idx) => {
              const isFeatured = idx === 0 && activeFilter === "all";
              return (
                <CardRoot
                  key={project.id}
                  $featured={isFeatured}
                  variants={cardVariants}
                  onClick={() => setOpenModal({ state: true, project })}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setOpenModal({ state: true, project })}
                  aria-label={`Ver proyecto ${project.title}`}
                >
                  <CardImage
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />
                  <CardOverlay />

                  <CategoryBadge>{project.category}</CategoryBadge>

                  <CardContent>
                    <CardTags>
                      {project.tags?.slice(0, isFeatured ? 5 : 3).map((tag, i) => (
                        <CardTag key={i}>{tag}</CardTag>
                      ))}
                    </CardTags>

                    <CardTitle $featured={isFeatured}>{project.title}</CardTitle>
                    <CardDate>
                      {translate(`project_details.${project.id}.date`)}
                    </CardDate>

                    <CardDesc $featured={isFeatured}>
                      {translate(`project_details.${project.id}.description`)}
                    </CardDesc>

                    <CardFooter>
                      <CardMembers>
                        {project.member?.slice(0, 3).map((m, i) => (
                          <MemberAvatar key={i} src={m.img} alt={m.name} loading="lazy" />
                        ))}
                      </CardMembers>
                      <ViewBtn>
                        Ver más →
                      </ViewBtn>
                    </CardFooter>
                  </CardContent>
                </CardRoot>
              );
            })}
          </BentoGrid>
        </AnimatePresence>
      </Wrapper>
    </Container>
  );
};

export default Projects;
