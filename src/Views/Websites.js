import React, { useState, useEffect } from "react";
import { getDocs, collection, getFirestore, orderBy, query } from "firebase/firestore";
import AllWebsites from "../Components/AllWebsites";
import styled from "styled-components";

const StyledRootDiv = styled.div`
  display: flex;
  flex-direction: column;

`;

const StyledRootH1 = styled.h1`
  margin-top: 0;
`;

const StyledH2 = styled.h2`
  margin-top: 0;
  text-align: center;
`;

const StyledSelect = styled.select`
margin-top: 0;
text-align: center;
width: 100px;
`

const StyledContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
justify-content: center;
`

const StyledRootDiv1 = styled.div`
  background-color: #9BDADE;
  color:white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18pt;
  flex: 0 0  33.33333%;
  
  a:link { text-decoration: none; }
a:visited { text-decoration: none; }
a { color: inherit; } 
`;

function Websites() {
  const db = getFirestore();
  const [type, setType] = useState('');
  const [websiteList, setWebsiteList] = useState([]);
  const websitesRef = collection(db, "websites")

  const getWebsiteData = async () => {
    const data = await getDocs(query(websitesRef, orderBy("name", "asc")));
    setWebsiteList(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
  };

  useEffect(() => {
    getWebsiteData();
  }, []);

  const handleFilter= (event) => {
     setType(event.target.value)
  }

    return (
      <StyledRootDiv>
        <StyledRootH1>All existing websites</StyledRootH1>
        <StyledH2>Sort By Website Type: {""}
          <StyledSelect name="type" id="type" onChange={handleFilter}>
           <option value="All Websites">All Websites</option>
            <option value="Business">Business</option>
            <option value="News">News</option>
            <option value="Selling">Selling</option>
            <option value="Social Media">Social Media</option>
          </StyledSelect>
          </StyledH2>
          <StyledContainer>
          {websiteList.map((website) => ( <StyledRootDiv1>
            <AllWebsites type={type} website={website} />  </StyledRootDiv1>
          ))}
          </StyledContainer>
      </StyledRootDiv>
    );
  }
  
  export default Websites;