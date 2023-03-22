import { State, useDataStore } from "@/hooks/use-data-store";
import {
  Aggregate,
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

export function AggregateNodeForm(props: { nodetype: NodeType }) {
  const { graph, setGraph } = useDataStore(selector, shallow);

  const [aggregate, setAggregate] = useState<Aggregate>(Aggregate.AVG);
  const [child, setChild] = useState<string>("");
  const [groupColumn, setGroupColumn] = useState<string>("");
  const [aggregateColumn, setAggregateColumn] = useState<string>("");

  useEffect(() => {
    const parentlessNodes = graph.nodes.filter(
      (node: GraphNode) => !node.hasParent
    );
    if (parentlessNodes.length >= 1) {
      setChild(parentlessNodes[0].id.toString());
      if (parentlessNodes[0].columns.length > 0)
        setGroupColumn(parentlessNodes[0].columns[0]);
      if (parentlessNodes[0].columns.length > 1)
        setAggregateColumn(parentlessNodes[0].columns[1]);
    }
  }, [graph]);

  if (props.nodetype != NodeType.AGGREGATE) {
    console.log(props.nodetype, NodeType.AGGREGATE);
    return null;
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(Number(child));

    if (graph.nodes.length < 1) {
      alert("Graph need at least one nodes");
      return;
    }
    if (graph.root != null) {
      alert("Graph already has a root");
      return;
    }
    const childNode = graph.nodes.find((node: GraphNode) => {
      return node.id == Number(child);
    });
    if (childNode == undefined || childNode.hasParent) {
      alert("Child node is not valid");
      return;
    }
    if (groupColumn == aggregateColumn) {
      alert("Group column and aggregate column cannot be the same");
      return;
    }

    // clones the graph
    const newGraph: Graph = cloneGraph(graph);

    // add root node
    try {
      newGraph.addAggregateNode(
        Number(child),
        aggregate,
        groupColumn,
        aggregateColumn
      );
    } catch (e) {
      alert(e);
      return;
    }

    newGraph.clientRefresh();
    setGraph(newGraph);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label htmlFor="aggregate" className="m-1">
        Aggregate
      </label>
      <select
        name="aggregate"
        id="aggregate"
        value={aggregate}
        onChange={(e) => {
          setAggregate(e.target.value as unknown as Aggregate);
        }}
        className="border rounded-sm m-3"
      >
        {Object.keys(Aggregate)
          .filter((item) => {
            return isNaN(Number(item));
          })
          .map((key) => {
            return (
              <option value={Aggregate[key as keyof typeof Aggregate]}>
                {key}
              </option>
            );
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
          console.log("set child", e.target.value);
          setChild(e.target.value.toString());
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

      <label htmlFor="groupColumn" className="m-1">
        Group Column
      </label>
      <select
        name="groupColumn"
        id="groupColumn"
        value={groupColumn}
        onChange={(e) => {
          setGroupColumn(e.target.value);
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

      <label htmlFor="aggregateColumn" className="m-1">
        Aggregate Column
      </label>
      <select
        name="aggregateColumn"
        id="aggregateColumn"
        value={aggregateColumn}
        onChange={(e) => {
          setAggregateColumn(e.target.value);
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

      <button
        type="submit"
        className=" bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
      >
        Add
      </button>
    </form>
  );
}
