import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { frameworks } from "../../data/constants";
import { useLanguage } from "../../context/LanguageContext";

// ─── Keyframes ───
const borderGlow = keyframes`
  0%, 100% { border-color: rgba(133,76,230,0.30); }
  50%       { border-color: rgba(255,127,0,0.40); }
`;

// ─── Layout ───
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 80px 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1100px;
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
    margin-top: 12px;
    font-size: clamp(1.9rem, 6vw, 2.6rem);
  }
`;

const Desc = styled(motion.div)`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  text-align: center;
  font-weight: 500;
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.75;
  margin-bottom: 40px;
`;

// ─── Uniform grid — all 5 cards same size, 3 cols ───
const CategoriesGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch;

  /* Tilt wrapper needs full height */
  .tilt-wrapper {
    height: 100%;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

// All cards — uniform size, same height via flex stretch
const CategoryCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary}33;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  /* Equal height — grid stretches all cards in a row */
  height: 100%;
  animation: ${borderGlow} 6s ease-in-out infinite;
  transition: box-shadow 0.35s ease;

  /* Top accent line */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $isAI }) =>
      $isAI
        ? `linear-gradient(90deg, transparent, rgba(133,76,230,0.8), rgba(255,127,0,0.6), transparent)`
        : `linear-gradient(90deg, transparent, rgba(255,127,0,0.5), rgba(133,76,230,0.4), transparent)`};
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  &:hover {
    box-shadow:
      0 4px 32px rgba(255,127,0,0.18),
      rgba(23,92,230,0.15) 0px 4px 24px;
    &::before { opacity: 1; }
  }

  /* AI card — purple accent only, same size */
  ${({ $isAI }) =>
    $isAI &&
    `
    border-color: rgba(133,76,230,0.35);
    background: linear-gradient(135deg, rgba(133,76,230,0.06) 0%, rgba(17,23,33,1) 60%);
    box-shadow: rgba(133,76,230,0.20) 0px 4px 24px;
    &:hover {
      box-shadow: 0 4px 32px rgba(133,76,230,0.30), rgba(133,76,230,0.20) 0px 4px 24px;
    }
  `}
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  width: 100%;
  justify-content: center;
`;

const CategoryBadge = styled.span`
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 9999px;
  font-family: var(--font-mono);
  background: ${({ $isAI, theme }) =>
    $isAI
      ? "rgba(133,76,230,0.15)"
      : "rgba(255,127,0,0.10)"};
  border: 1px solid ${({ $isAI, theme }) =>
    $isAI
      ? "rgba(133,76,230,0.35)"
      : "rgba(255,127,0,0.25)"};
  color: ${({ $isAI, theme }) =>
    $isAI ? theme.secondaryLight : theme.primary};
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const TechItem = styled(motion.div)`
  font-size: clamp(0.78rem, 1.1vw, 0.88rem);
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary + "CC"};
  border: 1px solid ${({ theme }) => theme.text_primary + "28"};
  border-radius: 9px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.02);
  position: relative;
  transition: border-color 0.22s ease, background 0.22s ease,
              color 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    border-color: ${({ $isAI, theme }) =>
      $isAI ? "rgba(133,76,230,0.55)" : theme.primary};
    background: ${({ $isAI }) =>
      $isAI ? "rgba(133,76,230,0.08)" : "rgba(255,127,0,0.07)"};
    color: ${({ theme }) => theme.text_primary};
    box-shadow: 0 0 10px ${({ $isAI }) =>
      $isAI ? "rgba(133,76,230,0.15)" : "rgba(255,127,0,0.12)"};
  }

  @media (max-width: 768px) {
    font-size: 0.82rem;
    padding: 7px 10px;
  }
`;

const TechImg = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex-shrink: 0;
  transition: transform 0.22s ease;

  ${TechItem}:hover & {
    transform: scale(1.18) rotate(-4deg);
  }
`;

// ─── Animation variants ───
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ─── Component ───
const Frameworks = () => {
  const { translate } = useLanguage();

  const categories = frameworks.map((f) => ({
    ...f,
    label: translate(f.title),
    isAI: f.title === "ai",
  }));

  return (
    <Container id="frameworks">
      <Wrapper>
        <Title
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {translate("frameworks_title")}
        </Title>
        <Desc
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {translate("frameworks_desc")}
        </Desc>

        <motion.div
          style={{ width: "100%" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <CategoriesGrid>
            {categories.map((cat, idx) => (
              <Tilt
                key={idx}
                className="tilt-wrapper"
                style={{ height: "100%" }}
                options={{
                  max: 9,
                  scale: 1.02,
                  speed: 450,
                  glare: true,
                  "max-glare": 0.07,
                }}
              >
                <CategoryCard
                  variants={cardVariants}
                  $isAI={cat.isAI}
                >
                  <CategoryHeader>
                    <CategoryBadge $isAI={cat.isAI}>
                      {cat.isAI ? "🤖 " : ""}{cat.label}
                    </CategoryBadge>
                  </CategoryHeader>

                  <TechList>
                    {cat.frameworks.map((item, j) => {
                      return (
                        <TechItem
                          key={j}
                          variants={itemVariants}
                          $isAI={cat.isAI}
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.18 }}
                        >
                          <TechImg
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                          {item.name}
                        </TechItem>
                      );
                    })}
                  </TechList>
                </CategoryCard>
              </Tilt>
            ))}
          </CategoriesGrid>
        </motion.div>
      </Wrapper>
    </Container>
  );
};

export default Frameworks;
