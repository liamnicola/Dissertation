import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useWebsites from "../services/firebase/useWebsites";
import { getFirestore, updateDoc, doc, getDocs, query, increment, addDoc, where, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import thumbsUp from "../assets/thumbsUp.png"
import thumbsDown from "../assets/thumbsDown.png"
import background2 from "../assets/background2.png"
import useAuth from "../services/firebase/useAuth";

const StyledContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
justify-content: center;
`

const StyledRootDiv = styled.div`
  background-color: #9BDADE;
  color:white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  border-style: solid;
  border-color: black;
  font-size: 18pt;
  flex: 0 0  33%;
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
const StyledH3 = styled.h3`
  justify-content: center;
  display: flex;
  font-style: italic;
  margin-top: 0px;
  font-weight: normal;
`;
const StyledVotes = styled.div`
    display: flex;
    justify-content: space-around;
    img {
      width: 50px;
      height: 50px;
    }
    cursor: pointer;
    margin-top: 5px;
  `;
function AllWebsites(props) {
    const {website, type} = props
    const db = getFirestore();
    const {user} = useAuth();
    const { getWebsites } = useWebsites();
    const [websites, setWebsites] = useState([]);
    const upvotesRef = collection(db, "upvotes")
    const upvotesDoc = async (id) => { query(upvotesRef, where("postId", "==", websites.id)) }

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
      
    
    const getUpvotes = async () => {
      const data = await getDocs(upvotesRef)
      //console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    const addUpvote = async (id) => {
      await addDoc(upvotesRef, {userId: user.uid, websiteId: id});
    }

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
        downvote: increment(1) 
        })
        getWebsiteData();
    }

    useEffect(() => {
      getWebsiteData();
    }, []);
    
    const filtered = website.filter((item) => {
      return type === '' ? item: item.type.includes(type)
    })
    
    
    return (
        <div style={{
          backgroundImage: `url(${background2})`
        }}>
              {type.length > 0 && <StyledContainer>
                {filtered.map((web) => (
                  <StyledRootDiv>
                  <StyledH2><Link to= {`/website/${web.id}`}>{web.name} </Link></StyledH2>
                  <StyledH3>{web.type}</StyledH3>
                  <a href={web.link}>Visit Website</a> <br/>
                  <StyledVotes>
                  <StyledImage alt="upvote" src={thumbsUp} onClick={()=>{
                    upvote(web.id)
                  }}/>&nbsp;{web.upvote - web.downvote} &nbsp; <StyledImage2 alt="downvote" src={thumbsDown} onClick={()=>{
                    downvote(web.id)
                  }}/>
                  </StyledVotes>
                  </StyledRootDiv>
                ))}
                </StyledContainer>
                }
              {type ==="All Websites" || type.length === 0 ?<StyledContainer>
                {website.map((web) => (
                  <StyledRootDiv>
                  <StyledH2><Link to= {`/website/${web.id}`}>{web.name} </Link></StyledH2>
                  <StyledH3>{web.type}</StyledH3>
                  <a href={web.link}>Visit Website</a> <br/>
                  <StyledVotes>
                  <StyledImage alt="upvote" src={thumbsUp} onClick={()=>{
                    addUpvote(web.id)
                  }}/>&nbsp;{web.upvote - web.downvote} &nbsp; <StyledImage2 alt="downvote" src={thumbsDown} onClick={()=>{
                    downvote(web.id)
                  }}/>
                  </StyledVotes>
                  </StyledRootDiv>
                  ))}
              </StyledContainer> : null
              }
          </div>
    )   
};

export default AllWebsites;
