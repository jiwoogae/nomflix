import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-top: 70px;
`;

const Loading = styled.span`
  font-size: 33px;
`;

const Loader = () => (
  <Container>
    <Loading>Now Loading...</Loading>
  </Container>
);

export default Loader;
