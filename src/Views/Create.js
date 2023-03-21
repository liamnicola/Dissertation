import React from "react";
import WebsiteForm from "../Components/CreateWebsite";
import styled from "styled-components";

const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;

`;

const Create = () => {
  return (
    <StyledRootDiv>
      <h1>Upload a Website</h1>
      <WebsiteForm/>
    </StyledRootDiv>
  );
};

export default Create;
