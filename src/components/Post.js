import styled from "styled-components";
import React from "react";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { db } from "../firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function Post({ username, caption, imageUrl, postId, user }) {
  const [comments, setComments] = useState([]);
  const [singleComment, setSingleComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: singleComment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setSingleComment("");
  };

  return (
    <Container>
      <PostContainer>
        <Avatar
          alt="aly"
          src="https://media.istockphoto.com/photos/put-more-in-get-more-out-picture-id1291318636?s=2048x2048"
        />
        <h3>{username}</h3>
      </PostContainer>
      <Image>
        <img src={imageUrl} alt="insta" />
      </Image>
      <UserCaption>
        <h4>
          <strong>
            {username}: {caption}
          </strong>
        </h4>
      </UserCaption>
      <CommentBox>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </CommentBox>

      {user && (
        <CommentForm>
          <CommentInput
            type="text"
            placeholder="Write a comment"
            value={singleComment}
            onChange={(e) => setSingleComment(e.target.value)}
          ></CommentInput>
          <CommentButton
            disabled={!comments}
            type="submit"
            onClick={postComment}
          >
            Post
          </CommentButton>
        </CommentForm>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 500px;
  background-color: white;
  border: 1px solid lightgray;
  margin-bottom: 45px;
  padding: 20px;
`;

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  h3 {
    margin-left: 10px;
  }
`;

const Image = styled.div`
  img {
    width: 100%;
    object-fit: contain;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
  }
`;

const UserCaption = styled.div`
  h4 {
    font-weight: normal;
    padding: 10px;
  }
`;

const CommentForm = styled.form`
  display: flex;

  margin-top: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  border: 1px solid lightgray;
`;

const CommentButton = styled.button`
  flex: 0;
  border: none;
  border: 1px solid lightgray;
  background-color: transparent;
  color: #6082a3;
`;

const CommentBox = styled.div``;
export default Post;
