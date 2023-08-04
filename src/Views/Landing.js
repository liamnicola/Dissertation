import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";


const StyledRootDiv = styled.div`
  display: flex;
  background-color: #121212;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
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
const StyledH3 = styled.h3`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: auto;
`;
const StyledButton = styled.button`
  height: 50px;
  background: #F7567C;
  border-radius: 22px;
  color: white;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 15pt;
  border:  #F7567C solid 5px;
`;
function Landing() {
  

  return (

      <StyledRootDiv>
        <StyledH1>WebCheck</StyledH1>
        <p>Share and view experiences of websites to help people recognise what websites are trustworthy, and what websites users should be cautious of </p>
        <Link to="/login"><StyledButton>Begin</StyledButton></Link>
      </StyledRootDiv>

  );
}

export default Landing;
