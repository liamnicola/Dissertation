import React from "react";
import AllWebsites from "../Components/AllWebsites";
import styled from "styled-components";

const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;

`;

function Websites() {
    return (
      <StyledRootDiv>
        <h1>All existing websites</h1>
        <AllWebsites />
      </StyledRootDiv>
    );
  }
  
  export default Websites;
  