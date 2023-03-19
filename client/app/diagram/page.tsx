"use client";

import { constructUrl, post } from "@/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import { Line, Scatter, Chart } from "react-chartjs-2";

// type result = {
//     labelsX: string[],
//     labelsY: string[],
//     datasets: {
//         data: number[],
//         correlation: number,
//     }
// }

// const curDisplay: result = {
//     labelsX: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     labelsY: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: {
        
// }

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
      type: 'bar' as const,
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: [33, 53, 85, 41, 44, 65],
    },
  ],
};

function RenderCorrelation(){
    return(
        // Display a page shows the title "Diagram" and a diagram
        <div className="fixed left-0 top-0 bg-slate-300 w-screen h-screen sm:ml-14">
            <div className="h-14 bg-slate-50 ">{/* Header Div */}</div>
            <h1 className="text-3xl">Diagram</h1>
            <div className="App">
            <Chart data={result} />
            </div>
        </div>
    );
}

export default RenderCorrelation;