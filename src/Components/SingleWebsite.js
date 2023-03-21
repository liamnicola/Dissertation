import { useParams, useHistory } from "react-router-dom"
import styled from "styled-components";
import useWebsite from "../services/firebase/useWebsite";
import React, { useEffect, useState } from "react";
import { query, orderBy, where} from "firebase/firestore";
import {
    doc,
    addDoc,
    collection,
    getDoc,
    getDocs,
    getFirestore,
    deleteDoc,
  } from "firebase/firestore";
import ReviewForm from "./CreateReview";
import PropTypes from "prop-types";

const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: 250px;
  font-size: 18pt;
  position: relative;
  margin-left: 25%;
  margin-bottom: 15px;
`;

const StyledButton = styled.button`
background: linear-gradient(to right top, #BF81A0, #8766A7, #5694A0  );
border-radius: 22px;
color: white;
cursor: pointer;
margin-top: 12px;
font-size: 14pt;
float: left;

`

function SingleWebsite() {
    const {id} = useParams()
    const db = getFirestore();
    const ref = doc(db, "websites", id);
    const [website, setWebsite] = useState([]);
    const history= useHistory();
    const subRef = collection(db, `websites/${id}/reviews`)
    const [sub, setSub] = useState([]);
    

    const getData = async () => {
        let website = []
        await getDoc(ref)
        .then((doc) => {
            website.push({ ...doc.data(), id: doc.id });

        }) 
        setWebsite(website)
    }


    const getSubData = async () => {
        const subSnap = await getDocs(subRef)
        let sub = []
        if (subSnap.size > 0){
            subSnap.forEach((doc) => {
                sub.push({ ...doc.data(), id: doc.id })
            });
            setSub(sub)
        }
        
    }
        useEffect(() => {
            getData();
            getSubData();
          }, []);
    
    const back =() => {
        history.goBack();
    }

    return(
        <StyledRootDiv>
            <StyledButton onClick={back}>Go Back</StyledButton>    
            {website.map((w) => (<div><h1>{w.name}</h1> <p>{w.link}</p><p>Current Score: {w.score}</p><p>Description:</p><p>{w.reviews}</p></div>))}
            <ReviewForm props={id}/>
            {sub.map((s) => (<div><h3>{s.title}</h3> <p>{s.comment}</p> </div>))}
        </StyledRootDiv>
    )
}


export default SingleWebsite;