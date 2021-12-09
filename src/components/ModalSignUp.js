import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { db, auth } from "../firebase";
import ModalSignIn from "./ModalSignIn";

function ModalSignUp({
  open,
  setOpen,
  signUp,
  signIn,
  user,
  setUser,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) {
  // const [open, setOpen] = useState(false);
  // const [openSignIn, setOpenSignIn] = useState(false);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // useEffect(() => {
  //   //listens for any user change/update it changes in db
  //   const unsubsribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       //user has logged in
  //       console.log(authUser);
  //       setUser(authUser);
  //     } else {
  //       //user has logged out
  //       setUser(null);
  //     }
  //   });
  //   return () => {
  //     //perfom some cleanup actions
  //     unsubsribe();
  //   };
  // }, [user, username]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };

  // const signUp = (event) => {
  //   event.preventDefault();

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((authUser) => {
  //       return authUser.user.updateProfile({
  //         displayName: username,
  //       });
  //     })
  //     .catch((error) => alert(error.message));

  //   setOpen(false);
  // };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <SignUpContainer>
            <SignUpForm>
              <SignUpImage>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1600px-Instagram_logo.svg.png"
                  alt="Instagram logo"
                />
              </SignUpImage>

              <SignUpUsername
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></SignUpUsername>
              <SignUpEmail
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></SignUpEmail>
              <SignUpPassword
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></SignUpPassword>
              <LoginButton type="submit" onClick={signUp}>
                SIGN UP
              </LoginButton>
            </SignUpForm>
          </SignUpContainer>
        </Box>
      </Modal>
      {user ? (
        <Button onClick={() => auth.signOut()}>LOGOUT</Button>
      ) : (
        <LoginContainer>
          <ModalSignIn
            signIn={signIn}
            open={open}
            setOpen={setOpen}
            user={user}
            setUser={setUser}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
          <Button onClick={() => setOpen(true)}>SignUp</Button>
        </LoginContainer>
      )}
    </>
  );
}

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignUpImage = styled.div`
  img {
    width: 90px;
    height: 90px;
    object-fit: contain;
  }
`;

const SignUpUsername = styled.input`
  border: none;
  margin-bottom: 8px;
  border-bottom: 1px solid lightgray;
`;
const SignUpEmail = styled.input`
  margin-bottom: 8px;
  border: none;
  border-bottom: 1px solid lightgray;
`;
const SignUpPassword = styled.input`
  margin-bottom: 8px;
  border: none;
  border-bottom: 1px solid lightgray;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  justify-content: center;
  margin-top: 5px;
`;

const LoginContainer = styled.div``;

export default ModalSignUp;
