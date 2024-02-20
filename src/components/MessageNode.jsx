import { MessageOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { Handle, Position, useEdges } from "reactflow";
import styled from "styled-components";

const StyledNode = styled.div`
  width: 200px;
  height: 70px;
  background-color: #fcfcfc;
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid ${(props) => (props.selected ? "black" : "transparent")};
  .node-body {
    padding: 5px 10px;
  }
  .node-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: red;
    display: flex;
    gap: 10px;
    padding: 5px 10px;
    align-items: center;
    span {
      font-size: 10px;
    }
  }
`;
// Custom Node for message
function MessageNode({ selected, data, id }) {
  const edges = useEdges();
  const sourceArr = edges.filter((edge) => edge.source === id);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <StyledNode selected={selected}>
        <div className="node-header">
          <MessageOutlined />
          <span>Send Message</span>
        </div>
        <div className="node-body">
          <span>{data.label}</span>
        </div>
      </StyledNode>
      <Handle isConnectableStart={sourceArr.length < 1} type="source" position={Position.Right} id="a" />
    </>
  );
}

export default MessageNode;
