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

function Home() {
  const { user } = useAuth()
  let name = ""
  if(user.displayName === user.displayName){
     name = user.displayName
  } else {
    name = "Back!"
  }
  return (
    <StyledRootDiv>
      <StyledH1>Welcome {name}</StyledH1>
      <LastWebsites />
    </StyledRootDiv>
  );
}

export default Home;
