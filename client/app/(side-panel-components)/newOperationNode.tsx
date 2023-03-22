"use client";

import { constructUrl, post } from "@/api/api";
import { useDataStore, State } from "@/hooks/use-data-store";
import {
  cloneGraph,
  DataNode,
  Graph,
  JoinType,
  NodeType,
  FilterNode,
  RootNode,
  Compare,
  GraphNode,
} from "@comp0022/common";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { AggregateNodeForm } from "./(OperationForms)/AggregateNodeForm";
import { FilterNodeForm } from "./(OperationForms)/FilterNodeForm";
import { JoinNodeForm } from "./(OperationForms)/JoinNodeForm";
import { SortNodeForm } from "./(OperationForms)/SortNodeForm";

const selector = (state: State) => ({
  graph: state.graph,
  setGraph: state.setGraph,
});

function NewOperationNodePanel() {
  const [nodetype, setNodetype] = useState<NodeType>(NodeType.JOIN);
  console.log(nodetype);

  return (
    <div className="w-1/4 border flex flex-col">
      <div className="border flex-initial h-12 flex p-3 font-semibold text-lg text-gray-700">
        New Operation Node
      </div>
      <div className="border flex-auto ">
        <label htmlFor="nodetype" className="m-1">
          Node Type
        </label>
        <select
          name="nodetype"
          id="nodetype"
          value={nodetype}
          onChange={(e) => {
            setNodetype(e.target.value as unknown as NodeType);
          }}
          className="border rounded-sm m-3"
        >
          {Object.keys(NodeType)
            .filter((item) => {
              return isNaN(Number(item));
            })
            .map((key) => {
              if (key === "ROOT" || key === "DATA" || key === "OTHER") return;
              return (
                <option value={NodeType[key as keyof typeof NodeType]}>
                  {key}
                </option>
              );
            })}
        </select>
        <JoinNodeForm nodetype={nodetype} />
        <FilterNodeForm nodetype={nodetype} />
        <SortNodeForm nodetype={nodetype} />
        <AggregateNodeForm nodetype={nodetype} />
      </div>
    </div>
  );
}

export default NewOperationNodePanel;
