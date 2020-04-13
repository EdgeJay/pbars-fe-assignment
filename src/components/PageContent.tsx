import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100%;
  background-color: #949494;
`;

const CentralisedContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 100%;
  padding: 0.5rem 1rem 0 1rem;
  background-color: #fff;

  @media (min-width: 375px) {
    flex: 0 0 375px;
  }

  @media (min-width: 425px) {
    flex: 0 0 425px;
  }

  @media (min-width: 768px) {
    flex: 0 0 768px;
  }

  @media (min-width: 1024px) {
    flex: 0 0 1024px;
  }
`;

const PageContent: FunctionComponent = ({ children }) => (
  <Container>
    <CentralisedContent>{children}</CentralisedContent>
  </Container>
);

export default PageContent;
