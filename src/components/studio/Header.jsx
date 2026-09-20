import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useLanguage } from "../../context/LanguageContext";
import { Bio } from "../../data/constants";
import { getLenis } from "./SmoothScroll";

// Equivalente a la cubic-bezier(0.7, 0, 0.2, 1) que usa el referente
const EASE = "power4.inOut";

const Bar = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 800;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: clamp(1.4rem, 3vw, 2.1rem) var(--gutter);
  --header-fg: ${({ $onDark }) => ($onDark ? "var(--paper-on-ink)" : "var(--ink)")};
  --header-fg-soft: ${({ $onDark }) =>
    $onDark ? "rgba(255,255,255,0.65)" : "var(--ink-soft)"};
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const Signature = styled(Link)`
  display: flex;
  align-items: center;
  font-size: var(--nav);
  font-weight: 450;
  letter-spacing: 0.01em;
  color: var(--header-fg);
  cursor: pointer;
  transition: opacity 0.3s var(--ease);

  &:hover {
    opacity: 0.7;
  }

  .copyright {
    margin-right: 0.32em;
    transition: transform 0.6s var(--ease);
  }

  .name {
    display: flex;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.6s var(--ease);
  }

  .name p {
    margin: 0;
    position: relative;
    transition: transform 0.6s var(--ease);
  }

  .codeBy {
    padding-right: 0.32em;
  }

  .first {
    padding-left: 0.32em;
  }

  .last {
    position: absolute;
    left: 7.4em;
    padding-left: 0.32em;
  }

  &:hover .copyright {
    transform: rotate(360deg);
  }

  &:hover .name {
    padding-right: 1.9em;
  }

  &:hover .codeBy {
    transform: translateX(-100%);
  }

  &:hover .first {
    transform: translateX(-4.3em);
  }

  &:hover .last {
    transform: translateX(-4.3em);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 720px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  position: relative;
  font-size: var(--nav);
  font-weight: 450;
  letter-spacing: var(--tracking-label);
  color: var(--header-fg);
  padding-bottom: 3px;
  transition: opacity 0.3s var(--ease);

  &:hover {
    opacity: 0.6;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -11px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent);
    transform: translate(-50%, 5px) scale(0);
    transition: transform 0.5s var(--ease-out);
  }

  &.active::after,
  &:hover::after {
    transform: translate(-50%, 0) scale(1);
  }

  &.active {
    opacity: 1;
  }
`;

/* ─── Selector de idioma ───
   Banderas en SVG y no en emoji: Windows no dibuja los emoji de bandera, y las
   imagenes que habia antes colgaban de un CDN externo. */
const LANGS = [
  { code: "es", short: "ES", label: "Español" },
  { code: "en", short: "EN", label: "English" },
];

const FLAGS = {
  es: (
    <svg viewBox="0 0 12 8">
      <rect width="12" height="8" fill="#c60b1e" />
      <rect y="2" width="12" height="4" fill="#ffc400" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 12 8">
      <rect width="12" height="8" fill="#b22234" />
      <g fill="#fff">
        <rect y="1" width="12" height="0.7" />
        <rect y="2.4" width="12" height="0.7" />
        <rect y="3.8" width="12" height="0.7" />
        <rect y="5.2" width="12" height="0.7" />
        <rect y="6.6" width="12" height="0.7" />
      </g>
      <rect width="5.4" height="4.5" fill="#3c3b6e" />
    </svg>
  ),
};

const Chevron = ({ className }) => (
  <svg className={className} width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
    <path
      d="M1 1.25 5 4.75 9 1.25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LangWrap = styled.div`
  position: relative;
`;

const Flag = styled.span`
  display: block;
  width: 18px;
  height: 12px;
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.18);

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const LangToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: var(--nav);
  font-weight: 450;
  letter-spacing: var(--tracking-label);
  color: var(--header-fg-soft);
  cursor: pointer;
  transition: color 0.35s var(--ease), opacity 0.3s var(--ease);

  &:hover {
    color: var(--header-fg);
    opacity: 0.8;
  }

  &[aria-expanded="true"] {
    color: var(--header-fg);
  }

  .chev {
    transition: transform 0.35s var(--ease);
  }

  &[aria-expanded="true"] .chev {
    transform: rotate(180deg);
  }
`;

const LangMenu = styled.ul`
  position: absolute;
  top: calc(100% + 0.9rem);
  right: 0;
  min-width: 11rem;
  padding: 0.4rem;
  border-radius: 12px;
  background: var(--ink);
  list-style: none;
  transform-origin: top right;
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.24),
    inset 0 0 0 1px rgba(255, 255, 255, 0.09);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: ${({ $open }) =>
    $open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)"};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.28s var(--ease), transform 0.28s var(--ease);
`;

const LangOption = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.6rem 0.7rem;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: var(--nav);
  font-weight: 450;
  text-align: left;
  white-space: nowrap;
  color: var(--paper-on-ink);
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.62)};
  transition: background 0.25s var(--ease), opacity 0.25s var(--ease);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    opacity: 1;
  }

  .dot {
    margin-left: auto;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
  }
`;

const LangSwitch = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const current = LANGS.find((l) => l.code === language) || LANGS[0];

  useEffect(() => {
    if (!open) return undefined;

    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <LangWrap ref={wrapRef}>
      <LangToggle
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={language === "es" ? "Idioma: Español" : "Language: English"}
      >
        <Flag>{FLAGS[current.code]}</Flag>
        {current.short}
        <Chevron className="chev" />
      </LangToggle>

      <LangMenu $open={open} role="listbox" aria-label="Idioma">
        {LANGS.map((l) => (
          <li key={l.code} role="option" aria-selected={l.code === language}>
            <LangOption
              type="button"
              $active={l.code === language}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                setLanguage(l.code);
                setOpen(false);
              }}
            >
              <Flag>{FLAGS[l.code]}</Flag>
              {l.label}
              <span className="dot" />
            </LangOption>
          </li>
        ))}
      </LangMenu>
    </LangWrap>
  );
};

/* ─── Disparador del menú en móvil ───
   Por debajo de 720px la Nav desaparece y el circulo flotante solo entra tras
   200px de scroll, asi que arriba a la derecha no quedaba nada. El referente
   pone ahi un punto y la palabra Menu. */
const MenuInline = styled.button`
  display: none;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-sans);
  font-size: var(--nav);
  font-weight: 450;
  letter-spacing: var(--tracking-label);
  color: var(--header-fg);
  cursor: pointer;
  transition: opacity 0.3s var(--ease);

  &:hover {
    opacity: 0.6;
  }

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  @media (max-width: 720px) {
    display: inline-flex;
  }
`;

/* ─── Botón hamburguesa ───
   Círculo de clamp(4em, 5.5vw, 5em). Entra y sale con la opacidad, a tamaño
   completo: escalarlo desde cero lo convertía en un puntito que crecía.
   Las dos barras miden 28% de ancho y 1px de alto, y se cruzan al abrir. */
const MenuButton = styled.button`
  position: fixed;
  top: calc(var(--gap-padding) / 1.5);
  right: calc(var(--gap-padding) / 1.5);
  z-index: 105;
  width: clamp(4em, 5.5vw, 5em);
  height: clamp(4em, 5.5vw, 5em);
  border-radius: 50%;
  background: var(--ink);
  cursor: pointer;
  /* Siempre a tamaño real; lo que aparece y desaparece es la opacidad. */
  transform: translateY(0%) rotate(0.001deg);
  opacity: 0;
  transition: background-color 0.25s cubic-bezier(0.36, 0, 0.66, 0),
    box-shadow 0.25s cubic-bezier(0.36, 0, 0.66, 0);
  box-shadow: ${({ $open }) =>
    $open ? "inset 0 0 0 1px transparent" : "inset 0 0 0 1px var(--color-border-light)"};
  pointer-events: none;

  &:hover {
    background: ${({ $open }) => ($open ? "var(--accent-hover)" : "#2a2b2f")};
  }

  /* Las barras viven en un cuadro del 28% del botón */
  i {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 28%;
    height: 8%;
    transform: translate(-50%, -50%);
    pointer-events: none;

    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 50%;
      height: 1px;
      width: 100%;
      background: var(--color-white);
      transition: all 0.3s cubic-bezier(0.7, 0, 0.3, 1);
    }

    &::before {
      top: ${({ $open }) => ($open ? "50%" : "0")};
      transform: translate(-50%, -50%)
        rotate(${({ $open }) => ($open ? "-45deg" : "0deg")});
    }

    &::after {
      top: ${({ $open }) => ($open ? "50%" : "100%")};
      transform: translate(-50%, -50%)
        rotate(${({ $open }) => ($open ? "45deg" : "0deg")});
    }
  }
`;

/* Velo: degradado hacia la derecha, opacidad 0.35 al abrir */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.3) 40%,
    rgb(0, 0, 0) 80%
  );
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s cubic-bezier(0.7, 0, 0.2, 1);
  will-change: opacity;
`;

/* Panel lateral: 37.5vw, parte fuera de pantalla más los 6vw de la curva */
const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  height: 100vh;
  width: 37.5vw;
  min-width: 380px;
  background: var(--ink);
  color: var(--paper-on-ink);
  transform: translate(calc(100% + 6vw), 0) rotate(0.001deg);
  transition: transform 0.8s cubic-bezier(0.7, 0, 0.2, 1);
  will-change: transform;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(var(--gap-padding) * 3.5) var(--gap-padding)
    var(--gap-padding);

  @media (max-width: 720px) {
    width: 100vw;
    min-width: 0;
  }
`;

/* La curva: una franja a la izquierda del panel con una elipse dentro.
   Al abrir, la franja se contrae de 6vw a 0 y la curva se estira. */
const CurveWrap = styled.div`
  position: absolute;
  top: 0;
  left: 1px;
  height: 100%;
  transform: translateX(-100%);
  overflow: hidden;
  width: 6vw;
  transition: width 0.85s cubic-bezier(0.7, 0, 0.2, 1);
  will-change: width;

  /* Al abrir, la franja se contrae y la curva se estira hasta aplanarse */

  @media (max-width: 720px) {
    display: none;
  }
`;

const Curve = styled.div`
  position: absolute;
  top: 50%;
  width: 775%;
  height: 150%;
  background: var(--ink);
  border-radius: 50%;
  transform: translate(-6.5%, -50%);
`;

const PanelLabel = styled.h5`
  font-size: 0.648em;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-soft-on-ink);
  padding-bottom: 1.4em;
  border-bottom: 1px solid var(--rule-on-ink);
  margin-bottom: 1.2em;
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 5vh;

  li {
    overflow: hidden;
  }

  a {
    position: relative;
    display: inline-block;
    font-size: calc(0.875 * clamp(3.25em, 5vw, 4.5em));
    font-weight: 400;
    letter-spacing: normal;
    line-height: 1.4;
    transition: transform 0.5s cubic-bezier(0.7, 0, 0.3, 1);

    /* El punto del referente: aparece a la izquierda al pasar por encima */
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: calc(var(--gap-padding) / -4);
      width: calc(0.606061 * clamp(16px, 1.2vw, 19px));
      height: calc(0.606061 * clamp(16px, 1.2vw, 19px));
      border-radius: 50%;
      background: var(--color-white);
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1);
    }

    &:hover {
      transform: translateX(calc(var(--gap-padding) / 2));
    }

    &:hover::after {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const PanelFoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em 3em;

  a {
    position: relative;
    font-size: 0.875em;
    font-weight: 400;
    padding-bottom: 2px;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1);
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const Header = () => {
  const { language, setLanguage, translate } = useLanguage();
  const { pathname } = useLocation();
  const onDark = pathname === "/";
  const [open, setOpen] = useState(false);
  const linksRef = useRef(null);
  const panelRef = useRef(null);
  const curveRef = useRef(null);
  const veilRef = useRef(null);
  const buttonRef = useRef(null);
  const scrolledRef = useRef(false);
  const firstRun = useRef(true);

  const links = [
    { to: "/work", label: translate("studio.nav_work") },
    { to: "/about", label: translate("studio.nav_about") },
    { to: "/contact", label: translate("studio.nav_contact") },
  ];

  // El botón aparece cuando la barra superior ya se fue
  useEffect(() => {
    // Estado de reposo: ya a tamaño casi real y un pelo mas arriba. De aqui
    // sale el gesto de asentarse; escalar desde cero lo volvia un puntito.
    gsap.set(buttonRef.current, { opacity: 0, y: -10, scale: 0.92 });

    const onScroll = () => {
      const visible = window.scrollY > 200;
      if (visible === scrolledRef.current) return;
      scrolledRef.current = visible;
      gsap.to(buttonRef.current, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -10,
        scale: visible ? 1 : 0.92,
        // Entra despacio y frena; se va mas rapido para no estorbar.
        duration: visible ? 0.85 : 0.4,
        ease: visible ? "power3.out" : "power2.in",
        overwrite: true,
        onStart: () => {
          buttonRef.current.style.pointerEvents = visible ? "auto" : "none";
        },
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Apertura del panel, con las medidas y tiempos del referente:
     panel 0.8s, curva 0.85s, velo 0.8s, todos en la misma curva. */
  useEffect(() => {
    const panel = panelRef.current;
    const curve = curveRef.current;
    const veil = veilRef.current;
    const items = linksRef.current.querySelectorAll("a");
    const lenis = getLenis();

    /* Fuera de pantalla = su propio ancho (xPercent) más los 6vw de la curva.
       En píxeles no vale: al montar, offsetWidth todavía puede ser 0. */
    const hiddenX = () => window.innerWidth * 0.09;

    // En el primer render se coloca, no se anima: si no, el panel entraría
    // deslizándose solo al cargar la página.
    if (firstRun.current) {
      firstRun.current = false;
      gsap.set(panel, { xPercent: 100, x: hiddenX });
      gsap.set(curve, { width: "6vw" });
      gsap.set(veil, { opacity: 0 });
      gsap.set(items, { yPercent: 105 });
      return undefined;
    }

    const tl = gsap.timeline({ defaults: { ease: EASE } });

    if (open) {
      if (lenis) lenis.stop();
      tl.to(panel, { xPercent: 0, x: 0, duration: 0.8 }, 0)
        .to(curve, { width: "0vw", duration: 0.85 }, 0)
        .to(veil, { opacity: 0.35, duration: 0.8 }, 0)
        .fromTo(
          items,
          { yPercent: 105 },
          { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.07 },
          0.35
        );
      veil.style.pointerEvents = "all";
    } else {
      if (lenis) lenis.start();
      veil.style.pointerEvents = "none";
      tl.to(panel, { xPercent: 100, x: hiddenX, duration: 0.8 }, 0)
        .to(curve, { width: "6vw", duration: 0.85 }, 0)
        .to(veil, { opacity: 0, duration: 0.8 }, 0)
        .to(items, { yPercent: 105, duration: 0.4, ease: "power2.in" }, 0);
    }

    return () => tl.kill();
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Bar $onDark={onDark}>
        <Signature to="/">
          <span className="copyright" aria-hidden="true">
            ©
          </span>
          <div className="name">
            <p className="codeBy">{translate("studio.signature")}</p>
            <p className="first">Juan Rojas</p>
            <p className="last">Salinas</p>
          </div>
        </Signature>

        <Nav>
          {links.map((link) => (
            <NavItem key={link.to} to={link.to}>
              {link.label}
            </NavItem>
          ))}
          <LangSwitch />
        </Nav>

        <MenuInline
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? translate("studio.close") : translate("studio.menu")}
        >
          {translate("studio.menu_label")}
        </MenuInline>
      </Bar>

      <Backdrop ref={veilRef} onClick={() => setOpen(false)} aria-hidden="true" />

      <MenuButton
        ref={buttonRef}
        $open={open}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? translate("studio.close") : translate("studio.menu")}
      >
        <i aria-hidden="true" />
      </MenuButton>

      <Panel ref={panelRef} role="dialog" aria-modal="true" aria-hidden={!open}>
        <CurveWrap ref={curveRef} aria-hidden="true">
          <Curve />
        </CurveWrap>

        <div>
          <PanelLabel>{translate("studio.navigation")}</PanelLabel>
          <MenuList ref={linksRef}>
            <li>
              <Link to="/" tabIndex={open ? 0 : -1}>
                {translate("studio.nav_home")}
              </Link>
            </li>
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} tabIndex={open ? 0 : -1}>
                  {link.label}
                </Link>
              </li>
            ))}
          </MenuList>
        </div>

        <div>
          <PanelLabel>{translate("studio.socials")}</PanelLabel>
          <PanelFoot>
            <a href={Bio.github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              GitHub
            </a>
            <a href={Bio.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              LinkedIn
            </a>
            <a href="mailto:rojassalinasjuanandres@gmail.com" tabIndex={open ? 0 : -1}>
              Email
            </a>
            <a
              href="#lang"
              onClick={(e) => {
                e.preventDefault();
                setLanguage(language === "es" ? "en" : "es");
              }}
              tabIndex={open ? 0 : -1}
            >
              {language === "es" ? "English" : "Español"}
            </a>
          </PanelFoot>
        </div>
      </Panel>
    </>
  );
};

export default Header;
