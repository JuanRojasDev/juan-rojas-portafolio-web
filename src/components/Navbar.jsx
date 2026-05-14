import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Bio } from "../data/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// ─── Nav root — fixed, full-width background ───
const NavRoot = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  pointer-events: none;
  /* Full-width background — completely transparent at top, solid when scrolled */
  background: ${({ $scrolled }) =>
    $scrolled
      ? "rgba(9, 9, 23, 0.92)"
      : "transparent"};
  backdrop-filter: ${({ $scrolled }) => 
    $scrolled ? "blur(28px) saturate(180%)" : "none"};
  -webkit-backdrop-filter: ${({ $scrolled }) => 
    $scrolled ? "blur(28px) saturate(180%)" : "none"};
  border-bottom: 1px solid ${({ $scrolled }) =>
    $scrolled ? "rgba(255,127,0,0.12)" : "transparent"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled
      ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,127,0,0.06)"
      : "none"};
  transition: all 0.4s ease;

  @media (max-width: 900px) {
    background: rgba(9, 9, 23, 0.94);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border-bottom: 1px solid rgba(255,127,0,0.12);
    box-shadow: 0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,127,0,0.06);
  }
`;

// The actual bar — inner container, transparent (NavRoot handles bg)
const NavBar = styled(motion.div)`
  pointer-events: all;
  width: 100%;
  max-width: 1200px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  margin: 0;
  background: transparent;
`;

// ─── Logo ───
const NavLogo = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.03em;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  padding: 0;
  flex-shrink: 0;
  font-family: var(--font-sans);
  line-height: 1;
  /* Equal width to NavRight so links are truly centered */
  flex: 0 0 auto;
  min-width: 160px;
`;

const LogoBracket = styled.span`
  color: ${({ theme }) => theme.primary};
  font-family: var(--font-mono);
  font-weight: 300;
  font-size: 26px;
  line-height: 1;
  opacity: 0.9;
`;

const LogoSlash = styled.span`
  color: ${({ theme }) => theme.primary};
  font-family: var(--font-mono);
  font-weight: 300;
  margin: 0 1px;
`;

// ─── Center nav links — use flex with flex:1 trick for true centering ───
const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2px;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  /* True centering: grow to fill space between logo and right */
  flex: 1;
  justify-content: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLinkItem = styled.li`
  position: relative;
`;

const NavLinkBtn = styled(motion.button)`
  background: none;
  border: none;
  font-family: var(--font-sans);
  font-size: 14.5px;
  font-weight: 500;
  color: ${({ $active, theme }) =>
    $active ? theme.primary : theme.text_secondary};
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 10px;
  transition: color 0.2s ease;
  white-space: nowrap;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.primaryLight};
  }
`;

// Animated underline indicator
const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2px;
  left: 16px;
  right: 16px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  box-shadow: 0 0 8px rgba(255, 127, 0, 0.6);
`;

// ─── Right side ───
const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  /* Mirror logo width so links stay centered */
  min-width: 160px;
  justify-content: flex-end;
`;

// ─── Language dropdown — premium ───
const LangWrapper = styled.div`
  position: relative;
`;

const LangBtn = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 13px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.03em;

  img {
    width: 16px;
    height: 16px;
    border-radius: 2px;
  }

  .chevron {
    font-size: 9px;
    opacity: 0.6;
    transition: transform 0.2s ease;
    transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    background: rgba(255, 127, 0, 0.08);
  }
`;

const LangDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(14, 14, 26, 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  overflow: hidden;
  min-width: 130px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,127,0,0.06);
  z-index: 200;
`;

const LangOption = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: ${({ $active, theme }) =>
    $active ? "rgba(255,127,0,0.10)" : "transparent"};
  border: none;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: ${({ $active, theme }) =>
    $active ? theme.primary : theme.text_secondary};
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;
  letter-spacing: 0.02em;

  img {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(255, 127, 0, 0.08);
    color: ${({ theme }) => theme.primaryLight};
  }

  .check {
    margin-left: auto;
    color: ${({ theme }) => theme.primary};
    font-size: 12px;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
  }
`;

// ─── GitHub button — premium ───
const GithubBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1.5px solid ${({ theme }) => theme.primary};
  background: transparent;
  color: ${({ theme }) => theme.primary};
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.25s ease, box-shadow 0.25s ease;

  /* Animated fill on hover */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primaryDark});
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:hover {
    color: #fff;
    box-shadow: 0 0 24px rgba(255, 127, 0, 0.45), 0 0 48px rgba(255, 127, 0, 0.15);
    &::before { opacity: 1; }
  }

  span, svg {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// ─── Mobile ───
const MobileMenuBtn = styled(motion.button)`
  display: none;
  background: rgba(255, 127, 0, 0.08);
  border: 1px solid rgba(255, 127, 0, 0.2);
  border-radius: 10px;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  position: relative;

  @media (max-width: 900px) {
    display: flex;
  }

  /* Animated hamburger to X */
  .menu-icon {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 18px;
    height: 14px;
    position: relative;
  }

  .menu-line {
    width: 100%;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  ${({ $open }) => $open && `
    .menu-line:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }
    .menu-line:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    .menu-line:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }
  `}
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(9, 9, 23, 0.97);
  backdrop-filter: blur(32px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 100px 36px 48px;
`;

const MobileNavBtn = styled(motion.button)`
  background: none;
  border: none;
  font-family: var(--font-sans);
  font-size: clamp(2rem, 8vw, 3rem);
  font-weight: 800;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 14px 0;
  text-align: left;
  letter-spacing: -0.03em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: color 0.2s ease;

  &:hover { color: ${({ theme }) => theme.primary}; }
`;

const MobileLangRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 36px;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const MobileLangBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 9999px;
  border: 1.5px solid ${({ $active, theme }) =>
    $active ? theme.primary : "rgba(255,255,255,0.10)"};
  background: ${({ $active, theme }) =>
    $active ? "rgba(255,127,0,0.10)" : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.primary : theme.text_secondary};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-sans);
  transition: all 0.2s ease;

  img { width: 20px; height: 20px; border-radius: 3px; }
`;

// ─── Sections ───
const NAV_SECTIONS = [
  { key: "about",      id: "About" },
  { key: "skills",     id: "Skills" },
  { key: "experience", id: "Experience" },
  { key: "projects",   id: "Projects" },
  { key: "education",  id: "Education" },
];

// ─── Component ───
const Navbar = () => {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [scrolled, setScrolled]         = useState(false);
  const [langOpen, setLangOpen]         = useState(false);
  const langRef                         = useRef(null);
  const { language, setLanguage, translate } = useLanguage();

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const y = window.scrollY + 100;
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i].id);
        if (el && el.offsetTop <= y) {
          setActiveSection(NAV_SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const toggleLang = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
    setMobileOpen(false);
  };

  const ES_FLAG = "https://em-content.zobj.net/source/apple/129/flag-for-spain_1f1ea-1f1f8.png";
  const EN_FLAG = "https://em-content.zobj.net/source/apple/129/flag-for-united-states_1f1fa-1f1f8.png";
  const currentFlag = language === "es" ? ES_FLAG : EN_FLAG;

  return (
    <>
      <NavRoot
        $scrolled={scrolled}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
      >
        <NavBar>
          {/* ── Logo ── */}
          <NavLogo
            onClick={() => scrollTo("About")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <LogoBracket>&lt;</LogoBracket>
            Juan
            <LogoSlash>/</LogoSlash>
            Rojas
            <LogoBracket>&gt;</LogoBracket>
          </NavLogo>

          {/* ── Centered nav links ── */}
          <NavLinks>
            {NAV_SECTIONS.map(({ key, id }) => {
              const isActive = activeSection === id;
              return (
                <NavLinkItem key={id}>
                  <NavLinkBtn
                    $active={isActive}
                    onClick={() => scrollTo(id)}
                    whileTap={{ scale: 0.94 }}
                  >
                    {translate(key)}
                    {isActive && (
                      <ActiveIndicator
                        layoutId="nav-active-indicator"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </NavLinkBtn>
                </NavLinkItem>
              );
            })}
          </NavLinks>

          {/* ── Right side ── */}
          <NavRight>
            {/* Language dropdown */}
            <LangWrapper ref={langRef}>
              <LangBtn
                $open={langOpen}
                onClick={() => setLangOpen((v) => !v)}
                whileTap={{ scale: 0.96 }}
                aria-label="Toggle language"
              >
                <img src={currentFlag} alt={language.toUpperCase()} />
                {language.toUpperCase()}
                <span className="chevron">▼</span>
              </LangBtn>

              <AnimatePresence>
                {langOpen && (
                  <LangDropdown
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <LangOption
                      $active={language === "es"}
                      onClick={() => toggleLang("es")}
                      whileTap={{ scale: 0.97 }}
                    >
                      <img src={ES_FLAG} alt="ES" />
                      Español
                      <span className="check">✓</span>
                    </LangOption>
                    <LangOption
                      $active={language === "en"}
                      onClick={() => toggleLang("en")}
                      whileTap={{ scale: 0.97 }}
                    >
                      <img src={EN_FLAG} alt="EN" />
                      English
                      <span className="check">✓</span>
                    </LangOption>
                  </LangDropdown>
                )}
              </AnimatePresence>
            </LangWrapper>

            {/* GitHub button */}
            <GithubBtn
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <GithubIcon />
              <span>{translate("github_profile")}</span>
            </GithubBtn>

            {/* Mobile hamburger */}
            <MobileMenuBtn
              $open={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <div className="menu-icon">
                <span className="menu-line"></span>
                <span className="menu-line"></span>
                <span className="menu-line"></span>
              </div>
            </MobileMenuBtn>
          </NavRight>
        </NavBar>
      </NavRoot>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileOverlay
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {NAV_SECTIONS.map(({ key, id }, i) => (
              <MobileNavBtn
                key={id}
                onClick={() => scrollTo(id)}
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                {translate(key)}
              </MobileNavBtn>
            ))}

            <MobileLangRow>
              <MobileLangBtn $active={language === "es"} onClick={() => toggleLang("es")}>
                <img src={ES_FLAG} alt="ES" /> Español
              </MobileLangBtn>
              <MobileLangBtn $active={language === "en"} onClick={() => toggleLang("en")}>
                <img src={EN_FLAG} alt="EN" /> English
              </MobileLangBtn>
            </MobileLangRow>
          </MobileOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
