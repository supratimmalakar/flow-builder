import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { nodeTypeList } from "../constants";
import { useSelector } from "react-redux";
import NodeSidePanel from "./NodeSidePanel";

const SidePanelContainer = styled.div`
  height: calc(100vh - 130px);
  width: 360px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const StyledNode = styled.div`
  width: 100px;
  height: 60px;
  border: 1px solid black;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: grab;
  p {
    margin: 0;
    user-select: none;
  }
`;

const NodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 132px);
  gap: 10px;
`;

function SidePanel() {
  const { selectedNodes } = useSelector((state) => state.flowBuilder);
  const [tab, setTab] = useState(1);
  useEffect(() => {
    if (selectedNodes.length > 0) setTab(2);
    else setTab(1)
  }, [selectedNodes])

  const onDragStart = (event, nodeType) => {
    // Transfering node information using HTML drag and drop api
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <SidePanelContainer>
      {tab === 1 ? (
        <NodeList>
          {nodeTypeList.map((node) => {
            const { Icon, label, type, id } = node;
            return (
              <StyledNode
                key={id}
                onDragStart={(event) => onDragStart(event, type)}
                draggable
              >
                <Icon />
                <p>{label}</p>
              </StyledNode>
            );
          })}
        </NodeList>
      ) : (
        <NodeSidePanel goBack={() => setTab(1)} node={selectedNodes[0]} />
      )}
    </SidePanelContainer>
  );
}

export default SidePanel;
