import { useParams, useHistory } from "react-router-dom"
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
    doc,
    collection,
    getDoc,
    getDocs,
    getFirestore,
    deleteDoc,
    orderBy,
    query
  } from "firebase/firestore";
import ReviewForm from "./CreateReview";
import useAuth from "../services/firebase/useAuth";
import trash from "../assets/trash.png"

const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 33%;
  font-size: 18pt;
  position: relative;
  margin-bottom: 15px;
  justify-content: center;
  a:link { text-decoration: udnerline; }
  a:visited { text-decoration: underline; }
  a { color: inherit; } 
`;

const StyledImage = styled.img`
  background: #ff3333;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 15px;
  margin-right: 5px;
margin-left: auto;
`;

const StyledButton = styled.button`
background: #b4eefd;
border-radius: 22px;
cursor: pointer;
margin-top: 12px;
font-size: 14pt;
`
const StyledButton2 = styled.button`
display: flex;
background:  red;
border-radius: 22px;
color: white;
cursor: pointer;
margin-top: 12px;
margin-bottom: 12px;
font-size: 14pt;
justify-content: center;
align-items: center;
`

const StyledDiv = styled.div`
    
    flex-direction: column;
    border-bottom: solid;
    border-color: #cccccc;
    width: 90%;
`;
const StyledH3 = styled.h3`

  margin-top: 0px;
  
  
`;

const StyledH2 = styled.h2`
  
  border-bottom: solid
  
  
`;
const StyledP = styled.p`
display: flex;
justify-content: center;
align-items: left;
margin-top: 3px;
`;
const StyledP2 = styled.p`
margin-top: 3px;
`;

function SingleWebsite() {
    const {id} = useParams()
    const db = getFirestore();
    const ref = doc(db, "websites", id);
    const [website, setWebsite] = useState([]);
    const history= useHistory();
    const subRef = collection(db, `websites/${id}/reviews`)
    const [sub, setSub] = useState([]);
    const { user } = useAuth();
    

    const getData = async () => {
        let website = []
        await getDoc(ref)
        .then((doc) => {
            website.push({ ...doc.data(), id: doc.id });

        }) 
        setWebsite(website)
    }


    const getSubData = async () => {
        const subSnap = await getDocs(query(subRef, orderBy("date", "asc")))
        let sub = []
        if (subSnap.size > 0){
            subSnap.forEach((doc) => {
                sub.push({ ...doc.data(), id: doc.id })
            });
            setSub(sub)
        }
        
    }

    const amount = sub.length;
    let message = "";
    if (amount === 0){
        message = "There are currently no reviews for this website"
    } else if (amount === 1) {
        message = `${amount} User Review`
    } 
    else {
        message = `${amount} User Reviews`
    }

    const deleteReview = async (subID) => {
        const deleteRef = doc(db, `websites/${id}/reviews/${subID}`)
        await deleteDoc(deleteRef);
        setSub(sub);
        getSubData();
      };


    
    const back =() => {
        history.goBack();
    }

    useEffect(() => {
        getData();
        getSubData();
      }, []);

    return(
        <StyledRootDiv>
            <StyledButton onClick={back}>Go Back</StyledButton>    
            {website.map((w) => (<div>
                <h1>{w.name}</h1> 
                <StyledP><a href={w.link}>Visit Website</a> <br /></StyledP>
                <StyledP>Description: {w.description}</StyledP>
                <StyledP>Current Score: {w.upvote + w.downvote}</StyledP>
            </div>))}
            <ReviewForm props={id}/>
                
            <StyledH2>{message}</StyledH2>
            {sub.map((s) => (<StyledDiv>
                <StyledH3>{s.title}</StyledH3>
                <StyledP2>{s.comment}</StyledP2>
                <StyledP2>Posted: {s.date}</StyledP2>
                {s.account === user.email &&
                    <StyledImage alt="delete" src={trash} onClick={()=>{
                        deleteReview(s.id)
                      }}/>
                }
            </StyledDiv>))}
        </StyledRootDiv>
    )
}


export default SingleWebsite;