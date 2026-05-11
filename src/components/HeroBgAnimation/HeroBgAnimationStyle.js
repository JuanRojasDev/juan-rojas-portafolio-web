import styled from 'styled-components';

export const Div = styled.div`
    width: 600px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 960px) {
      width: 500px;
      height: 500px;
    }
    
    @media (max-width: 640px) {
      width: 400px;
      height: 400px;
    }
`