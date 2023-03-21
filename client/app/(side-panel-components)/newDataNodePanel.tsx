"use client";

import { constructUrl, post } from "@/api/api";
import { useEffect, useState } from "react";

function NewDataNodePanel() {
  const [tables, setTables] = useState<any>(null);

  useEffect(() => {
    post({
      url: constructUrl("data", "/api/data/tables"),
      body: {},
    })
      .then((res) => {
        setTables(res.tableNames);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (tables == null) {
    return (
      <div className="select-none text-gray-400 w-1/4 border flex flex-col justify-center place-content-center text-center">
        Loading data nodes on server ...
      </div>
    );
  }

  return (
    <div className="w-1/4 border flex flex-col">
      <div className="border flex-initial h-12 flex p-3 font-semibold text-lg text-gray-700">
        Importing New Data Node {JSON.stringify(tables)}
      </div>
      <div className="border flex-auto ">
        <form action="submit" className="flex flex-col">
          {/* title, select source, add description */}
          <div className="flex flex-row m-2">
            <label className="mr-1" htmlFor="name">
              Name
            </label>
            <input
              className="mr-2 border rounded-md"
              type="text"
              id="name"
              name="name"
            />
          </div>
          <div className="flex flex-row  m-2">
            <label className="mr-1" htmlFor="source">
              Source
            </label>
            <select
              className="mr-2 border rounded-md"
              name="source"
              id="source"
            >
              {tables.length > 0 ? (
                tables.map((table: string) => (
                  <option value={table}>{table}</option>
                ))
              ) : (
                <option value="null">No tables found</option>
              )}
            </select>
          </div>
          <div className="flex flex-col  m-2">
            <label className="mr-1" htmlFor="description">
              Description
            </label>
            <textarea
              className="mr-2 border rounded-md"
              name="description"
              id="description"
              cols={30}
              rows={10}
            ></textarea>
          </div>

          <button
            type="submit"
            className=" bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
          >
            Import
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewDataNodePanel;
