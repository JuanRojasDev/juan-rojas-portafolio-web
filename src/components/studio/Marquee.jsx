import React from "react";
import styled, { keyframes } from "styled-components";

const slide = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${slide} ${({ $duration }) => $duration}s linear infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Row = styled.div`
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  padding: ${({ $compact }) => ($compact ? "0" : "0.15em 0")};
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 3rem);
  padding-right: clamp(1.5rem, 3vw, 3rem);
  font-size: ${({ $size }) => $size};
  font-weight: 500;
  letter-spacing: var(--tracking-display);
  line-height: 1;
  color: inherit;

  &::after {
    content: "";
    width: 0.32em;
    height: 0.32em;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }
`;

const Marquee = ({
  text,
  duration = 26,
  size = "clamp(3rem, 8vw, 6.5rem)",
  compact,
}) => {
  const items = Array.from({ length: 8 }, (_, i) => i);

  return (
    <Row $compact={compact} aria-hidden="true">
      <Track $duration={duration}>
        {items.map((i) => (
          <Item key={i} $size={size}>
            {text}
          </Item>
        ))}
      </Track>
    </Row>
  );
};

export default Marquee;
