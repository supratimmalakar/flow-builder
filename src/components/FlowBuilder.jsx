import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  useOnSelectionChange,
  getIncomers,
} from "reactflow";
import "reactflow/dist/style.css";
import styled from "styled-components";
import MessageNode from "./MessageNode";
import { useDispatch } from "react-redux";
import { createSetNodesInstance, setSelectedNodes } from "../redux/reducer";
import {v4 as uuidv4} from 'uuid';

const FlowBuilderContainer = styled.div`
  width: calc(100vw - 400px);
  height: calc(100vh - 90px);
`;

const storageNodes = localStorage.getItem("nodes");
const storageEdges = localStorage.getItem("edges");

const initialNodes = storageNodes ? [...JSON.parse(storageNodes)] : [];
const initialEdges = storageEdges ? [...JSON.parse(storageEdges)] : [];

const getId = () => `dndnode_${uuidv4()}`;

function FlowBuilder() {
  const dispatch = useDispatch();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodeTypes = useMemo(() => ({ message: MessageNode }), []);

  // saving setNodes instance in redux to call from Header
  useEffect(() => {
    if (setNodes) {
        dispatch(createSetNodesInstance(setNodes))
    }
  }, [setNodes])

  // Set selected nodes in redux store
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      dispatch(setSelectedNodes([...nodes]));
    },
  });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const id = getId();
      const newNode = {
        id,
        type,
        position,
        data: { label: `test message` },
      };

      // Saving a new node
      setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <FlowBuilderContainer ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </FlowBuilderContainer>
  );
}

export default FlowBuilder;
