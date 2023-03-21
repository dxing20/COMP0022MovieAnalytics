"use client";

import { constructUrl, post } from "@/api/api";
import { useDataStore, State } from "@/hooks/use-data-store";
import { cloneGraph, DataNode, Graph, RootNode } from "@comp0022/common";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

const selector = (state: State) => ({
  graph: state.graph,
  setGraph: state.setGraph,
});

function NewRootNodePanel() {
  const { graph, setGraph } = useDataStore(selector, shallow);

  useEffect(() => {}, []);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (graph.nodes.length == 0) {
      alert("Graph is empty");
      return;
    }
    if (graph.root != null) {
      alert("Graph already has a root");
      return;
    }
    // get all parentless nodes
    const parentlessNodes = graph.nodes.filter((node) => !node.hasParent);
    if (parentlessNodes.length !== 1) {
      alert("Graph needs exactly one parentless node, cannot end graph");
      return;
    }

    // clones the graph
    const newGraph: Graph = new Graph(graph.queryHandler);
    newGraph.i = graph.i;
    newGraph.nodes = graph.nodes.map((node) => {
      if (node instanceof DataNode) {
        const newNode = new DataNode(node.id, node.tableName);
        newNode.status = node.status;
        newNode.depth = node.depth;
        newNode.error = node.error;
        newNode.hasParent = node.hasParent;
        newNode.columns = [...node.columns];
        return newNode;
      } else if (node instanceof RootNode) {
        const newNode = new RootNode(node.id, node.child);
        newNode.status = node.status;
        newNode.depth = node.depth;
        newNode.error = node.error;
        newNode.hasParent = node.hasParent;
        newNode.columns = [...node.columns];
        return newNode;
      } else {
        throw new Error("Unknown node type");
      }
    });

    // add root node
    newGraph.addRootNode();
    setGraph(newGraph);
  };

  return (
    <div className="w-1/4 border flex flex-col">
      <div className="border flex-initial h-12 flex p-3 font-semibold text-lg text-gray-700">
        Finish Graph
      </div>
      <div className="border flex-auto ">
        <form onSubmit={onSubmit} className="flex flex-col">
          <button
            type="submit"
            className=" bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
          >
            Add Root
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewRootNodePanel;
