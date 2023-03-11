import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";


const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  border-radius: 25px;
  font-size: 18pt;
  position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    
    margin: auto;
`;
const StyledH1 = styled.h1`
  justify-content: center;
  display: flex;
  font-weight: bold;
  margin-top: 20px;
`;
const StyledH2 = styled.h2`
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-top: 20px;
  font-size: 22pt;
  width: auto;
`;
const StyledButton = styled.button`
  height: 50px;
  background: linear-gradient(to right top, #BF81A0, #8766A7, #5694A0  );
  border-radius: 22px;
  color: white;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 15pt;
`;
function Landing() {
  

  return (

      <StyledRootDiv>
        <StyledH1>Become more aware of the websites you are using</StyledH1>
        <StyledH2>Use this app to review websites and identify if they are trustworthy</StyledH2>
        <Link to="/login"><StyledButton>Click here to start</StyledButton></Link>
      </StyledRootDiv>

  );
}

export default Landing;
