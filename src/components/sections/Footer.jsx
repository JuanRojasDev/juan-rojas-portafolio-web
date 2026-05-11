import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Bio } from "../../data/constants";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GmailIcon from "@mui/icons-material/Mail";
import { useLanguage } from "../../context/LanguageContext";

// ─── Styled Components ───

const FooterContainer = styled.footer`
  width: 100%;
  padding: 2.5rem 0 1.5rem;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  /* Orange + purple gradient border-top — original identity */
  border-top: 1px solid transparent;
  background-image:
    linear-gradient(${({ theme }) => theme.bg}, ${({ theme }) => theme.bg}),
    linear-gradient(90deg, rgba(255,127,0,0.5), rgba(133,76,230,0.5), rgba(255,127,0,0.3));
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 1rem 24px;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.div`
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.02em;
  font-family: var(--font-sans);

  .bracket {
    color: ${({ theme }) => theme.primary};
    font-family: var(--font-mono);
    font-weight: 300;
    font-size: 26px;
  }
  .slash {
    color: ${({ theme }) => theme.primary};
    font-family: var(--font-mono);
    font-weight: 300;
  }
  .name {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 0.25rem;
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  flex-wrap: wrap;
`;

const NavLink = styled(motion.button)`
  background: none;
  border: none;
  font-family: var(--font-sans);
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: rgba(255, 127, 0, 0.08);
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 5px 10px;
  }
`;

const SocialRow = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 8px;
`;

const SocialIcon = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text_secondary};
  background: rgba(255, 255, 255, 0.04);
  /* Each icon gets a subtle purple border by default */
  border: 1px solid rgba(133, 76, 230, 0.20);
  transition: all 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: rgba(255, 127, 0, 0.08);
    border-color: rgba(255, 127, 0, 0.35);
    box-shadow: 0 0 16px rgba(255, 127, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 600px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(133,76,230,0.3),
    rgba(255,127,0,0.3),
    transparent
  );
  margin: 4px 0;
`;

const Copyright = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
`;

// ─── Nav sections ───
const NAV_SECTIONS = [
  { key: "about",      id: "About" },
  { key: "skills",     id: "Skills" },
  { key: "experience", id: "Experience" },
  { key: "projects",   id: "Projects" },
  { key: "education",  id: "Education" },
];

// ─── Component ───
const Footer = () => {
  const { translate } = useLanguage();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>
          <span className="bracket">&lt;</span>
          <span className="name">Juan</span>
          <span className="slash">/</span>
          <span className="name">Rojas</span>
          <span className="bracket">&gt;</span>
        </Logo>

        <Nav>
          {NAV_SECTIONS.map(({ key, id }) => (
            <NavLink
              key={id}
              onClick={() => scrollTo(id)}
              whileTap={{ scale: 0.95 }}
            >
              {translate(key)}
            </NavLink>
          ))}
        </Nav>

        <SocialRow>
          <SocialIcon
            href={Bio.github}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }}
            aria-label="GitHub"
          >
            <GithubIcon fontSize="inherit" />
          </SocialIcon>
          <SocialIcon
            href={Bio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }}
            aria-label="LinkedIn"
          >
            <LinkedInIcon fontSize="inherit" />
          </SocialIcon>
          <SocialIcon
            href={Bio.gmail}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }}
            aria-label="Email"
          >
            <GmailIcon fontSize="inherit" />
          </SocialIcon>
        </SocialRow>

        <Divider />

        <Copyright>© 2026 Juan Andres Rojas. All rights reserved.</Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
