import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useLanguage } from "../../context/LanguageContext";

// ─── Keyframes ───
const borderRotate = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const iconFloat = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-5px) rotate(3deg); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
`;

// ─── Layout ───
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 16px;

  /* Ambient purple glow behind section */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(133,76,230,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  z-index: 1;
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
  color: ${({ theme }) => theme.text_secondary};
  max-width: 600px;
  line-height: 1.75;
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  gap: 40px;
  justify-content: center;
`;

// Card with animated gradient border
const CardOuter = styled.div`
  position: relative;
  border-radius: 18px;
  padding: 2px; /* border thickness */
  background: linear-gradient(
    135deg,
    rgba(255,127,0,0.6),
    rgba(133,76,230,0.4),
    rgba(255,127,0,0.2),
    rgba(133,76,230,0.6)
  );
  background-size: 300% 300%;
  animation: ${borderRotate} 5s ease infinite;
  width: 100%;
  max-width: 500px;
  box-shadow:
    0 0 30px rgba(255,127,0,0.12),
    0 0 60px rgba(133,76,230,0.08);
  transition: box-shadow 0.4s ease;

  &:hover {
    box-shadow:
      0 0 40px rgba(255,127,0,0.25),
      0 0 80px rgba(133,76,230,0.15);
  }

  @media (max-width: 768px) { max-width: 400px; }
  @media (max-width: 500px) { max-width: 340px; }
`;

const CardInner = styled(motion.div)`
  background: rgba(17, 25, 40, 0.92);
  border-radius: 16px;
  padding: 28px 32px;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;

  /* Shimmer sweep on hover */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.04),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover::after { left: 150%; }

  @media (max-width: 768px) { padding: 18px 24px; }
`;

// Card header with floating icon
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
`;

const CardIconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255,127,0,0.15), rgba(133,76,230,0.10));
  border: 1px solid rgba(255,127,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: ${iconFloat} 3s ease-in-out infinite;
  box-shadow: 0 0 16px rgba(255,127,0,0.15);
`;

const CardIconImg = styled.img`
  width: 28px;
  height: 28px;
`;

const SkillTitle = styled.div`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.02em;
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 8px;
`;

const SkillItem = styled(motion.div)`
  font-size: clamp(0.82rem, 1.2vw, 0.92rem);
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 10px;
  padding: 11px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 420px;
  min-height: 52px;
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease,
              box-shadow 0.25s ease;

  /* Shimmer on hover */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,127,0,0.06),
      transparent
    );
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: rgba(255, 127, 0, 0.45);
    background: rgba(255, 127, 0, 0.05);
    color: ${({ theme }) => theme.text_primary};
    box-shadow: 0 0 16px rgba(255,127,0,0.12), inset 0 0 12px rgba(255,127,0,0.04);

    &::before {
      opacity: 1;
      animation: ${shimmer} 1.2s ease infinite;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 9px 12px;
    min-height: auto;
  }
`;

const SkillImage = styled.img`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  ${SkillItem}:hover & { opacity: 1; }
`;

// ─── Animation variants ───
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

// ─── Component ───
const Skills = () => {
  const { translate } = useLanguage();

  const skillGroups = [
    {
      title: translate("technical_skills"),
      icon: "https://cdn-icons-png.flaticon.com/512/11532/11532626.png",
      items: [
        translate("skill_1"),
        translate("skill_2"),
        translate("skill_3"),
        translate("skill_4"),
        translate("skill_5"),
      ],
    },
    {
      title: translate("soft_skills"),
      icon: "https://cdn-icons-png.flaticon.com/512/3062/3062533.png",
      items: [
        translate("soft_skill_1"),
        translate("soft_skill_2"),
        translate("soft_skill_3"),
        translate("soft_skill_4"),
        translate("soft_skill_5"),
      ],
    },
  ];

  return (
    <Container id="Skills">
      <Wrapper>
        <Title
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {translate("skills")}
        </Title>
        <Desc
          style={{ marginBottom: "40px" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {translate("skill_desc")}
        </Desc>

        <motion.div
          style={{ width: "100%" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <SkillsContainer>
            {skillGroups.map((group, index) => (
              <Tilt
                key={`skill-${index}`}
                options={{
                  max: 10,
                  scale: 1.02,
                  speed: 450,
                  glare: true,
                  "max-glare": 0.08,
                }}
              >
                <CardOuter>
                  <CardInner variants={cardVariants}>
                    <CardHeader>
                      <CardIconWrapper>
                        <CardIconImg src={group.icon} alt="" aria-hidden="true" />
                      </CardIconWrapper>
                      <SkillTitle>{group.title}</SkillTitle>
                    </CardHeader>

                    <SkillList>
                      {group.items.map((item, j) => (
                        <SkillItem
                          key={`skill-item-${j}`}
                          variants={itemVariants}
                          whileHover={{ scale: 1.015, x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <SkillImage src={group.icon} alt="" aria-hidden="true" />
                          {item}
                        </SkillItem>
                      ))}
                    </SkillList>
                  </CardInner>
                </CardOuter>
              </Tilt>
            ))}
          </SkillsContainer>
        </motion.div>

        <Desc style={{ marginBottom: "40px" }} />
      </Wrapper>
    </Container>
  );
};

export default Skills;
