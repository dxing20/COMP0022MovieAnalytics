"use client";
import { constructUrl, post } from "@/api/api";
import { useDataStore, State } from "@/hooks/use-data-store";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import NewDataNodePanel from "./(side-panel-components)/newDataNodePanel";
import { SidebarContext } from "./data-flow-render";

const selector = (state: State) => ({
  selectedNode: state.selectedNode,
});

function SidePanel({ panelContext }: { panelContext: SidebarContext }) {
  const { selectedNode } = useDataStore(selector, shallow);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(null);
  }, []);

  if (panelContext === SidebarContext.None) {
    return (
      <div className=" select-none text-gray-400 w-1/4 border flex flex-col justify-center place-content-center text-center">
        Start by adding/selecting a node ...
      </div>
    );
  } else if (panelContext === SidebarContext.AddDataNode) {
    return <NewDataNodePanel></NewDataNodePanel>;
  } else if (panelContext === SidebarContext.AddOperationNode) {
    return (
      <div className="w-1/4 border flex flex-col">
        Side Bar On Selected {panelContext} {JSON.stringify(selectedNode)}
      </div>
    );
  } else if (panelContext === SidebarContext.AddRootNode) {
    return (
      <div className="w-1/4 border flex flex-col">
        Side Bar On Selected {panelContext} {JSON.stringify(selectedNode)}
      </div>
    );
  } else if (panelContext === SidebarContext.ViewNodes) {
    return (
      <div className="w-1/4 border flex flex-col">
        Side Bar On Selected {panelContext} {JSON.stringify(selectedNode)}
      </div>
    );
  } else {
    throw new Error("Invalid panel context");
  }
}

export default SidePanel;
