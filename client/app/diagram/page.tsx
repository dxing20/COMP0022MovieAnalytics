"use client";

import { constructUrl, post } from "@/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import { Line, Scatter, Chart } from "react-chartjs-2";
import { Dropdown } from "@nextui-org/react";

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const result = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: [33, 53, 85, 41, 44, 65],
    },
    {
      type: 'bar' as const,
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [33, 53, 85, 41, 44, 65],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'scatter' as const,
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: [33, 53, 85, 41, 44, 65],
    },
  ],
};

function RenderDiagram(){
    return(
      // Display a page shows the title "Diagram" and a diagram

      <div className="fixed left-0 top-0 bg-slate-300 w-screen h-screen sm:ml-14">
          <div className="h-14 bg-slate-50 ">
            <div className="flex flex-row">
              <h1 className="text-3xl">X-axis</h1>
              <Dropdown>
                <Dropdown.Button flat> Select Table for X </Dropdown.Button>
                <Dropdown.Menu aria-label="Static Actions">
                  <Dropdown.Item key="new"> A </Dropdown.Item>
                  <Dropdown.Item key="copy"> B </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Button flat> Select Column for X </Dropdown.Button>
                <Dropdown.Menu aria-label="Static Actions">
                  <Dropdown.Item key="new"> A </Dropdown.Item>
                  <Dropdown.Item key="copy"> B </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <h1 className="text-3xl">Y-axis</h1>
              <Dropdown>
                <Dropdown.Button flat> Select Column for Y </Dropdown.Button>
                <Dropdown.Menu aria-label="Static Actions">
                  <Dropdown.Item key="new"> A </Dropdown.Item>
                  <Dropdown.Item key="copy"> B </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Button flat> Select Column for Y </Dropdown.Button>
                <Dropdown.Menu aria-label="Static Actions">
                  <Dropdown.Item key="new"> A </Dropdown.Item>
                  <Dropdown.Item key="copy"> B </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <h1 className="text-2xl">Diagram</h1>
          <div className="App">
          <Chart data={result} />
          </div>
      </div>
    );
}

export default RenderDiagram;