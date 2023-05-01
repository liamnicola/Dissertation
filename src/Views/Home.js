import React from "react";
import styled from "styled-components";
import LastWebsites from "../Components/LastWebsites";
import useAuth from "../services/firebase/useAuth";
const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-hieght: 100%;
`;

const StyledH1 = styled.h1`
  margin-top 0;
  
`;
const StyledP = styled.p`
display: flex;
justify-content: center;
font-size: 17pt;
`;

function Home() {
  const { user } = useAuth()
  let name = ""
  if(user.displayName > 0){
     name = user.displayName
  } else {
    name = "Back!"
  }
  return (
    <StyledRootDiv>
      <StyledH1>Welcome {name}</StyledH1>
      <StyledP>Use the search feature to view existing applications that have been reviewed</StyledP>
      <LastWebsites />
    </StyledRootDiv>
  );
}

export default Home;
