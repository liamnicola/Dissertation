import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAuth from "../services/firebase/useAuth";
import useWebsites from "../services/firebase/useWebsites";
import { collection, deleteDoc, getFirestore, updateDoc, doc, increment } from "firebase/firestore";


const StyledContainer = styled.div`
  //display: inline-block;
`

const StyledRootDiv = styled.div`
  background-color: #61dafb;;
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

const StyledH2 = styled.h2`
  justify-content: center;
  display: flex;
  font-weight: bold;
  margin-top: 20px;
`;

function AllWebsites() {
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
        score: increment(1) 
      })
      getWebsiteData();
    }

    const downvote = async (id) => {
      const webDoc = doc(db, "websites", id)
      await updateDoc(webDoc, {
        score: increment(-1) 
        })
        getWebsiteData();
    }

    useEffect(() => {
      getWebsiteData();
    }, []);

    


    return (
        <StyledContainer>
            {websites.map((website) => (
                <StyledRootDiv>
                <StyledH2>{website.name}</StyledH2>
                <a href="{website.link}">{website.link}</a>
                <p><button onClick={()=>{
                  upvote(website.id)
                }}>Upvote</button>{" "}{website.score}{" "}<button onClick={()=>{
                  downvote(website.id)
                }}>Downvote</button></p>
                </StyledRootDiv>
            ))}
        </StyledContainer>
    )

};

export default AllWebsites;
