import styled from "styled-components";
import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import Header from "./components/Header.js";
import Post from "./components/Post.js";
import ModalSignUp from "./components/ModalSignUp";
import ImageUpload from "./components/ImageUpload";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //everytime the db is changed or modified fire off this code again and upload
    //when page load it will map through db colection and pull every doc from there
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    //listens for any user change/update it changes in db
    const unsubsribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    });
    return () => {
      //perfom some cleanup actions
      unsubsribe();
    };
  }, [user, username]);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  //USEEFFECT runs a piece of code based on a specific condition
  return (
    <Container>
      <Header />
      <ModalSignUp
        signUp={signUp}
        signIn={signIn}
        user={user}
        open={open}
        setOpen={setOpen}
        setUser={setUser}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      {posts.map(({ post, id }) => {
        return (
          <Post
            caption={post.caption}
            username={post.username}
            imageUrl={post.imageUrl}
            key={id}
            postId={id}
            user={user}
          />
        );
      })}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Please Log in!</h3>
      )}
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
