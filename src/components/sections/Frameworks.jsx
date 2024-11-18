import React from "react";
import styled from "styled-components";
import { frameworks } from "../../data/constants";
import { Tilt } from "react-tilt";
import { useLanguage } from "../../context/LanguageContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

export const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  max-width: 900px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FrameworksContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 16px;
  }
`;

const Framework = styled.div`
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854ce6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:nth-child(1),
  &:nth-child(2) {
    max-width: 500px;
    width: 100%;
    height: 360px;
  }

  &:nth-child(3),
  &:nth-child(4) {
    max-width: 500px;
    width: 100%;
    height: 297px;
  }

  @media (max-width: 768px) {
    max-width: 360px;
    width: 100%;
    height: 360px;
    padding: 16px;
    margin-bottom: 16px; /* Añadir margen inferior para separar los elementos */

    &:nth-child(3),
    &:nth-child(4) {
      height: 297px;
    }
  }
`;

const FrameworkTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
  text-align: center;
`;

const FrameworkList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const FrameworkItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const FrameworkImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Frameworks = () => {
  const { translate } = useLanguage();

  const translatedFrameworks = frameworks.map((framework) => ({
    ...framework,
    title: translate(framework.title.toLowerCase()),
    frameworks: framework.frameworks.map((item) => ({
      ...item,
      name: translate(item.name.toLowerCase()),
    })),
  }));

  return (
    <Container id="frameworks">
      <Wrapper>
        <Title>{translate("frameworks_title")}</Title>
        <Desc style={{ marginBottom: "40px" }}>
          {translate("frameworks_desc")}
        </Desc>
        <FrameworksContainer>
          {translatedFrameworks.map((framework, index) => (
            <Tilt key={`framework-${index}`}>
              <Framework>
                <FrameworkTitle>{framework.title}</FrameworkTitle>
                <FrameworkList>
                  {framework.frameworks.map((item, index_x) => (
                    <FrameworkItem key={`framework-x-${index_x}`}>
                      <FrameworkImage src={item.image} />
                      {item.name}
                    </FrameworkItem>
                  ))}
                </FrameworkList>
              </Framework>
            </Tilt>
          ))}
        </FrameworksContainer>
      </Wrapper>
    </Container>
  );
};

export default Frameworks;