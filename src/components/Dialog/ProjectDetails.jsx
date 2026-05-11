import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { CloseRounded } from "@mui/icons-material";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useLanguage } from "../../context/LanguageContext";

// ─── Styled Components ───

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.80);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 12px;
`;

const Wrapper = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  border-radius: 20px;
  margin: 0 auto;
  height: min-content;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 127, 0, 0.08);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 127, 0, 0.6), transparent);
    border-radius: 20px 20px 0 0;
  }
`;

const CloseBtn = styled(motion.button)`
  position: absolute;
  top: 12px;
  right: 16px;
  background: rgba(255, 127, 0, 0.08);
  border: 1px solid rgba(255, 127, 0, 0.2);
  border-radius: 9999px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    background: rgba(255, 127, 0, 0.15);
    border-color: rgba(255, 127, 0, 0.4);
    color: ${({ theme }) => theme.primary};
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  max-height: 280px;
`;

const Title = styled.div`
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 10px 6px 0;
  letter-spacing: -0.02em;

  @media only screen and (max-width: 600px) {
    font-size: 1.2rem;
    margin: 8px 6px 0;
  }
`;

const Date = styled.div`
  font-size: 13px;
  margin: 4px 6px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  font-family: var(--font-mono);
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  gap: 6px;
`;

const Tag = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin: 0;
  padding: 4px 10px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary + "18"};
  border: 1px solid ${({ theme }) => theme.primary + "30"};
  font-family: var(--font-mono);

  @media only screen and (max-width: 600px) {
    font-size: 11px;
  }
`;

const Desc = styled.div`
  font-size: clamp(0.875rem, 1.3vw, 0.95rem);
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + "EE"};
  margin: 10px 6px;
  line-height: 1.7;

  @media only screen and (max-width: 600px) {
    font-size: 0.875rem;
    margin: 8px 6px;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 10px 6px 6px;
  letter-spacing: -0.01em;

  @media only screen and (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const Members = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;
  margin: 8px 6px 14px;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MemberImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid rgba(255, 127, 0, 0.25);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 600px) {
    width: 36px;
    height: 36px;
  }
`;

const MemberName = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  width: 200px;
  color: ${({ theme }) => theme.text_primary};

  @media only screen and (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

const MemberLink = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  transition: color 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 14px 0 0;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled(motion.a)`
  width: 100%;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  ${({ $dull, theme }) =>
    $dull
      ? `
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: ${theme.text_secondary};
    &:hover {
      background: rgba(255,255,255,0.10);
      color: ${theme.text_primary};
    }
  `
      : `
    background: linear-gradient(225deg, hsla(18, 100%, 33%, 1) 0%, hsla(41, 100%, 40%, 1) 100%);
    box-shadow: 0 4px 16px rgba(255, 127, 0, 0.3);
    &:hover {
      box-shadow: 0 8px 28px rgba(255, 127, 0, 0.5);
      filter: brightness(1.08);
    }
  `}

  @media only screen and (max-width: 600px) {
    font-size: 13px;
  }
`;

// ─── Component ───
const ProjectDetails = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;
  const { translate } = useLanguage();

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpenModal({ state: false, project: null });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setOpenModal]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      {openModal.state && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget)
              setOpenModal({ state: false, project: null });
          }}
        >
          <Wrapper
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <CloseBtn
              onClick={() => setOpenModal({ state: false, project: null })}
              whileTap={{ scale: 0.9 }}
              aria-label="Cerrar"
            >
              <CloseRounded style={{ fontSize: 18 }} />
            </CloseBtn>

            <Image src={project?.image} alt={project?.title} />
            <Title>{project?.title}</Title>
            <Date>{translate(`project_details.${project.id}.date`)}</Date>

            <Tags>
              {project?.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>

            <Desc>{translate(`project_details.${project.id}.description`)}</Desc>

            {project.member && project.member.length > 0 && (
              <>
                <Label>{translate("members")}</Label>
                <Members>
                  {project.member.map((member, index) => (
                    <Member key={index}>
                      <MemberImage src={member.img} alt={member.name} loading="lazy" />
                      <MemberName>{member.name}</MemberName>
                      {member.github && (
                        <MemberLink href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                          <GithubIcon style={{ fontSize: 20 }} />
                        </MemberLink>
                      )}
                      {member.linkedin && (
                        <MemberLink href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <LinkedInIcon style={{ fontSize: 20 }} />
                        </MemberLink>
                      )}
                    </Member>
                  ))}
                </Members>
              </>
            )}

            <ButtonGroup>
              <Button
                $dull
                href={project?.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {translate("go_to_code")}
              </Button>
              <Button
                href={project?.webapp}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {translate("go_to_live_app")}
              </Button>
            </ButtonGroup>
          </Wrapper>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetails;
