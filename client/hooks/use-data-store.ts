import { create } from "zustand";
import { Graph, RuntimeQueryHandler } from "@comp0022/common";
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
import { constructUrl, post } from "@/api/api";

const queryTableNames = async () => {
  try {
    const res = await post({
      url: constructUrl("data", "/api/data/tables"),
      body: {},
    });
    return res.tableNames;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get information schema");
  }
};

const queryColumns = async (tableName: string) => {
  try {
    const res = await post({
      url: constructUrl("data", "/api/data/columns"),
      body: { tableName },
    });
    return res.columns;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get information schema");
  }
};

type State = {
  nodes: Node[];
  edges: Edge[];
  graph: Graph;
  setGraph: (graph: Graph) => void;
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
  graph: new Graph(new RuntimeQueryHandler(queryTableNames, queryColumns)),
  setGraph: (graph: Graph) => set({ graph }),
}));

export { useDataStore };
export type { State };
