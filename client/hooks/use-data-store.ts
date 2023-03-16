import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

type State = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
};

const useDataStore = create<State>((set, get) => ({
  nodes: [],
  setNodes: (nodes: Node[]) => set({ nodes }),
  edges: [],
  setEdges: (edges: Edge[]) => set({ edges }),
  selectedNode: null,
  setSelectedNode: (node: Node | null) => set({ selectedNode: node }),
}));

export { useDataStore };
export type { State };
