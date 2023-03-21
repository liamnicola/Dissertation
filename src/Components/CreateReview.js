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


const StyledForm = styled.form`
  background: #232222;
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
  height: 40px;
  background: linear-gradient(to right top, #BF81A0, #8766A7, #5694A0  );
  border-radius: 22px;
  color: white;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
`;


function ReviewForm(props) {
    const id = props.props;
    const db = getFirestore();
    const subRef = collection(db, `websites/${id}/reviews`)
    const [newTitle, setNewTitle] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newDate, setNewDate] = useState("");

    const formSchema = yup.object({
        title: yup.string().required("Title is Required"),
        comment: yup.string().required("Comment is Required"),
    }).required();

    const {register, formState: { errors }, watch} = useForm({resolver: yupResolver(formSchema),defaultValues: {title: "", comment: ""} ,});

    const createReview = async (event) => {
        let formData = {
            title: newTitle,
            comment: newComment
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

    useEffect(() => {
      //createReview();
    }, []);
    return (
        <div>
          <StyledForm name="createReviewForm" onSubmit={createReview}>
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
            <StyledButton type="submit" onSubmit={createReview}>
              Submit
            </StyledButton>
          </StyledForm>
        </div>
      );

}

ReviewForm.propTypes = {
  id: PropTypes.string.isRequired
};

export default ReviewForm;
