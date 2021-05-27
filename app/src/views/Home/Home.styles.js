import styled from "styled-components";

export const BackgroundContainer = styled.div`
  padding: 8rem 0 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
`;

export const BackgroundImage = styled.img`
  top: 30%;
  left: 40%;
  width: 200%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  position: absolute;
  @media (min-width: 768px) {
    top: 50%;
  }
`;

export const AstroMonaImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 250px;
  @media (min-width: 544px) {
    width: 300px;
  }

  @media (min-width: 768px) {
    width: 350px;
  }
`;

export const WelcomeText = styled.h1`
  color: white;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  font-size: 2rem;
  word-wrap: break-word;
  margin: 1rem;
  @media (min-width: 544px) {
    font-size: 3rem;
  }

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;
