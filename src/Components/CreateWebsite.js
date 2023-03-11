import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  doc,
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import useAuth from "../services/firebase/useAuth";

/*rgb(63, 94, 251);
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );*/

const StyledForm = styled.form`
  background: #232222;
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
`;
const StyledLabel = styled.label`
  text-align: center;
  margin-bottom: 10px;
  
`;

const StyledInput = styled.input`
  text-align: center;
  height: 25px;
  border-radius: 25px;

`;

const StyledButton = styled.button`
  height: 50px;
  background: linear-gradient(to right top, #BF81A0, #8766A7, #5694A0  );
  border-radius: 22px;
  color: white;
  cursor: pointer;
  margin-top: 6%;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

function WebsiteForm() {
  const db = getFirestore();

  const [newName, setNewName] = useState("");
  const [newLink, setNewLink] = useState("");
  //const [newScore, setNewScore] = useState(0);
  const websiteCollectionRef = collection(db, "websites");

  const formSchema = yup.object({
    name: yup.string().required("Name is Required"),
    link: yup.string().required("Link is Required"),
    //score: yup.number()
  }).required();
  

  const {register, formState: { errors }, watch} = useForm({resolver: yupResolver(formSchema),defaultValues: {name: "", link: "", score: 0} ,});

  const { user } = useAuth();
  

  const createWebsite = async (event) => {
    let formData = {
      name: newName,
      link: newLink,
      score: 0,
    }
    const Valid = await formSchema.isValid(formData)
    if(Valid ===true){
    addDoc(websiteCollectionRef, {
      ...formData
    });
    console.log(Valid)
    event.preventDefault();
    document.createWebsiteForm.reset();
    alert("Created")
  } else {
    alert("All Data must be entered")
    event.preventDefault();
  }
  };

  return (
    <div>
      <StyledForm name="createWebsiteForm" onSubmit={createWebsite}>
        <StyledLabel>Name </StyledLabel>
        <StyledInput
          type="name"
          name="name"
          placeholder="Please Enter a Name"
          {...register("name")}
          onChange={(event) => setNewName(event.target.value)}
        ></StyledInput>
        <label>{errors.name &&errors.name.message}</label>
        <br />
        <StyledLabel>Website's Link </StyledLabel>
        <StyledInput
          type="link"
          name="link"
          placeholder="Please Enter the link"
          {...register("link")}
          onChange={(event) => setNewLink(event.target.value)}
        ></StyledInput>
        <label>{errors.link&&errors.link.message}</label>
        <br />
        <StyledButton type="submit" onSubmit={createWebsite}>
          Submit
        </StyledButton>
      </StyledForm>
    </div>
  );
}

export default WebsiteForm;
