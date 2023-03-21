"use client";

import { constructUrl, post } from "@/api/api";
import { useDataStore, State } from "@/hooks/use-data-store";
import {
  cloneGraph,
  DataNode,
  Graph,
  GraphNode,
  RootNode,
} from "@comp0022/common";
import Link from "next/link";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

const selector = (state: State) => ({
  graph: state.graph,
  setGraph: state.setGraph,
  selectedNode: state.selectedNode,
});

function NodeViewPanel() {
  const { graph, setGraph, selectedNode } = useDataStore(selector, shallow);

  const [node, SetNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    console.log("selectedNode changed");
    // convert id to number
    const id = selectedNode == null ? null : Number(selectedNode.id);
    // get node from graph
    const node = graph.nodes.find((node) => node.id === id);
    if (node == null) {
      console.log("node is null");
      return;
    }
    SetNode(node);
  }, [selectedNode]);

  const importRootToData = async () => {
    let serializedGraph = JSON.stringify(graph);

    const res = await post({
      url: constructUrl("data", "/api/data/importRoot"),
      body: {
        serializedGraph: serializedGraph,
      },
    });

    if (res.success) {
      alert("Root node imported to data");
    }

    console.log(res);
  };

  return (
    <div className="w-1/4 border flex flex-col">
      <div className="border flex-initial h-12 flex p-3 font-semibold text-lg text-gray-700">
        Node Detail
      </div>
      <div className="border flex-auto ">
        {node != null && JSON.stringify(node, null, 2)}

        {node instanceof DataNode && (
          <Link href={`/tables/${node.tableName}`}>
            <div className="p-3 bg-gray-300">See View</div>
          </Link>
        )}

        {node instanceof RootNode && (
          <div onClick={importRootToData} className="p-3 bg-gray-300">
            Import Root to Data
          </div>
        )}
      </div>
    </div>
  );
}

export default NodeViewPanel;
