import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useLanguage } from "../../context/LanguageContext";

// ─── Styled Components ───

const Card = styled(motion.div)`
  width: 330px;
  min-height: 490px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: box-shadow 0.4s ease, border-color 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.06);

  &:hover {
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 127, 0, 0.15);
    border-color: rgba(255, 127, 0, 0.2);
    filter: brightness(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.03);
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + "18"};
  border: 1px solid ${({ theme }) => theme.primary + "30"};
  padding: 3px 10px;
  border-radius: 10px;
  font-family: var(--font-mono);
  transition: background 0.2s ease, border-color 0.2s ease;

  ${Card}:hover & {
    background-color: ${({ theme }) => theme.primary + "25"};
    border-color: ${({ theme }) => theme.primary + "50"};
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0 2px;
`;

const Title = styled.div`
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  margin-top: 3px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + "99"};
  font-family: var(--font-mono);

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  font-size: clamp(0.82rem, 1.1vw, 0.9rem);
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + "EE"};
  overflow: hidden;
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.6;
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: auto;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
  object-fit: cover;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1) translateY(-2px);
    z-index: 1;
  }
`;

// ─── Component ───
const ProjectCard = ({ project, setOpenModal }) => {
  const { translate } = useLanguage();

  return (
    <Tilt
      options={{
        max: 12,
        scale: 1.04,
        speed: 400,
        glare: true,
        "max-glare": 0.12,
      }}
    >
      <Card
        onClick={() => setOpenModal({ state: true, project })}
        whileTap={{ scale: 0.98 }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpenModal({ state: true, project })}
        aria-label={`Ver detalles del proyecto ${project.title}`}
      >
        <Image src={project.image} alt={project.title} loading="lazy" />

        <Tags>
          {project.tags?.slice(0, 5).map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>

        <Details>
          <Title>{project.title}</Title>
          <Date>{translate(`project_details.${project.id}.date`)}</Date>
          <Description>
            {translate(`project_details.${project.id}.description`)}
          </Description>
        </Details>

        <Members>
          {project.member?.map((member, i) => (
            <Avatar
              key={i}
              src={member.img}
              alt={member.name || "Member"}
              loading="lazy"
            />
          ))}
        </Members>
      </Card>
    </Tilt>
  );
};

export default ProjectCard;
