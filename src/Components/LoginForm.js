import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import google from "../assets/google.png";
//import Button from "../Components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const StyledErrorLabel = styled.label`
    color: red;
    font-weight: bolder;
    margin: 1% 0 4% 0;
  `;

const StyledHeading = styled.h2`
    text-align: center;
    margin-top: 2%;
  `;

const StyledSocialIconArea = styled.div`
    display: flex;
    justify-content: space-around;
    img {
      width: 50px;
      height: 50px;
    }
  `;
  const StyledButton = styled.button`
  height: 50px;
  width: 200px;
  background: linear-gradient(to right top, #BF81A0, #8766A7, #5694A0  );
  border-radius: 22px;
  color: white;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 14pt;
`;


function LoginForm(props) {
  const { buttonText, onEmailSubmit, onSocialSubmit, serverErrorMessage } = props;
  const schema = yup
    .object({
      email: yup
        .string()
        .email("please enter an email that is valid")
        .required("please enter an email"),
      password: yup
        .string()
        .required("please enter a password")
        .min(5, "password must a minimum of 5 characters"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const errorBorder = (error) => error && { borderColor: "red" };
  return (
    <React.Fragment>
      <StyledSocialIconArea>
        <img src={google}onClick={() => onSocialSubmit("google")} />
      </StyledSocialIconArea>
      <StyledHeading> OR </StyledHeading>

        <form onSubmit={handleSubmit(onEmailSubmit)}>
          <p>
            <label> Email </label>
          </p>
          <p>
            <input
              type="text"
              style={errorBorder(errors.email)}
              {...register("email")}
            />
            <StyledErrorLabel>{errors?.email?.message}</StyledErrorLabel>
          </p>

          <label> Password </label>
          <p>
            <input
              type="password"
              name="password"
              {...register("password")}
              style={errorBorder(errors.password)}
            />
            <StyledErrorLabel>{errors?.password?.message}</StyledErrorLabel>
          </p>
          <StyledErrorLabel> {serverErrorMessage} </StyledErrorLabel>
          <StyledButton text={buttonText} type="submit">Submit</StyledButton>
        </form>
      
    </React.Fragment>
  );
}

LoginForm.propTypes = {
  buttonText: PropTypes.string,
};

LoginForm.defaultProps = {
  buttonText: "JOIN",
};

export default LoginForm;
