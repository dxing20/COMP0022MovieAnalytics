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

export function SortNodeForm(props: { nodetype: NodeType }) {
  const { graph, setGraph } = useDataStore(selector, shallow);

  const [sortOrder, setSortOrder] = useState<
    { column: string; order: Order }[]
  >([]);
  const [child, setChild] = useState<string>("");
  const [column, setColumn] = useState<string>("");
  const [order, setOrder] = useState<Order>(Order.ASC);

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

  if (props.nodetype != NodeType.SORT) {
    console.log(props.nodetype, NodeType.SORT);
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
      newGraph.addSortNode(Number(child), sortOrder);
    } catch (e) {
      alert(e);
      return;
    }

    newGraph.clientRefresh();
    setGraph(newGraph);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label htmlFor="order" className="m-1">
        Join Type
      </label>
      <select
        name="order"
        id="order"
        value={order}
        onChange={(e) => {
          setOrder(e.target.value as unknown as Order);
        }}
        className="border rounded-sm m-3"
      >
        {Object.keys(Order)
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
        Column
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

      <div className="flex flex-col  m-4 p-2 border">
        <div className="flex flex-row justify-evenly border">
          <div>Column Name</div>
          <div>Order</div>
        </div>
        {sortOrder.map(({ column, order }) => (
          <div key={column} className="flex flex-row justify-evenly">
            <div>{column}</div>
            <div>{order}</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setSortOrder([...sortOrder, { column, order }]);
        }}
        className=" bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
      >
        Add Node
      </button>

      <button
        type="submit"
        className=" bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
      >
        Add Node
      </button>
    </form>
  );
}
