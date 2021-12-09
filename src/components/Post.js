import styled from "styled-components";
import React from "react";
import { Avatar } from "@mui/material";

function Post({ username, caption, imageUrl }) {
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
    </Container>
  );
}

const Container = styled.div`
  max-width: 500px;
  background-color: white;
  border: 1px solid lightgray;
  margin-bottom: 45px;
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
export default Post;
