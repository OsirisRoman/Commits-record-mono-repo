import styled from "styled-components";

export const Container = styled.div`
  margin: 1rem 0;
  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

export const RepoUrlContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const Record = styled.div`
  height: 150px;
  overflow: auto;
`;
