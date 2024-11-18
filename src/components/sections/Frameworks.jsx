import React from "react";
import styled from "styled-components";
import { frameworks } from "../../data/constants";
import { Tilt } from "react-tilt";
import { useLanguage } from "../../context/LanguageContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
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
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  gap: 30px;
  margin-top: 20px;
  justify-items: center;
  align-items: start;
  padding: 20px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr; /* Una sola columna en pantallas pequeñas */
    grid-template-rows: auto; /* Filas automáticas */
  }
`;

const Framework = styled.div`
  width: ${({ isLarge }) => (isLarge ? "500px" : "500px")};
  height: ${({ isLarge }) => (isLarge ? "360px" : "297px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854ce6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;

  @media (max-width: 960px) {
    width: 100%;
    max-width: ${({ isLarge }) => (isLarge ? "360px" : "297px")};
    padding: 10px 36px;
  }
  @media (max-width: 500px) {
    width: 100%;
    max-width: ${({ isLarge }) => (isLarge ? "360px" : "297px")};
    padding: 10px 36px;
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 2px; /* Mueve los elementos hacia el centro verticalmente */
  margin-bottom: auto; /* Mueve los elementos hacia el centro verticalmente */
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
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
    width: 180px;
    height: 40px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
    width: 160px;
    height: 35px;
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
    title: translate(framework.title.charAt(0).toUpperCase() + framework.title.slice(1).toLowerCase()),
    frameworks: framework.frameworks.map((item) => ({
      ...item,
      name: translate(item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()),
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
              <Framework isLarge={index < 2}>
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