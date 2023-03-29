import { State, useDataStore } from "@/hooks/use-data-store";
import {
  cloneGraph,
  Compare,
  Graph,
  GraphNode,
  JoinType,
  NodeType,
  Order,
} from "@comp0022/common";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

const selector = (state: State) => ({
  graph: state.graph,
  setGraph: state.setGraph,
});

export function LimitNodeForm(props: { nodetype: NodeType }) {
  const { graph, setGraph } = useDataStore(selector, shallow);
  const [child, setChild] = useState<string>("");
  const [limit, setLimit] = useState<number>(0);

  useEffect(() => {
    const parentlessNodes = graph.nodes.filter(
      (node: GraphNode) => !node.hasParent
    );
    if (parentlessNodes.length > 1) {
      setChild(parentlessNodes[0].id.toString());
    }
  }, []);

  if (props.nodetype != NodeType.LIMIT) {
    console.log(props.nodetype, NodeType.LIMIT);
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
      newGraph.addLimitNode(Number(child), limit);
    } catch (e) {
      alert(e);
      return;
    }

    newGraph.clientRefresh();
    setGraph(newGraph);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label htmlFor="limit" className="m-1">
        Limit Count
      </label>
      <input
        type="number"
        name="limit"
        id="limit"
        className="m-1 p-1"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      />

      <button
        type="submit"
        className=" bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
      >
        Add Node
      </button>
    </form>
  );
}
