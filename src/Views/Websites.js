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
border-radius: 25px;
height: 25px;
`

const StyledContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
justify-content: center;
margin-bottom: 10px;
`

const StyledRootDiv1 = styled.div`
background-color: #B0FEFF;
  color:white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18pt;
  flex: 0 0  25%;
  border-radius: 20px;
  border: solid black 2px;
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

  const filtered = websiteList.filter((item) => {
    return type === '' ? item: item.type.includes(type)
  })
    return (
      <StyledRootDiv>
        <StyledRootH1>All existing websites</StyledRootH1>
        <StyledH2>Sort By Website Type: {""}
          <StyledSelect name="type" id="type" onChange={handleFilter}>
           <option value="">All Websites</option>
            <option value="Business">Business</option>
            <option value="News">News</option>
            <option value="E-Commerce & Marketplace">E-Commerce & Marketplace</option>
            <option value="Social Media">Social Media</option>
          </StyledSelect>
          </StyledH2>
            {type.length > 0 && <StyledContainer>
          {filtered.map((website) => ( <StyledRootDiv1 key={website.id}>
            <AllWebsites website={website} />  </StyledRootDiv1>
          ))}
          </StyledContainer>}
            {type === "All Websites" || type.length === 0 ?<StyledContainer>
          {filtered.map((website) => ( <StyledRootDiv1 key={website.id}>
            <AllWebsites website={website} />  </StyledRootDiv1>
          ))}
          </StyledContainer> : null}
      </StyledRootDiv>
    );
  }
  
  export default Websites;