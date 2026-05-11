import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ExperienceCard from "../cards/ExperienceCard";
import { useLanguage } from "../../context/LanguageContext";
import { experiences } from "../../data/constants";

// ─── Styled Components ───

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 0 16px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

const Title = styled(motion.div)`
  font-size: clamp(2rem, 4vw, 3.2rem);
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: clamp(1.8rem, 6vw, 2.4rem);
  }
`;

const Desc = styled(motion.div)`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 700px;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

// ─── Component ───
const Experience = () => {
  const { translate } = useLanguage();

  return (
    <Container id="Experience">
      <Wrapper>
        <Title
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {translate("experience_title")}
        </Title>
        <Desc
          style={{ marginBottom: "40px" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {translate("experience_desc")}
        </Desc>

        <VerticalTimeline>
          {experiences.map((experience) => (
            <ExperienceCard
              key={`experience-${experience.id}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </Wrapper>
    </Container>
  );
};

export default Experience;
