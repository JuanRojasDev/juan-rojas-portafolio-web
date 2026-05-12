import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { useLanguage } from "../../context/LanguageContext";

// ─── Styled Components ───

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;

  /* Left accent bar */
  &::before {
    content: '';
    position: absolute;
    left: -32px;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 3px;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.primary} 0%,
      rgba(133,76,230,0.5) 100%
    );
    opacity: 0.6;
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
  align-items: flex-start;
`;

const CompanyLogo = styled.img`
  height: 52px;
  width: 52px;
  border-radius: 12px;
  object-fit: cover;
  border: 1.5px solid rgba(255, 127, 0, 0.25);
  flex-shrink: 0;
  background: rgba(255,255,255,0.04);

  @media only screen and (max-width: 768px) {
    height: 40px;
    width: 40px;
    border-radius: 10px;
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const Role = styled.div`
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.02em;
  line-height: 1.3;

  @media only screen and (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const CompanyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 3px;
`;

const Company = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};

  @media only screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const DateBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_tertiary};
  font-family: var(--font-mono);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 2px 8px;
  border-radius: 9999px;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255,127,0,0.3),
    rgba(133,76,230,0.2),
    transparent
  );
`;

const Description = styled.p`
  font-size: clamp(0.84rem, 1.2vw, 0.93rem);
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;

  @media only screen and (max-width: 768px) {
    font-size: 0.84rem;
  }
`;

const SkillsSection = styled.div``;

const SkillsLabel = styled.div`
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_tertiary};
  font-family: var(--font-mono);
  margin-bottom: 8px;
`;

const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const SkillTag = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: rgba(255, 127, 0, 0.08);
  border: 1px solid rgba(255, 127, 0, 0.20);
  border-radius: 9999px;
  padding: 3px 10px;
  font-family: var(--font-mono);
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  cursor: default;

  &:hover {
    background: rgba(255, 127, 0, 0.16);
    border-color: rgba(255, 127, 0, 0.45);
    color: ${({ theme }) => theme.primaryLight};
  }
`;

// ─── Component ───
const ExperienceCard = ({ experience }) => {
  const { translate } = useLanguage();
  const [translated, setTranslated] = useState(null);

  useEffect(() => {
    const skills = Array.isArray(experience.skills) ? experience.skills : [];
    setTranslated({
      ...experience,
      role:    translate(`experience_${experience.id}_role`),
      company: translate(`experience_${experience.id}_company`),
      date:    translate(`experience_${experience.id}_date`),
      desc:    translate(`experience_${experience.id}_desc`),
      skills,
    });
  }, [experience, translate]);

  if (!translated) return null;

  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={translated.company}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            animation: "glowPulse 3s ease-in-out infinite",
          }}
          src={translated.img}
        />
      }
      contentStyle={{
        background: "rgba(17, 25, 40, 0.88)",
        color: "#F2F3F4",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,127,0,0.10)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "14px",
        backdropFilter: "blur(16px)",
        padding: "20px 24px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(255, 127, 0, 0.35)",
      }}
      date={translated.date}
    >
      <CardWrap>
        <Top>
          <CompanyLogo
            src={translated.img}
            alt={translated.company}
            loading="lazy"
          />
          <Info>
            <Role>{translated.role}</Role>
            <CompanyRow>
              <Company>{translated.company}</Company>
              <DateBadge>{translated.date}</DateBadge>
            </CompanyRow>
          </Info>
        </Top>

        <Divider />

        <Description>{translated.desc}</Description>

        {translated.skills.length > 0 && (
          <SkillsSection>
            <SkillsLabel>{translate("skills")}</SkillsLabel>
            <SkillsRow>
              {translated.skills.map((skill, i) => (
                <SkillTag key={i}>{skill}</SkillTag>
              ))}
            </SkillsRow>
          </SkillsSection>
        )}
      </CardWrap>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
