import React from "react";
import MessagePanel from "./MessagePanel";
import DefaultPanel from "./DefaultPanel";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";

const PanelContainer = styled.div`
    .panel-header {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.2);
        padding-bottom: 10px;
        span {
            font-size: 20px;
            font-weight: 600;
            user-select: none;
        }
    }
`

function NodeSidePanel({ node, goBack, ...panelProps }) {
  const type = node?.type;
  const renderPanel = () => {
      switch (type) {
        case "message":
          return <MessagePanel node={node} {...panelProps}/>;
        // other panels according to node type go here
        default:
          return <DefaultPanel node={node} {...panelProps}/>;
      }
  }
  const renderTitle = () => {
    switch (type) {
        case "message":
            return "Message";
        // titles for other types of node go here
        default: 
            return "Node"
    }
  }
  return (
    <PanelContainer>
        <div className="panel-header">
            <ArrowLeftOutlined onClick={goBack} style={{cursor: 'pointer'}}/>
            <span>{renderTitle()}</span>
        </div>
        {renderPanel()}
    </PanelContainer>
  )
}

export default NodeSidePanel;
