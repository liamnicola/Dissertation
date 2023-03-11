import React, { useState } from "react";
import { Link,  Redirect } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../services/firebase/useAuth";
import Form from "../Components/LoginForm";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  min-width: 100vw;
  a:-webkit-any-link {
    text-decoration: underline;
    color: white;
  }
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-top: 2%;
`;
const StyledLink = styled(Link)`
  text-align: center;
`;

function Login(props) {
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const { signInEmailUser, signInGoogleUser } = useAuth();

  const handleEmailSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signInEmailUser(email, password);
      Redirect("/Home")
    } catch (e) {
      setServerErrorMessage(e.message);
    }
  };

  const handleSocialSubmit = async (method) => {
    try {
      if (method === "google") {
        await signInGoogleUser();
        Redirect("/Home")
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <StyledWrapper>
      <div>
        <StyledHeading>Sign In To Access This Website </StyledHeading>
        <Form
          buttonText="LOGIN"
          serverErrorMessage={serverErrorMessage}
          onEmailSubmit={handleEmailSubmit}
          onSocialSubmit={handleSocialSubmit}
        />
        <StyledLink to="/join"> If You Do Not Have An Account - Join Here</StyledLink>
      </div>
    </StyledWrapper>
  );
}

export default Login;
