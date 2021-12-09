import styled from "styled-components";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import Header from "./components/Header.js";
import Post from "./components/Post.js";
import ModalSignUp from "./components/ModalSignUp";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //everytime the db is changed or modified fire off this code again and upload
    //when page load it will map through db colection and pull every doc from there
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  //USEEFFECT runs a piece of code based on a specific condition
  return (
    <Container>
      <Header />
      <ModalSignUp />
      {posts.map(({ post, id }) => {
        return (
          <Post
            caption={post.caption}
            username={post.username}
            imageUrl={post.imageUrl}
            key={id}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* background-color: #fafafa; */
`;

export default App;
