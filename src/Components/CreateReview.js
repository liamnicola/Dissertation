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


const StyledForm = styled.form`
  background: #cccccc;
  display: grid;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 0.5rem 0.8rem 0.5rem 0.8rem;
  margin: 0.9vw 0;
  border: 0;
  font-size: 20px;
  border-radius: 25px;
  width: 35vw;
`;
const StyledLabel = styled.label`
  text-align: center;
  margin-bottom: 10px;
  width: 32vw;
  font-size: 18pt;
`;

const StyledInput = styled.input`
  text-align: center;
  height: 30px;
  border-radius: 25px;
  font-size: 15pt;
  
`;

const StyledButton = styled.button`
  height: 40px;
  background: #b4eefd;
  border-radius: 22px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
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
        console.log(Valid)
        document.createReviewForm.reset();
        event.preventDefault();
        alert("Created")
    } else {
        alert("All Data must be entered")
        event.preventDefault();
  }
    };

    
    return (
        <div>
          <StyledForm name="createReviewForm" onSubmit={createReview}>
            <StyledH2>Share your experiences of the site:</StyledH2>
            <StyledLabel>Title</StyledLabel>
            <StyledInput
              type="title"
              name="title"
              placeholder="Please Enter a Title"
              {...register("title")}
              onChange={(event) => setNewTitle(event.target.value)}
            ></StyledInput>
            <label>{errors.title &&errors.title.message}</label>
            <br />
            <StyledLabel>Comment</StyledLabel>
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
