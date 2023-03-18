import { useParams } from "react-router-dom"
import styled from "styled-components";
import useWebsite from "../services/firebase/useWebsite";
import React, { useEffect, useState } from "react";
import { query, orderBy, where} from "firebase/firestore";
import {
    doc,
    addDoc,
    collection,
    getDoc,
    getFirestore,
    deleteDoc,
  } from "firebase/firestore";

const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: 25px;
  font-size: 18pt;
  position: relative;
  margin-left: 25%;
  margin-bottom: 15px;
`;

function SingleWebsite() {
    const {id} = useParams()
   
    const db = getFirestore();
    const ref = doc(db, "websites", id);
    const [website, setWebsite] = useState([]);
    

    const getData = async () => {
        let website = []
        await getDoc(ref)
        .then((doc) => {
            website.push({ ...doc.data(), id: doc.id });

        }) 
        setWebsite(website)
    }
        useEffect(() => {
            getData();
          }, []);
    

    return(
        <StyledRootDiv>
            <h2>Website ID - {id}</h2>      
            {website.map((w) => (<div><h3>Name: {w.name}</h3> <p>Current Score: {w.score}</p> <p>Link: {w.link}</p><p>Description:</p><p>REVIEWS</p></div>))}
        </StyledRootDiv>
    )
}

export default SingleWebsite;