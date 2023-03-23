import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Form from "../Components/LoginForm";
import useAuth from "../services/firebase/useAuth";
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



function Join(props) {
  const { createEmailUser, signInGoogleUser } = useAuth();
  const [severErrorMessage, setServerErrorMessage] = useState();
  const navigate = useHistory();

  const handleEmailSubmit = async (data) => {
    try {
      const { email, password } = data;
      await createEmailUser(email, password);
      navigate("/");
    } catch (e) {
      setServerErrorMessage(e.message);
    }
  };

  const handleSocialSubmit = async (method) => {
    try {
      if (method === "google") {
        await signInGoogleUser();
        navigate("/");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <StyledWrapper>
      <div>
        <StyledHeading>Join With </StyledHeading>
        <Form
          onSocialSubmit={handleSocialSubmit}
          onEmailSubmit={handleEmailSubmit}
          serverErrorMessage={severErrorMessage}
        />
        <StyledLink to="/login"> Already a member - Login </StyledLink>
      </div>
    </StyledWrapper>
  );
}

Join.propTypes = {};

export default Join;
