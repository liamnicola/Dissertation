import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useWebsites from "../services/firebase/useWebsites";
import { getFirestore, updateDoc, doc, increment } from "firebase/firestore";
import { Link } from "react-router-dom";
import thumbsUp from "../assets/thumbsUp.png"
import thumbsDown from "../assets/thumbsDown.png"

const StyledRootDiv = styled.div`
background-color: #b4eefd;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 50%;
border-radius: 25px;
border-style: solid;
font-size: 18pt;
position: relative;
margin-left: 25%;
margin-bottom: 15px;
a:link { text-decoration: none; }
a:visited { text-decoration: none; }
a { color: inherit; } 
`;
const StyledImage = styled.img`
  background: #33ff33;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 15px;
  margin-right: 10px;
`;

const StyledImage2 = styled.img`
  background: #ff3333;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 15px;
  margin-left: 10px;
`;
const StyledH2 = styled.h2`
  justify-content: center;
  display: flex;
  font-weight: bold;
  margin-top: 20px;
`;

const StyledP = styled.p`
  justify-content: center;
  display: flex;
`;
const StyledVotes = styled.div`
    display: flex;
    justify-content: space-around;
    img {
      width: 50px;
      height: 50px;
    }
    cursor: pointer;
  `;
function LastWebsites() {
    const db = getFirestore();
    const { getWebsites } = useWebsites();
    const [websites, setWebsites] = useState([]);


    const getWebsiteData = async () => {
        const websiteSnap = await getWebsites();
        let websites = [];
        if (websiteSnap.size > 0) {
          websiteSnap.forEach((doc) => {
            websites.push({ ...doc.data(), id: doc.id });
          });
          setWebsites(websites);
        }
      };

      const upvote = async (id) => {
        const webDoc = doc(db, "websites", id)
        await updateDoc(webDoc, {
          upvote: increment(1) 
        })
        getWebsiteData();
      }
  
      const downvote = async (id) => {
        const webDoc = doc(db, "websites", id)
        await updateDoc(webDoc, {
          downvote: increment(-1) 
          })
          getWebsiteData();
      }
      useEffect(() => {
        getWebsiteData();
      }, []);

   
      const limitSorted = websites.slice(-3);
    

    return (
        <div>
            {limitSorted.map((website) => (
                <StyledRootDiv>
                <StyledH2><Link to= {`/website/${website.id}`}>{website.name} </Link></StyledH2>
                <a href={website.link}>Visit Website</a> <br />
                <StyledVotes>
                <StyledImage alt="upvote" src={thumbsUp} onClick={()=>{
                  upvote(website.id)
                }}/>{" "}{website.upvote + website.downvote}{" "}<StyledImage2 alt="downvote" src={thumbsDown} onClick={()=>{
                  downvote(website.id)
                }}/>
                </StyledVotes>


            

                </StyledRootDiv>
            ))}
        </div>
    )

};

export default LastWebsites;
