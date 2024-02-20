import React from "react";
import FlowBuilder from "./components/FlowBuilder";
import Header from "./components/Header";
import SidePanel from "./components/SidePanel";
import styled from "styled-components";

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
`

export default function App() {

  return (
    <>
    <Header/>
    <BottomContainer>
      <FlowBuilder/>
      <SidePanel/>
    </BottomContainer>
    </>
  );
}
