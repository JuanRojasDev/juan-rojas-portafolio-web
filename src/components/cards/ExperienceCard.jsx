import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { useLanguage } from "../../context/LanguageContext";

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;
const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Role = styled.div`
  font-size: 18px;
  font-weight: 600px;
  color: ${({ theme }) => theme.text_primary + 99};

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const Company = styled.div`
  font-size: 14px;
  font-weight: 500px;
  color: ${({ theme }) => theme.text_secondary + 99};

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Date = styled.div`
  font-size: 12px;
  font-weight: 400px;
  color: ${({ theme }) => theme.text_secondary + 80};

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
const Grade = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;
const Skills = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-top: -10px;
`;
const Skill = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ExperienceCard = ({ experience }) => {
  const { translate } = useLanguage();
  const [translatedExperience, setTranslatedExperience] = useState(null);

  useEffect(() => {
    const translateExperience = async () => {
      const skills = Array.isArray(experience.skills) ? experience.skills : [];

      const translated = {
        ...experience,
        role: translate(`experience_${experience.id}_role`),
        company: translate(`experience_${experience.id}_company`),
        date: translate(`experience_${experience.id}_date`),
        desc: translate(`experience_${experience.id}_desc`),
        skills: skills.map((skill) => translate(skill)),
      };

      setTranslatedExperience(translated);
    };

    translateExperience();
  }, [experience, translate]);

  if (!translatedExperience) {
    return <div>Loading...</div>;
  }

  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={translatedExperience.school}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={translatedExperience.img}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "#1d1836",
        color: "#fff",
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: "rgba(17, 25, 40, 0.83)",
        border: "1px solid rgba(255, 255, 255, 0.125)",
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid  rgba(255, 255, 255, 0.3)",
      }}
      date={translatedExperience.date}
    >
      <Top>
        <Image src={translatedExperience.img} />
        <Body>
          <Role>{translatedExperience.role}</Role>
          <Company>{translatedExperience.company}</Company>
          <Date>{translatedExperience.date}</Date>
        </Body>
      </Top>
      <Description>
        {translatedExperience?.desc && <Span>{translatedExperience.desc}</Span>}
        {translatedExperience?.skills.length > 0 && (
          <>
            <br />
            <Skills>
              <b>{translate("skills")}:</b>
              <ItemWrapper>
                {translatedExperience?.skills?.map((skill, index) => (
                  <Skill key={index}>• {skill}</Skill>
                ))}
              </ItemWrapper>
            </Skills>
          </>
        )}
      </Description>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;