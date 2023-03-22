import { State, useDataStore } from "@/hooks/use-data-store";
import {
  cloneGraph,
  Compare,
  Graph,
  GraphNode,
  NodeType,
} from "@comp0022/common";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

const selector = (state: State) => ({
  graph: state.graph,
  setGraph: state.setGraph,
});

export function FilterNodeForm(props: { nodetype: NodeType }) {
  const { graph, setGraph } = useDataStore(selector, shallow);

  const [compare, setCompare] = useState<Compare>(Compare.EQUAL);
  const [child, setChild] = useState<string>("");
  const [column, setColumn] = useState<string>("");
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const parentlessNodes = graph.nodes.filter(
      (node: GraphNode) => !node.hasParent
    );
    if (parentlessNodes.length > 1) {
      setChild(parentlessNodes[0].id.toString());
      if (parentlessNodes[0].columns.length > 0)
        setColumn(parentlessNodes[0].columns[0]);
    }
  }, []);

  if (props.nodetype != NodeType.FILTER) {
    console.log(props.nodetype, NodeType.FILTER);
    return null;
  }

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (graph.nodes.length < 1) {
      alert("Graph need at least one nodes");
      return;
    }
    if (graph.root != null) {
      alert("Graph already has a root");
      return;
    }
    const childNode = graph.nodes.find(
      (node: GraphNode) => node.id == Number(child)
    );
    if (childNode == undefined || childNode.hasParent) {
      alert("Child node is not valid");
      return;
    }

    // clones the graph
    const newGraph: Graph = cloneGraph(graph);

    // add root node
    try {
      newGraph.addFilterNode(Number(child), column, compare, value);
    } catch (e) {
      alert(e);
      return;
    }

    newGraph.clientRefresh();
    setGraph(newGraph);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label htmlFor="compare" className="m-1">
        Join Type
      </label>
      <select
        name="compare"
        id="compare"
        value={compare}
        onChange={(e) => {
          setCompare(e.target.value as unknown as Compare);
        }}
        className="border rounded-sm m-3"
      >
        {Object.keys(Compare)
          .filter((item) => {
            return isNaN(Number(item));
          })
          .map((key) => {
            return <option value={key}>{key}</option>;
          })}
      </select>
      <label htmlFor="child" className="m-1">
        Child
      </label>
      <select
        name="child"
        id="child"
        value={child}
        onChange={(e) => {
          setChild(e.target.value);
        }}
        className="border rounded-sm m-3"
      >
        {graph.nodes
          .filter((node: GraphNode) => {
            return node.hasParent == false;
          })
          .map((node: GraphNode) => {
            return (
              <option key={node.id} value={node.id}>
                node {node.id}
              </option>
            );
          })}
      </select>

      <label htmlFor="column" className="m-1">
        On 1
      </label>
      <select
        name="column"
        id="column"
        value={column}
        onChange={(e) => {
          setColumn(e.target.value);
        }}
        className="border rounded-sm m-3"
      >
        {graph.nodes
          .find((node: GraphNode) => node.id == Number(child))
          ?.columns.map((column: any) => {
            return (
              <option key={column} value={column}>
                {column}
              </option>
            );
          })}
      </select>
      <label htmlFor="value" className="m-1">
        Value
      </label>
      <input
        type="text"
        name="value"
        id="value"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="border rounded-sm m-3"
      />

      <button
        type="submit"
        className=" bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
      >
        Add
      </button>
    </form>
  );
}
