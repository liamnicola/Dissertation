import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAuth from "../services/firebase/useAuth";
import useWebsites from "../services/firebase/useWebsites";
import { collection, deleteDoc, getFirestore } from "firebase/firestore";




const StyledRootDiv = styled.div`
  background-color: #61dafb;;
  display: grid;
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

const StyledP = styled.p`
  justify-content: center;
  display: flex;
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
            websites.push({ ...doc.data() });
          });
          setWebsites(websites);
        }
      };

      useEffect(() => {
        getWebsiteData();
      }, []);

   
      const limitSorted = websites.slice(-3);
    

    return (
        <div>
            {limitSorted.map((website) => (
                <StyledRootDiv>
                <StyledH2>{website.name}</StyledH2>
                <a href="{website.link}">{website.link}</a>
                <StyledP>{website.score}</StyledP>
                </StyledRootDiv>
            ))}
        </div>
    )

};

export default LastWebsites;
