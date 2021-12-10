import styled from "styled-components";
import React from "react";

function Header() {
  return (
    <HeaderBar>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1600px-Instagram_logo.svg.png"
        alt="Instagram logo"
      />
    </HeaderBar>
  );
}

const HeaderBar = styled.div`
  width: 100%;
  height: 60px;
  padding-left: 20px;
  background-color: white;
  border-bottom: 1px solid lightgray;
  position: sticky;
  top: 0;
  z-index: 1;
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`;

const LoginContainer = styled.div``;

export default Header;
