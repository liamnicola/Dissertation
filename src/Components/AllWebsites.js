import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useWebsites from "../services/firebase/useWebsites";
import {
  getFirestore,
  updateDoc,
  doc,
  getDocs,
  query,
  increment,
  addDoc,
  where,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import thumbsUp from "../assets/thumbsUp.png";
import thumbsDown from "../assets/thumbsDown.png";
import background2 from "../assets/background2.png";
import useAuth from "../services/firebase/useAuth";

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  text-align: center;
`;

const StyledRootDiv = styled.div`
  color: black;
  width: 100%;
  font-size: 12pt;
`;

const StyledImage = styled.img`
  background: #09bc8a;
  border-radius: 20px;
  cursor: pointer;
`;

const StyledImage2 = styled.img`
  background: #f7567c;
  border-radius: 20px;
  cursor: pointer;
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
  margin-top: 0px;
  font-weight: normal;
  align-items: center;
`;
const StyledVotes = styled.div`
    display: flex;
    justify-content: space-between;
    img {
      width: 50px;
      height: 50px;
    }
    cursor: pointer;
    margin: 5px;
    padding- 10px;
    span {
      width: 100px;
    }
  `;

const StyledTable = styled.table`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  align-items: flex-start;
  font-size: 20pt;
`;

function AllWebsites(props) {
  const { website, type } = props;
  const db = getFirestore();
  const { user } = useAuth();
  const [upvotes, setUpvotes] = useState([]);
  const upvotesRef = collection(db, "upvotes");
  const upvotesDoc = query(upvotesRef, where("websiteId", "==", website.id));
  const [downvotes, setDownvotes] = useState([]);
  const downvotesRef = collection(db, "downvotes");
  const downvotesDoc = query(
    downvotesRef,
    where("websiteId", "==", website.id)
  );

  const getUpvotes = async () => {
    const data = await getDocs(upvotesDoc);
    setUpvotes(
      data.docs.map((doc) => ({ userId: doc.data().userId, upvoteId: doc.id }))
    );
  };

  const getDownvotes = async () => {
    const data = await getDocs(downvotesDoc);
    setDownvotes(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        downvoteId: doc.id,
      }))
    );
  };

  const addUpvote = async () => {
    await addDoc(upvotesRef, { userId: user.uid, websiteId: website.id });
    getUpvotes();
  };

  const addDownvote = async () => {
    await addDoc(downvotesRef, { userId: user.uid, websiteId: website.id });
    getDownvotes();
  };

  const removeUpvote = async () => {
    const upvoteDeleteQuery = query(
      upvotesRef,
      where("websiteId", "==", website.id),
      where("userId", "==", user?.uid)
    );

    const upvoteData = await getDocs(upvoteDeleteQuery);
    const upvoteId = upvoteData.docs[0].id;
    const UpvoteToDelete = doc(db, "upvotes", upvoteId);
    await deleteDoc(UpvoteToDelete);
    getUpvotes();
  };

  const removeDownvote = async () => {
    const downvoteDeleteQuery = query(
      downvotesRef,
      where("websiteId", "==", website.id),
      where("userId", "==", user?.uid)
    );

    const downvoteData = await getDocs(downvoteDeleteQuery);
    const downvoteId = downvoteData.docs[0].id;
    const downvoteToDelete = doc(db, "downvotes", downvoteId);
    await deleteDoc(downvoteToDelete);
    getDownvotes();
  };

  const userLiked = upvotes.find((upvote) => upvote.userId === user.uid);
  const userDownvoted = downvotes.find(
    (downvote) => downvote.userId === user.uid
  );

  useEffect(() => {
    getUpvotes();
    getDownvotes();
  }, []);

  return (
    <StyledContainer>
      {[website].map((web) => (
        <StyledRootDiv key={web.id}>
          <StyledH2>
            <Link to={`/website/${web.id}`}>{web.name} </Link>
          </StyledH2>
          <StyledH3>{web.type}</StyledH3>
          <StyledTable>
            <thead>
              <tr>
                <th>
                  {!userDownvoted && (
                    <StyledImage
                      src={thumbsUp}
                      onClick={userLiked ? removeUpvote : addUpvote}
                    />
                  )}
                </th>
                <th>
                  {!userLiked && (
                    <StyledImage2
                      src={thumbsDown}
                      onClick={userDownvoted ? removeDownvote : addDownvote}
                    />
                  )}
                </th>
              </tr>
            </thead>
          </StyledTable>
          <StyledTable>
            <tbody>
              <tr>
                <td>
                  {upvotes && (
                    <span style={{ color: "green" }}>{upvotes.length}</span>
                  )}
                </td>
                <td>{"-"}</td>
                <td>
                  {downvotes && (
                    <span style={{ color: "red" }}>{downvotes.length}</span>
                  )}
                </td>
              </tr>
            </tbody>
          </StyledTable>
        </StyledRootDiv>
      ))}
    </StyledContainer>
  );
}

/*<StyledVotes>
                  <StyledImage alt="upvote" src={thumbsUp} onClick={()=>{
                    addUpvote(web.id)
                  }}/>&nbsp;{web.upvote - web.downvote} &nbsp; <StyledImage2 alt="downvote" src={thumbsDown} onClick={()=>{
                    downvote(web.id)
                  }}/>
                  {upvotes && <p> upvotes: {upvotes.length}</p>}
                  </StyledVotes>
                  */
//<button onClick={userLiked? removeUpvote : addUpvote}> {userLiked ? <p>Remove</p> : <p>Upvote</p>}</button>

export default AllWebsites;
