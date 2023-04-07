import React from "react";
import WebsiteForm from "../Components/CreateWebsite";
import styled from "styled-components";

const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
`;

const StyledRootH1 = styled.h1`
  margin-top: 0;
`;


const Create = () => {
  return (
    <StyledRootDiv>
      <StyledRootH1>Upload a Website</StyledRootH1>
      <WebsiteForm/>
    </StyledRootDiv>
  );
};

export default Create;
