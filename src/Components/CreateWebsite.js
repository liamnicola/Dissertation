import React, {useState} from "react";
import { useHistory } from 'react-router-dom';

import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";

const StyledForm = styled.form`
  background: #cccccc;
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
  color: black;
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
  background:#b4eefd;
  border-radius: 22px;
  cursor: pointer;
  margin-top: 6%;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
const StyledContainer = styled.div`
    height: 1000px;;
`

function WebsiteForm() {
  const db = getFirestore();

  const [newName, setNewName] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState("");
  const history = useHistory();
  const websiteCollectionRef = collection(db, "websites");

  const formSchema = yup.object({
    name: yup.string().required("Name is Required"),
    link: yup.string().required("Link is Required"),
  }).required();
  

  const {register, formState: { errors }, watch} = useForm({resolver: yupResolver(formSchema),defaultValues: {name: "", link: ""} ,});


  const createWebsite = async (event) => {
    let formData = {
      name: newName,
      link: newLink,
      description: newDesc,
      type: newType
    }
    const Valid = await formSchema.isValid(formData)
    if(Valid ===true){
      addDoc(websiteCollectionRef, {
        ...formData
      });
      event.preventDefault();
      history.push('/websites');
  } else {
      alert("All Data must be entered")
      event.preventDefault();
    } 
  };

  return (
    <StyledContainer>
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
        <StyledLabel>Domain Name</StyledLabel>
        <StyledLabel>In order for extension to work please use the <span style={{ fontWeight: "bold"}}>full domain </span>(include any subdomains to the link e.g www. or blog. etc)</StyledLabel>
        <StyledInput
          type="link"
          name="link"
          placeholder="Please Enter the full domain name"
          {...register("link")}
          onChange={(event) => setNewLink(event.target.value)}
        ></StyledInput>
        <label>{errors.link&&errors.link.message}</label>
        <br />
        <StyledLabel>Website Description</StyledLabel>
            <StyledInput
              type="description"
              name="description"
              placeholder="Please Enter a Description"
              {...register("description")}
              onChange={(event) => setNewDesc(event.target.value)}
            ></StyledInput>
            <label>{errors.comment&&errors.description.message}</label>
            <br />
            <StyledLabel>Website Type</StyledLabel>
            <select placeholder=""{...register("type")}
              onChange={(event) => setNewType(event.target.value)}> 
              <option selected disabled>Please Choose Type</option>
              <option value="Social Media">Social Media</option>
              <option value="E-Commerce & Marketplace">E-Commerce & Marketplace</option>
              <option value="Business">Business</option>
              <option value="News">News</option>
            </select>
            <br />
        <StyledButton type="submit" onSubmit={createWebsite}>
          Submit
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}

export default WebsiteForm;
