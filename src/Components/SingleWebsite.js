import { useParams, useHistory, Link } from "react-router-dom"
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
    query,
    where
  } from "firebase/firestore";
import ReviewForm from "./CreateReview";
import useAuth from "../services/firebase/useAuth";
import trash from "../assets/trash.png"

const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18pt;
  margin-bottom: 15px;
  justify-content: center;
  a:link { text-decoration: underline; }
  a:visited { text-decoration: underline; }
  a { color: inherit; } 
`;

const StyledImage = styled.img`
  background: #ff3333;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 5px;
`;


const StyledButton = styled.button`
background: #b4eefd;
border-radius: 22px;
cursor: pointer;
margin-top: 12px;
font-size: 14pt;
`
const StyledDiv = styled.div`
width: 50%;

`;

const StyledDiv2 = styled.div`
    margin-top:20px;
    margin-bottom:15px;
    flex-direction: column;
    width: 90%;
    background: white;
    color: black;
    padding: 10px;
    padding-bottom: 0;
    border-radius: 25px;
    border: solid 2px;
`;

const StyledDiv3 = styled.div`
    flex-direction: column;
    width: 100%;
    border-bottom: solid;
    margin-bottom: 10px;
`;
const StyledH3 = styled.h3`
  margin-top: 0px;
`;

const StyledH2 = styled.h2`
  border-bottom: solid;
  margin: 0;
  text-align: center;
`;

const StyledP2 = styled.p`
margin-top: 3px;

`;

const StyledSpan = styled.span`
  margin-left: 8px;
  margin-right: 8px;
`;
const StyledTable = styled.table`
    text-align: center;
    font-size: 20pt;
    padding: 0;
    margin: 0;
    width: 100%;
  `
const StyledTr = styled.tr`
  height: 100px;
`

function SingleWebsite() {
    const {id} = useParams();
    const db = getFirestore();
    const ref = doc(db, "websites", id);
    const [website, setWebsite] = useState([]);
    const history= useHistory();
    const subRef = collection(db, `websites/${id}/reviews`)
    const [sub, setSub] = useState([]);
    const { user } = useAuth();
    const [upvotes, setUpvotes] = useState([]);
    const upvotesRef = collection(db, "upvotes");
    const upvotesDoc = query(upvotesRef, where("websiteId", "==", id));
    const [downvotes, setDownvotes] = useState([]);
    const downvotesRef = collection(db, "downvotes");
    const downvotesDoc = query(downvotesRef, where("websiteId", "==", id));

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


    const getUpvotes = async () => {
        const data = await getDocs(upvotesDoc)
        setUpvotes(data.docs.length)
    }

    const getDownvotes = async () => {
        const data = await getDocs(downvotesDoc)
        setDownvotes(data.docs.length)
    }
    let rating = 0; 
        if (upvotes >0 || downvotes > 0){
            rating = Math.round((upvotes / (upvotes + downvotes)) * 100)
        } else {
            rating = "Unavailable"
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


    const userReviewed = sub.find((review)=> review.account === user.email);

    const deleteReview = async (subID) => {
        const deleteRef = doc(db, `websites/${id}/reviews/${subID}`)
        await deleteDoc(deleteRef);
        setSub(sub);
        getSubData();
      };

    
    const back =() => {
        history.push("/Websites");
    }

    useEffect(() => {
        getData();
        getSubData();
        getUpvotes();
        getDownvotes();
      }, []);

    return(
        <StyledRootDiv>
            <StyledButton onClick={back}>← All Websites</StyledButton>    
            {website.map((w) => (<StyledDiv key={w.id}>
                <h1>{w.name}</h1> 
                <StyledTable>
                <thead>
                <tr>
                <td colSpan="2">Description: {w.description}</td>
                </tr>
                </thead>
                <tbody>
                <StyledTr>
                <td>Score: {rating}%</td>
                <td><StyledSpan style={{color:'green'}}>{upvotes}</StyledSpan>-<StyledSpan style={{color:'red'}}>{downvotes}</StyledSpan></td>
                </StyledTr>
                <StyledTr>
                    <td><Link to= {`/websites`}>Vote Here</Link></td>
                    <td><a href={`https://${w.link}`}>Visit Website </a></td>
                </StyledTr>
                </tbody>
                </StyledTable>
                {!userReviewed && <ReviewForm props={w.id}/> }
            </StyledDiv>))}

                
            { message === "There are currently no reviews for this website" ?
            <StyledH2>{message}</StyledH2>
            :
            <StyledDiv2>
            <StyledH2>{message}</StyledH2>
            {sub.map((s) => (<StyledDiv3 key={s.id}>
                <StyledH3>{s.title}</StyledH3>
                <StyledP2>{s.comment}</StyledP2>
                <StyledP2>Posted: {s.date}</StyledP2>
                {s.account === user.email &&
                    <StyledImage alt="delete" src={trash} onClick={()=>{
                        deleteReview(s.id)
                      }}/>
                }
            </StyledDiv3>))}
            </StyledDiv2>
}
        </StyledRootDiv>
    )
}

export default SingleWebsite;