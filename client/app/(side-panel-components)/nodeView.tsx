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
  const [importName, setImportName] = useState<string>("");
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
        importName: importName,
      },
    });

    if (res.success) {
      alert("Root node imported to data");
      // go to tables page
      window.location.href = `/tables/${importName}`;
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

        <label className="m-4 p-2 font-medium ">Import Name</label>
        <input
          type="text"
          className="border rounded-sm m-4 p-2 font-medium "
          value={importName}
          onChange={(e) => {
            setImportName(e.target.value);
          }}
        />
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
