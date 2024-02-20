import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MessagePanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function MessagePanel({ node }) {
  const [nodeText, setNodeText] = useState();
  const { setNodes } = useSelector((state) => state.flowBuilder);
  const id = node?.id;
  useEffect(() => {
    // Update the label in nodes state
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label: nodeText,
          };
        }

        return node;
      })
    );
  }, [nodeText, setNodes]);

  useEffect(() => {
    // Update text value when selected node is changed
    setNodeText(node?.data?.label);
  }, [node]);

  return (
    <MessagePanelContainer>
      <span>Text</span>
      <textarea value={nodeText} onChange={(e) => setNodeText(e.target.value)} />
    </MessagePanelContainer>
  );
}

export default MessagePanel;
