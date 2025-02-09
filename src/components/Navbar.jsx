import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";
import { useLanguage } from "../context/LanguageContext";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const ColorText = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 32px;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled.a`
  display: flex;
  align-items: center;
  width: 80%;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  text-transform: none; // Asegúrate de que no haya transformación de texto
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;

  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const LanguageDropdown = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-align: center;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.bg};
  min-width: 60px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${LanguageDropdown}:hover & {
    display: block;
  }

  a {
    color: ${({ theme }) => theme.text_primary};
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.text_primary};
    }
  }
`;

const LanguageButton = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  margin-right: 2px;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { language, setLanguage, translate } = useLanguage();

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsLanguageOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      navigate(`${sectionId}`);
    }
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo href="">
          <ColorText>&lt;</ColorText>Juan
          <div style={{ color: theme.primary }}>/</div>Rojas
          <ColorText>&gt;</ColorText>
        </NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems>
          <NavLink onClick={() => scrollToSection("About")}>{translate("about")}</NavLink>
          <NavLink onClick={() => scrollToSection("Skills")}>{translate("skills")}</NavLink>
          <NavLink onClick={() => scrollToSection("Experience")}>{translate("experience")}</NavLink>
          <NavLink onClick={() => scrollToSection("Projects")}>{translate("projects")}</NavLink>
          <NavLink onClick={() => scrollToSection("Education")}>{translate("education")}</NavLink>

          <LanguageDropdown>
            <LanguageButton>
              <img src={translate("language_icon")} style={{ width: "20px", height: "20px" }} />
              <span style={{ marginLeft: "2px" }}>▼</span>
            </LanguageButton>
            <DropdownContent>
              <NavLink onClick={() => handleLanguageChange("es")}>
                <img src="https://em-content.zobj.net/source/apple/129/flag-for-spain_1f1ea-1f1f8.png" style={{ width: "20px", height: "20px" }} />
              </NavLink>
              <NavLink onClick={() => handleLanguageChange("en")}>
                <img src="https://em-content.zobj.net/source/apple/129/flag-for-united-states_1f1fa-1f1f8.png" style={{ width: "20px", height: "20px" }} />
              </NavLink>
            </DropdownContent>
          </LanguageDropdown>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => { setIsOpen(!isOpen); scrollToSection("About"); }}>{translate("about")}</NavLink>
            <NavLink onClick={() => { setIsOpen(!isOpen); scrollToSection("Skills"); }}>{translate("skills")}</NavLink>
            <NavLink onClick={() => { setIsOpen(!isOpen); scrollToSection("Experience"); }}>{translate("experience")}</NavLink>
            <NavLink onClick={() => { setIsOpen(!isOpen); scrollToSection("Projects"); }}>{translate("projects")}</NavLink>
            <NavLink onClick={() => { setIsOpen(!isOpen); scrollToSection("Education"); }}>{translate("education")}</NavLink>
            <NavLink onClick={() => setIsLanguageOpen(!isLanguageOpen)}>
              {translate("language")} <span style={{ marginLeft: "2px" }}>▼</span>
            </NavLink>
            {isLanguageOpen && (
              <>
                <NavLink onClick={() => handleLanguageChange("es")}>{translate("spanish")}</NavLink>
                <NavLink onClick={() => handleLanguageChange("en")}>{translate("english")}</NavLink>
              </>
            )}
            <GithubButton href={Bio.github} target="_Blank">
              {translate("github_profile")}
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          <GithubButton href={Bio.github} target="_Blank">
            {translate("github_profile")}
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;