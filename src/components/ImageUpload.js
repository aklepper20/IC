import React from "react";
import { useState } from "react";
import firebase from "firebase/compat/app";
import { db, storage } from "../firebase";
import "firebase/compat/firestore";

import styled from "styled-components";
import Button from "@mui/material/Button";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    //get the file u selected and set the image in state to that image
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    //push to firebase w storage
    //get a reference to this photo and put it to the one we uploaded. put the image into fb
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function. uploaded image and get the image dowload url.
        //get on and get the download link so we can display it on the ui
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <Container>
      <progress value={progress} max="100" />
      <InputText
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter a caption..."
      ></InputText>
      <InputFilePicker type="file" onChange={handleChange}></InputFilePicker>
      <UploadButton onClick={handleUpload}>Upload</UploadButton>
    </Container>
  );
}

const Container = styled.div``;
const InputText = styled.input``;
const InputFilePicker = styled.input``;
const UploadButton = styled.button``;

export default ImageUpload;
