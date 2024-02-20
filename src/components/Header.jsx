import { Button, notification } from "antd";
import React from "react";
import { useNodes, useEdges, getIncomers } from "reactflow";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: calc(100vw - 60px);
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 30px;
`;

function Header() {
  const nodes = useNodes();
  const edges = useEdges();

  // Maintaining list of number of incomers for each node
  const incomersLenArray = nodes.map((node) => {
    return getIncomers(node, nodes, edges).length;
  });

  const handleSave = () => {
    let zeroCount = 0;
    incomersLenArray.forEach((item) => {
      if (item === 0) zeroCount++;
    });
    // Checking that number zero incomers node is atmost one
    if (nodes.length > 1 && zeroCount > 1) {
      notification.error({
        message: "Cannot save flow",
        duration: 1000,
      });
      return;
    }
    // Saving nodes and edges state in local storage
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    notification.success({
      message: "Flow saved successfully",
      duration: 1000,
    });
  };
  return (
    <HeaderContainer>
      <Button onClick={handleSave} type="primary">
        Save Changes
      </Button>
    </HeaderContainer>
  );
}

export default Header;
