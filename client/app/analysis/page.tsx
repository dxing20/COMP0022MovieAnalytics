"use client";

import { constructUrl, post } from "@/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import { Line, Scatter, Chart } from "react-chartjs-2";
import { Dropdown, Table } from "@nextui-org/react";
import { truncate } from "fs";

function GetAllTables() {
  const [data, setData] = useState([]);
  
}

type DiagramData = {
  XLabel: string[];
  YLabel: string[];

  data: any[];
};

const diagramOptions ={
  responsive: true,
}

const result = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: [        
        { x: 10, y: 20 },
        { x: 20, y: 20 },
        { x: 30, y: 40 },
        { x: 40, y: 50 },
        { x: 50, y: 60 }
      ],
    },
    {
      type: 'scatter' as const,
      label: 'Dataset Name',
      backgroundColor: 'rgb(53, 162, 235)',
      data: [
        { x: 10, y: 20 },
        { x: 20, y: 30 },
        { x: 30, y: 40 },
        { x: 40, y: 50 },
        { x: 50, y: 60 },
      ],
    },
  ],
};

type DropdownData = {
  default: string;
  items: any[];
};

const xTableSelection: DropdownData = {
  default: "Table for X axis",
  items: [{ key: "new", name: "New File" },
  { key: "copy", name: "Copy Link" },
  { key: "edit", name: "Edit File" },
  { key: "delete", name: "Delete File" }
]};
const xColSelection: DropdownData = {
  default: "Column for X axis",
  items: []
};
const yTableSelection: DropdownData = {
  default: "Table for Y axis",
  items: 
  [{ key: "new", name: "New File" },
  { key: "copy", name: "Copy Link" },
  { key: "edit", name: "Edit File" },
  { key: "delete", name: "Delete File" }
]};
const yColSelection: DropdownData = {
  default: "Column for Y axis",
  items: []
};

function Dropdown0022(props){
  const [selected, setSelected] = useState(new Set().add(props.dropdownData.default));

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  return (
    <Dropdown>
      <Dropdown.Button color="primary" css={{ tt: "capitalize" }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Dynamic Single selection actions"
        color="primary"
        // disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={props.dropdownData.items}
      >
        {(item) => (
          <Dropdown.Item
            key={item.key}
          >
            {item.name}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function Table0022(props){
  return (
    <Table
      aria-label="Example table with dynamic content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item) => (
          <Table.Row key={item.key}>
            {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

const columns = [
  {
    key: "statistic",
    label: "STATISTIC",
  },
  {
    key: "column_1",
    label: "COLUMN 1",
  },
  {
    key: "column_2",
    label: "COLUMN 2",
  },
];
const rows = [
  {
    key: "max",
    statistic: "MAX",
    column_1: "N/A",
    column_2: "N/A",
  },
  {
    key: "min",
    statistic: "MIN",
    column_1: "N/A",
    column_2: "N/A",
  },
  {
    key: "mean",
    statistic: "MEAN",
    column_1: "N/A",
    column_2: "N/A",
  },
  {
    key: "correlation",
    statistic: "CORRELATION",
    column_1: "N/A",
    column_2: " - ",
  },
];

function RenderDiagram(){
    return(
      // Display a page shows the title "Diagram" and a diagram

      <div className="fixed left-0 top-0 bg-slate-300 w-screen sm:ml-14">
          <div className="h-14 bg-slate-50 ">
            <div className="flex flex-row mx-5">
              <h1 className="text-3xl">X-axis</h1>
              <Dropdown0022 dropdownData={xTableSelection} className=""/>
              <Dropdown0022 dropdownData={xColSelection} className=""/>
              <h1 className="text-3xl">Y-axis</h1>
              <Dropdown0022 dropdownData={yTableSelection} className=""/>
              <Dropdown0022 dropdownData={yColSelection} className=""/>
            </div>
          </div>
          <div className="chart-container" style={{width: '100%',  height: '400px'}}>
            <Chart data={result} options={diagramOptions} />
          </div>
          <Table0022 />
      </div>
    );
}

export default RenderDiagram;