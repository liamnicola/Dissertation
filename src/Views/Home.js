import React from "react";
import styled from "styled-components";
import LastWebsites from "../Components/LastWebsites";
const StyledInput = styled.input`
background: #b5b5b5;
display: grid;
justify-content: center;
align-items: center;
align-content: center;
width: 50%;
padding: 0.5rem 0.8rem 0.5rem 0.8rem;
margin: 0.9vw 0;
border: 0;
font-size: 20px;
margin-left: 25%;
border-radius: 25px;
text-align: center;
`

const StyledH2 = styled.h2`
  justify-content: center;
  display: flex;
  font-weight: bold;
  margin-top: 20px;
`;

function Home() {
  return (
    <div>
      <h1>Welcome To My Website</h1>
      <StyledInput value="Search Websites Here!"></StyledInput>
      <br/>
      <StyledH2>Recently added websites</StyledH2>
      <LastWebsites />
    </div>
  );
}

export default Home;
