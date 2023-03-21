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

function NewDataNodePanel() {
  const [tables, setTables] = useState<any>(null);
  const { graph, setGraph } = useDataStore(selector, shallow);
  const [tableName, setTableName] = useState<string>("null");

  useEffect(() => {
    post({
      url: constructUrl("data", "/api/data/tables"),
      body: {},
    })
      .then((res) => {
        setTables(res.tableNames);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (tables == null) {
    return (
      <div className="select-none text-gray-400 w-1/4 border flex flex-col justify-center place-content-center text-center">
        Loading data nodes on server ...
      </div>
    );
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!tables.includes(tableName)) {
      alert("Table does not exist");
      return;
    }

    console.log("submitting " + tableName + " " + graph);
    // clones the graph
    const newGraph: Graph = cloneGraph(graph);

    if (graph.root) {
      alert("Graph already has a root");
      return;
      // const rootIndex = newGraph.nodes.findIndex(
      //   (node) => node.id === graph.root!.id
      // );
      // if (rootIndex !== -1) {
      //   newGraph.root = newGraph.nodes[rootIndex] as RootNode;
      // }
    }
    newGraph.addDataNode(tableName);
    newGraph.clientRefresh();
    setGraph(newGraph);
  };

  return (
    <div className="w-1/4 border flex flex-col">
      <div className="border flex-initial h-12 flex p-3 font-semibold text-lg text-gray-700">
        Importing New Data Node
      </div>
      <div className="border flex-auto ">
        <form onSubmit={onSubmit} className="flex flex-col">
          {/* title, select source, add description */}
          <div className="flex flex-row  m-2">
            <label className="mr-1" htmlFor="source">
              Source
            </label>
            <select
              className="mr-2 border rounded-md"
              name="source"
              id="source"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            >
              {tables.map((table: string) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
              <option value="null">No tables</option>
            </select>
          </div>
          <div className="flex flex-col  m-2">
            <label className="mr-1" htmlFor="description">
              Description
            </label>
            <textarea
              className="mr-2 border rounded-md"
              name="description"
              id="description"
              cols={30}
              rows={10}
            ></textarea>
          </div>

          <button
            type="submit"
            className=" bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
          >
            Import
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewDataNodePanel;
