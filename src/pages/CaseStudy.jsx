import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { Link, Navigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { getWork, getNextWork } from "../data/work";
import { RevealText, RevealBlock } from "../components/studio/Reveal";
import { Page, Shell, PageHead, PageTitle } from "../components/studio/Layout";
import Pill from "../components/studio/Pill";
import DeviceFrame from "../components/studio/DeviceFrame";
import { ArrowUpRight } from "../components/studio/Icons";
import { useMagnetic } from "../hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

const Subtitle = styled.p`
  font-size: var(--body-lg);
  color: var(--ink-soft);
  letter-spacing: -0.02em;
  margin-top: clamp(0.75rem, 2vw, 1.25rem);
  max-width: 26ch;
`;

// Rejilla de metadatos: rol / créditos / lugar y año
const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-top: clamp(3rem, 8vw, 6rem);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const MetaCell = styled.div`
  h4 {
    font-family: var(--font-sans);
    font-size: var(--label);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--ink-faint);
    padding-bottom: 0.9rem;
    border-bottom: 1px solid var(--rule);
    margin-bottom: 0.9rem;
  }

  p {
    font-size: 1rem;
  }
`;

// ─── Botón circular pegajoso hacia el sitio en vivo ───
const LiveWrap = styled.div`
  position: absolute;
  top: 0;
  /* Cero, no --gutter: ahora el marco vive dentro del Shell, que ya aporta
     ese margen. Sumarlo otra vez despegaria el boton del borde de la imagen. */
  right: 0;
  z-index: 40;
  transform: translateY(-50%);

  @media (max-width: 640px) {
    position: static;
    transform: none;
    display: flex;
    justify-content: flex-end;
    margin: 0 0 1.5rem;
  }
`;

const LiveButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: clamp(110px, 12vw, 160px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ $accent }) => $accent || "var(--accent)"};
  color: #fff;
  font-size: var(--body);
  font-weight: 500;
  text-align: center;
  will-change: transform;
  box-shadow: var(--shadow-inset);
`;

const LiveMagnetic = ({ href, accent, children }) => {
  const ref = useMagnetic({ strength: 0.4, radius: 110 });
  return (
    <LiveWrap>
      <LiveButton ref={ref} href={href} target="_blank" rel="noreferrer" $accent={accent}>
        {children}
      </LiveButton>
    </LiveWrap>
  );
};

const HeroMediaWrap = styled.div`
  position: relative;
`;

// Imagen principal con parallax suave dentro de su marco. No va a sangre: se
// recoge dentro del Shell, como el resto de la pagina.
const HeroMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 3;
  overflow: hidden;
  background: ${({ $accent }) => $accent};

  img {
    width: 100%;
    /* Más alto que el marco: es el recorrido del parallax */
    height: 112%;
    object-fit: cover;
    object-position: top center;
    will-change: transform;
  }

  @media (max-width: 640px) {
    aspect-ratio: 4 / 3;
  }
`;

// ─── Cuerpo ───
const Body = styled.section`
  padding: var(--section) 0;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: clamp(2rem, 6vw, 6rem);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const BodyAside = styled.div`
  h4 {
    font-family: var(--font-sans);
    font-size: var(--label);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

/* Acceso de demostración, para quien quiera entrar al proyecto */
const Access = styled.div`
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--rule);

  h4 {
    font-family: var(--font-sans);
    font-size: var(--label);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 0.9rem;
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.35rem 1rem;
    margin: 0;
  }

  dt {
    font-size: 0.95rem;
    color: var(--ink-soft);
  }

  dd {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

const BodyText = styled.div`
  p {
    font-size: var(--body-lg);
    line-height: 1.45;
    letter-spacing: -0.015em;
    margin-bottom: 1.5em;

    &:first-child {
      font-size: clamp(1.4rem, 2.6vw, 2.1rem);
      line-height: 1.24;
      letter-spacing: -0.03em;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// ─── Bandas de piezas gráficas ───
const Band = styled.section`
  background: ${({ $bg, $accent }) =>
    $bg === "accent" ? $accent : "var(--paper-warm)"};
  padding: clamp(4rem, 10vw, 9rem) var(--gutter);
`;

const BandInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(2rem, 5vw, 4rem);
`;

const BandCell = styled(RevealBlock)`
  flex: ${({ $wide }) => ($wide ? "1 1 100%" : "0 1 auto")};
  display: flex;
  justify-content: center;
`;

// ─── Siguiente caso ───
const Next = styled.section`
  background: var(--ink);
  color: var(--paper-on-ink);
  padding: var(--section) 0;
  text-align: center;
`;

// La miniatura del siguiente proyecto asoma por una ventana fija cuyo borde
// inferior coincide con la regla, y se desplaza por dentro con el scroll: el
// mockup parece emerger desde detras del titular y quedar cortado en la linea.
const TILE_W = "clamp(200px, 25vw, 400px)";
// En reposo solo asoma una franja sobre la regla; al pasar el raton la ventana
// crece hacia arriba (el borde de abajo esta clavado en la regla) hasta el
// doble, que es donde se lee el mockup completo.
const TILE_PEEK = `calc(${TILE_W} / 4)`;
const TILE_FULL = `calc(${TILE_W} / 2)`;

const NextBlock = styled.div`
  position: relative;
  /* Hueco bajo el titular para que la ventana pueda bajar hasta la regla
     solapando solo su parte alta con el texto. */
  /* Atado al alto abierto: asi el solape sobre el titular queda en el 23.6%
     de la ventana, que es el de la referencia (47px sobre 198). Con menos
     relleno la imagen se comia las letras. */
  padding-bottom: calc(${TILE_FULL} * 0.764);
  border-bottom: 1px solid var(--rule-on-ink);
`;

const NextLink = styled(Link)`
  display: block;
  /* No usa --display-2: su tope de 4em lo dejaba en 64px a 1600, casi la mitad
     de los 112px de la referencia. Aqui manda el 7vw.
     Peso 450 y sin tracking negativo: es lo que mide la referencia, y es lo
     que hace que a este cuerpo el trazo no se vea en negrita. */
  font-size: clamp(2.8rem, 7vw, 8rem);
  font-weight: 450;
  letter-spacing: normal;
  line-height: 1.065;
  transition: color 0.35s var(--ease-out);

  &:hover {
    color: var(--accent);
  }

  .label {
    font-size: var(--label);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    line-height: 1.4;
    color: var(--ink-soft-on-ink);
    margin-bottom: 1.5rem;
  }
`;

const TileWindow = styled.div`
  position: absolute;
  left: 50%;
  /* -1px y no 0: bottom se mide contra la caja de relleno, que queda por
     encima del borde. Asi la imagen se apoya en la regla sin rendija. */
  bottom: -1px;
  transform: translateX(-50%);
  width: ${TILE_W};
  height: ${TILE_PEEK};
  overflow: hidden;
  z-index: 2;
  pointer-events: none;
  /* Lenta y con salida suave: el enunciado era que no resultara brusco. */
  transition: height 0.7s var(--ease-out);

  ${NextLink}:hover ~ & {
    height: ${TILE_FULL};
  }

  /* La imagen se relaja de un leve zoom al abrirse. Va en el img y no en el
     Tile porque ese lo mueve GSAP con el parallax. */
  ${NextLink}:hover ~ & img {
    transform: scale(1);
  }
`;

const Tile = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  /* Anclado abajo, que es el borde que no se mueve: al crecer la ventana se
     descubre la parte de arriba de la imagen en lugar de reencuadrarla. */
  bottom: 0;
  /* Alto fijo respecto a la ventana abierta, no a la actual: si dependiera de
     la altura viva, el recorrido del parallax cambiaria durante el hover. */
  height: calc(${TILE_FULL} * 1.7);
  background: ${({ $accent }) => $accent || "var(--rule-on-ink)"};
  will-change: transform;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.06);
    transition: transform 0.7s var(--ease-out);
  }
`;

/* Las tecnologías van en píldoras algo más pequeñas que las de navegación */
const AllWorkRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
`;

const StackPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  padding: 0 20px;
  border-radius: 23px;
  border: 1px solid var(--rule-solid);
  color: var(--ink);
  font-size: 0.9375rem;
  font-weight: 450;
  line-height: 1;
  white-space: nowrap;
`;

const CaseStudy = () => {
  const { slug } = useParams();
  const { language, translate } = useLanguage();
  const project = getWork(slug);
  const mediaRef = useRef(null);
  const tileRef = useRef(null);

  // Parallax de la imagen principal: se mueve más lento que el scroll
  useLayoutEffect(() => {
    if (!project) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaRef.current,
        { yPercent: -10 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: mediaRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, mediaRef);

    return () => ctx.revert();
  }, [project]);

  // Parallax de la miniatura del siguiente caso dentro de su ventana. El
  // recorrido es justo el alto sobrante del Tile (170% - 100% = 70% del marco,
  // que sobre la altura propia del Tile es 70/170 ≈ 41%).
  useLayoutEffect(() => {
    if (!project || !tileRef.current) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tileRef.current,
        { yPercent: -41 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: tileRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, tileRef);

    return () => ctx.revert();
  }, [project, slug]);

  if (!project) return <Navigate to="/work" replace />;

  const next = getNextWork(slug);
  const nextShot = next.gallery && next.gallery[0];
  const gallery = project.gallery || [];
  const hero = gallery.find((g) => g.hero);
  const bands = gallery.filter((g) => g.items);

  return (
    <Page>
      <Shell>
        <PageHead>
          <PageTitle>
            <RevealText delay={0.05}>{project.title}</RevealText>
          </PageTitle>
          <RevealBlock delay={0.25} y={20}>
            <Subtitle>{project.subtitle[language]}</Subtitle>
          </RevealBlock>

          <MetaGrid>
            <RevealBlock delay={0.3} y={20}>
              <MetaCell>
                <h4>{translate("studio.meta_role")}</h4>
                <p>{project.role[language]}</p>
              </MetaCell>
            </RevealBlock>
            <RevealBlock delay={0.36} y={20}>
              <MetaCell>
                <h4>{translate("studio.meta_credits")}</h4>
                <p>{project.credits[language]}</p>
              </MetaCell>
            </RevealBlock>
            <RevealBlock delay={0.42} y={20}>
              <MetaCell>
                <h4>{translate("studio.meta_where")}</h4>
                <p>
                  {project.location} © {project.year}
                </p>
              </MetaCell>
            </RevealBlock>
          </MetaGrid>
        </PageHead>
      </Shell>

      <Shell>
        <HeroMediaWrap>
          {project.liveUrl && (
            <LiveMagnetic href={project.liveUrl} accent={project.accent}>
              {translate("studio.live_site")} <ArrowUpRight size={16} />
            </LiveMagnetic>
          )}

          <HeroMedia $accent={project.accent}>
            {hero && <img ref={mediaRef} src={hero.src} alt={hero.alt} />}
          </HeroMedia>
        </HeroMediaWrap>
      </Shell>

      <Shell>
        <Body>
          <BodyAside>
            <RevealBlock y={20}>
              <h4>{translate("studio.meta_stack")}</h4>
              <ul>
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <StackPill>{tech}</StackPill>
                  </li>
                ))}
              </ul>

              {project.demoCredentials && (
                <Access>
                  <h4>{translate("studio.demo_access")}</h4>
                  <dl>
                    <dt>{translate("studio.demo_user")}</dt>
                    <dd>{project.demoCredentials.user}</dd>
                    <dt>{translate("studio.demo_pass")}</dt>
                    <dd>{project.demoCredentials.password}</dd>
                  </dl>
                </Access>
              )}
            </RevealBlock>
          </BodyAside>

          <BodyText>
            {project.body[language].map((paragraph, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <RevealBlock key={i} delay={i * 0.05} y={26}>
                <p>{paragraph}</p>
              </RevealBlock>
            ))}
          </BodyText>
        </Body>
      </Shell>

      {bands.map((band, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Band key={i} $bg={band.bg} $accent={project.accent}>
          <BandInner>
            {band.items.map((item) => (
              <BandCell key={item.src} $wide={item.device !== "phone"}>
                <DeviceFrame type={item.device} src={item.src} alt={item.alt} />
              </BandCell>
            ))}
          </BandInner>
        </Band>
      ))}

      <Next>
        <Shell>
          <NextBlock>
            <NextLink to={`/work/${next.slug}`} data-cursor="View">
              <p className="label">{translate("studio.next_case")}</p>
              {next.title}
            </NextLink>

            <TileWindow aria-hidden="true">
              <Tile ref={tileRef} $accent={next.accent}>
                {nextShot && <img src={nextShot.src} alt="" />}
              </Tile>
            </TileWindow>
          </NextBlock>

          <AllWorkRow>
            <Pill to="/work" dark>
              {translate("studio.all_work")}
            </Pill>
          </AllWorkRow>
        </Shell>
      </Next>
    </Page>
  );
};

export default CaseStudy;
