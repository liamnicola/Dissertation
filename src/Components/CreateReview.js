import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import useAuth from "../services/firebase/useAuth";
import { useHistory } from 'react-router-dom';

const StyledForm = styled.form`
  background: #cccccc;
 
  color: black;
  justify-content: center;
  align-items: center;
  align-content: center;

  padding: 0.5rem 0.8rem 0.5rem 0.8rem;
  margin: 0.9vw 0;
  border: 0;
  font-size: 20px;
  border-radius: 25px;
  width: 50vw;
`;
const StyledLabel = styled.label`
  text-align: left;
  margin-bottom: 10px;
  width: 32vw;
  font-size: 18pt;
`;

const StyledInput = styled.input`
width: 100%;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
`;

const StyledButton = styled.button`
width: 100%;
background-color: #4CAF50;
color: white;
padding: 14px 20px;
margin: 8px 0;
border: none;
border-radius: 4px;
cursor: pointer;
`;
const StyledH2 = styled.h2`
  justify-content: center;
  display: flex;
  font-weight: bold;
  margin-top: 20px;
`;

function ReviewForm(props) {
    const id = props.props;
    const db = getFirestore();
    const subRef = collection(db, `websites/${id}/reviews`)
    const [newTitle, setNewTitle] = useState("");
    const [newComment, setNewComment] = useState("");
    const { user } = useAuth();
    const formSchema = yup.object({
        title: yup.string().required("Title is Required"),
        comment: yup.string().required("Comment is Required"),
    }).required();
    const history = useHistory();
    const moment = require('moment');
    const date = moment();
    const newDate = date.format('YYYY-MM-DD')
    const {register, formState: { errors }, watch} = useForm({resolver: yupResolver(formSchema),defaultValues: {title: "", comment: ""} ,});

    const createReview = async (event) => {
        let formData = {
            title: newTitle,
            comment: newComment,
            account: user.email,
            date: newDate
        }
        const Valid = await formSchema.isValid(formData)
        if(Valid === true){
        addDoc(subRef, {
        ...formData
        });
        event.preventDefault();
        alert("created")
    } else {
        alert("All Data must be entered")
        event.preventDefault();
  }
    };

    
    return (
        <div>
          <StyledForm name="createReviewForm" onSubmit={createReview}>
            <StyledH2>Share Your Experience:</StyledH2>
            <StyledLabel>Review Title:</StyledLabel>
            <StyledInput
              type="title"
              name="title"
              placeholder="Please Enter a Title"
              {...register("title")}
              onChange={(event) => setNewTitle(event.target.value)}
            ></StyledInput>
            <label>{errors.title &&errors.title.message}</label>
            <br />
            <StyledLabel>Review Comment:</StyledLabel>
            <StyledInput
              type="comment"
              name="comment"
              placeholder="Please Enter a Comment"
              {...register("comment")}
              onChange={(event) => setNewComment(event.target.value)}
            ></StyledInput>
            <label>{errors.comment&&errors.comment.message}</label>
            <br />
            <br/>
            <StyledButton type="submit" onSubmit={createReview}>
              Submit
            </StyledButton>
            <br/>
          </StyledForm>
        </div>
      );

}

ReviewForm.propTypes = {
  id: PropTypes.string.isRequired
};

export default ReviewForm;
