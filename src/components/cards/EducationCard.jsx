import React from "react";
import styled from "styled-components";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { useLanguage } from "../../context/LanguageContext";

// ─── Styled Components ───

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const Image = styled.img`
  height: 52px;
  width: 52px;
  border-radius: 10px;
  margin-top: 4px;
  object-fit: cover;
  border: 1px solid rgba(255, 127, 0, 0.2);

  @media only screen and (max-width: 768px) {
    height: 40px;
    width: 40px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.01em;

  @media only screen and (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Degree = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};

  @media only screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Date = styled.div`
  font-size: 0.78rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  font-family: var(--font-mono);

  @media only screen and (max-width: 768px) {
    font-size: 0.72rem;
  }
`;

const GradeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(255, 127, 0, 0.08);
  border: 1px solid rgba(255, 127, 0, 0.25);
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  font-family: var(--font-mono);
  width: fit-content;
`;

const Description = styled.div`
  font-size: clamp(0.85rem, 1.2vw, 0.95rem);
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + "EE"};
  margin-bottom: 10px;
  line-height: 1.65;

  @media only screen and (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const SkillLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillTag = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: rgba(255, 127, 0, 0.08);
  border: 1px solid rgba(255, 127, 0, 0.2);
  border-radius: 9999px;
  padding: 3px 10px;
  font-family: var(--font-mono);
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 127, 0, 0.15);
    border-color: rgba(255, 127, 0, 0.4);
  }
`;

// ─── Component ───
const EducationCard = ({ education }) => {
  const { translate } = useLanguage();

  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={education.school}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={education.img}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "rgba(17, 25, 40, 0.90)",
        color: "#F2F3F4",
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px, 0 0 0 1px rgba(255,127,0,0.08)",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        borderRadius: "12px",
        backdropFilter: "blur(12px)",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(255, 127, 0, 0.3)",
      }}
      date={education.date}
    >
      <Top>
        <Image src={education.img} alt={education.school} loading="lazy" />
        <Body>
          <Name>{translate(`education_school_${education.id}`)}</Name>
          <Degree>{translate(`education_degree_${education.id}`)}</Degree>
          <Date>{education.date}</Date>
        </Body>
      </Top>

      <GradeBadge>
        ✓ {translate("grade_label")}: {education.grade}
      </GradeBadge>

      <Description>
        {translate(`education_desc_${education.id}`)}
      </Description>

      {education.skills && education.skills.length > 0 && (
        <div>
          <SkillLabel>{translate("skills_label")}:</SkillLabel>
          <SkillsRow>
            {education.skills.map((_, i) => (
              <SkillTag key={i}>
                {translate(`skill_${education.id}_${i}`)}
              </SkillTag>
            ))}
          </SkillsRow>
        </div>
      )}
    </VerticalTimelineElement>
  );
};

export default EducationCard;
