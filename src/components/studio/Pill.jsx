import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

/* ─── Píldora ───
   Medidas tomadas del referente: 68px de alto, radio 34px (la mitad, para que
   sea cápsula perfecta), texto de 16px peso 450 y 32px de aire a los lados.
   Al pasar por encima, un relleno oscuro sube desde abajo. */
const base = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  padding: 0 32px;
  border-radius: 34px;
  border: 1px solid var(--rule-solid);
  background: transparent;
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 450;
  letter-spacing: normal;
  line-height: 1;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  transition: color 0.4s var(--ease), border-color 0.4s var(--ease);

  /* El relleno que sube: es lo que da el aire del referente */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--ink);
    border-radius: inherit;
    transform: translateY(101%);
    transition: transform 0.45s var(--ease);
    z-index: 0;
  }

  > span {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: flex-start;
    gap: 0.28em;
  }

  &:hover {
    color: var(--paper-on-ink);
    border-color: transparent;
  }

  &:hover::before {
    transform: translateY(0);
  }

  ${({ $active }) =>
    $active &&
    css`
      background: var(--ink);
      border-color: transparent;
      color: var(--paper-on-ink);

      &::before {
        transform: translateY(0);
      }
    `}

  ${({ $dark }) =>
    $dark &&
    css`
      border-color: var(--rule-on-ink);
      color: var(--paper-on-ink);

      &::before {
        background: var(--paper-on-ink);
      }

      &:hover {
        color: var(--ink);
      }
    `}

  @media (max-width: 720px) {
    height: 54px;
    padding: 0 22px;
    font-size: 0.9375rem;
  }
`;

const ButtonPill = styled.button`
  ${base}
`;
const LinkPill = styled(Link)`
  ${base}
`;
const AnchorPill = styled.a`
  ${base}
`;

/* El conteo va en superíndice, como en el referente */
const Count = styled.sup`
  font-size: 0.65em;
  line-height: 1;
  opacity: 0.85;
`;

const Pill = ({ children, count, to, href, active, dark, ...rest }) => {
  const content = (
    <span>
      {children}
      {count != null && <Count>{count}</Count>}
    </span>
  );

  if (to) {
    return (
      <LinkPill to={to} $active={active} $dark={dark} {...rest}>
        {content}
      </LinkPill>
    );
  }

  if (href) {
    return (
      <AnchorPill href={href} $active={active} $dark={dark} {...rest}>
        {content}
      </AnchorPill>
    );
  }

  return (
    <ButtonPill type="button" $active={active} $dark={dark} {...rest}>
      {content}
    </ButtonPill>
  );
};

export default Pill;
