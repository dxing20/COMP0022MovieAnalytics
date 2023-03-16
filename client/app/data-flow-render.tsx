"use client";

import { useDataStore, State } from "@/hooks/use-data-store";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  MiniMap,
  GetMiniMapNodeAttribute,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import "./react-flow.css";
import { shallow } from "zustand/shallow";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Movies" },
    position: { x: 0, y: 25 },
    connectable: false,
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    type: "operation",
    data: { label: "Filter" },
    position: { x: 250, y: 250 },
    connectable: false,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "3",
    type: "output",
    data: { label: <div>Movies with letter A</div> },
    position: { x: 500, y: 25 },
    connectable: false,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

const nodeColor = (node: Node) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};

const selector = (state: State) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,

  selectedNode: state.selectedNode,
  setSelectedNode: state.setSelectedNode,
});

function RenderDataFlow() {
  const { nodes, setNodes, edges, setEdges, selectedNode, setSelectedNode } =
    useDataStore(selector, shallow);

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  return (
    <div className="border  flex-auto">
      <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={onNodeClick}>
        <Panel position="top-left">top-left</Panel>
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Background color="#99b3ec" variant={"dots" as BackgroundVariant} />
      </ReactFlow>
    </div>
  );
}

export default RenderDataFlow;
