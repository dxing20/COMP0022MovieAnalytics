import { State, useDataStore } from "@/hooks/use-data-store";
import {
  cloneGraph,
  Compare,
  Graph,
  GraphNode,
  JoinType,
  NodeType,
} from "@comp0022/common";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

const selector = (state: State) => ({
  graph: state.graph,
  setGraph: state.setGraph,
});

export function JoinNodeForm(props: { nodetype: NodeType }) {
  const { graph, setGraph } = useDataStore(selector, shallow);

  const [jointype, setJointype] = useState<JoinType>(JoinType.INNER);
  const [left, setLeft] = useState<string>("");
  const [right, setRight] = useState<string>("");
  const [on1, setOn1] = useState<string>("");
  const [on2, setOn2] = useState<string>("");

  useEffect(() => {
    const parentlessNodes = graph.nodes.filter((node) => !node.hasParent);
    if (parentlessNodes.length >= 2) {
      setLeft(parentlessNodes[0].id.toString());
      setRight(parentlessNodes[1].id.toString());
      if (parentlessNodes[0].columns.length > 0)
        setOn1(parentlessNodes[0].columns[0]);
      if (parentlessNodes[1].columns.length > 0)
        setOn2(parentlessNodes[1].columns[0]);
    }
  }, []);

  if (props.nodetype != NodeType.JOIN) return null;

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (graph.nodes.length < 2) {
      alert("Graph need at least two nodes");
      return;
    }
    if (graph.root != null) {
      alert("Graph already has a root");
      return;
    }
    // check if left and right are valid
    const leftNode = graph.nodes.find((node) => node.id == Number(left));
    const rightNode = graph.nodes.find((node) => node.id == Number(right));
    if (
      leftNode == undefined ||
      rightNode == undefined ||
      leftNode.hasParent ||
      rightNode.hasParent
    ) {
      alert("Left or right node is not valid");
      return;
    }

    // clones the graph
    const newGraph: Graph = cloneGraph(graph);

    // add root node
    try {
      console.log(on1, on2);
      newGraph.addJoinNode(Number(left), Number(right), jointype, on1, on2);
    } catch (e) {
      alert(e);
      return;
    }

    newGraph.clientRefresh();
    setGraph(newGraph);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label htmlFor="jointype" className="m-1">
        Join Type
      </label>
      <select
        name="jointype"
        id="jointype"
        value={jointype}
        onChange={(e) => {
          setJointype(e.target.value as unknown as JoinType);
        }}
        className="border rounded-sm m-3"
      >
        {Object.keys(JoinType)
          .filter((item) => {
            return isNaN(Number(item));
          })
          .map((key) => {
            return (
              <option value={JoinType[key as keyof typeof JoinType]}>
                {key}
              </option>
            );
          })}
      </select>
      <label htmlFor="left" className="m-1">
        Left Table
      </label>
      <select
        name="left"
        id="left"
        value={left}
        onChange={(e) => {
          setLeft(e.target.value);
        }}
        className="border rounded-sm m-3"
      >
        {graph.nodes
          .filter((node) => {
            return node.hasParent == false;
          })
          .map((node) => {
            return (
              <option key={node.id} value={node.id}>
                node {node.id}
              </option>
            );
          })}
      </select>
      <label htmlFor="right" className="m-1">
        Right Table
      </label>
      <select
        name="right"
        id="right"
        value={right}
        onChange={(e) => {
          setRight(e.target.value);
        }}
        className="border rounded-sm m-3"
      >
        {graph.nodes
          .filter((node) => {
            return node.hasParent == false;
          })
          .map((node) => {
            return (
              <option key={node.id} value={node.id}>
                node {node.id}
              </option>
            );
          })}
      </select>
      <label htmlFor="on1" className="m-1">
        On 1
      </label>
      <select
        name="on1"
        id="on1"
        value={on1}
        onChange={(e) => {
          console.log(on1);
          setOn1(e.target.value);
        }}
        className="border rounded-sm m-3"
      >
        {graph.nodes
          .find((node) => node.id == Number(left))
          ?.columns.map((column) => {
            return (
              <option key={column} value={column}>
                {column}
              </option>
            );
          })}
      </select>
      <label htmlFor="on2" className="m-1">
        On 2
      </label>
      <select
        name="on2"
        id="on2"
        value={on2}
        onChange={(e) => {
          console.log(on1);
          setOn2(e.target.value);
        }}
        className="border rounded-sm m-3"
      >
        {graph.nodes
          .find((node) => node.id == Number(right))
          ?.columns.map((column) => {
            return (
              <option key={column} value={column}>
                {column}
              </option>
            );
          })}
      </select>

      <button
        type="submit"
        className=" bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
      >
        Add
      </button>
    </form>
  );
}
