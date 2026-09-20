import styled from "styled-components";

export const Page = styled.main`
  overflow: clip;
`;

export const Shell = styled.div`
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--gutter);
`;

export const PageHead = styled.header`
  padding: clamp(8.5rem, 19vh, 13rem) 0 clamp(2.75rem, 5.5vw, 4rem);
  
  @media (max-width: 720px) {
    padding: clamp(7rem, 16vh, 10rem) 0 clamp(2.25rem, 5vw, 3rem);
  }
`;

export const PageTitle = styled.h1`
  font-size: var(--display-1);
  font-weight: 500;
  letter-spacing: var(--tracking-display);
  line-height: 0.98;
  max-width: 18ch;
  
  @media (max-width: 720px) {
    max-width: 100%;
  }
`;

export const SectionTitle = styled.h2`
  font-size: var(--display-2);
  font-weight: 500;
  letter-spacing: var(--tracking-display);
  line-height: 1.05;
  max-width: 20ch;
  
  @media (max-width: 720px) {
    max-width: 100%;
  }
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1.25rem;
  padding-bottom: clamp(1.1rem, 2.8vw, 1.7rem);
  
  .label {
    opacity: 0.85;
  }
`;

export const DarkSection = styled.section`
  position: relative;
  background: var(--ink);
  color: var(--paper-on-ink);
  padding: clamp(8rem, 16vw, 12rem) 0 clamp(5rem, 12vw, 8rem);
  margin-top: -1px;
  
  
  @media (max-width: 720px) {
    padding: clamp(5rem, 14vw, 8rem) 0 clamp(4rem, 10vw, 5rem);
    
  }
`;

export const DarkLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1.5rem, 5.5vw, 5rem);
  padding-top: clamp(1.75rem, 3vw, 2.25rem);
  border-top: 1px solid var(--rule-on-ink);

  a {
    font-size: clamp(1rem, 1.4vw, 1.15rem);
    font-weight: 500;
    letter-spacing: 0.01em;
    transition: color 0.4s var(--ease), opacity 0.3s ease;
    opacity: 0.95;

    &:hover {
      color: var(--accent-hover);
      opacity: 1;
    }
  }

  @media (max-width: 720px) {
    gap: 1.25rem;
    flex-direction: column;
  }
`;
