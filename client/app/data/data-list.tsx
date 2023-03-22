"use client";

import { constructUrl, post } from "@/api/api";
import { useEffect, useState } from "react";
import { Table } from "@nextui-org/react";

enum columnTypes {
  integer = "integer",
  text = "text",
  textArray = "text[]",
  numeric21 = "numeric(2,1)",
  timestamp = "timestamp",
  stringToArray = "string_to_array", // custom type
  doubleToTimestamp = "double_to_timestamp", // custom type
}

function DataList() {
  const [importDisplay, setImportDisplay] = useState<boolean>(false);
  const [tables, setTables] = useState<any>([]);

  const [name, setName] = useState("");
  const [columnName, setColumnName] = useState("");
  const [type, setType] = useState<columnTypes>(columnTypes.integer);
  const [columns, setColumns] = useState<
    { column: string; type: columnTypes }[]
  >([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    post({
      url: constructUrl("data", "/api/data/tables"),
      body: {},
    })
      .then((res) => {
        console.log(res);
        setTables(res.tableNames);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const tableColumns = [
    {
      key: "table name",
      label: "Table Name",
    },
  ];
  let x = 1;
  const tableRows = tables.map((name: string) => ({
    key: x++,
    "table name": name,
  }));

  return (
    <div className="flex flex-col flex-auto ">
      <div className="h-14 border flex-initial flex flex-row">
        <div
          onClick={() => setImportDisplay(!importDisplay)}
          className="flex-initial bg-red-400 m-2 p-2 rounded-sm font-semibold text-white cursor-pointer"
        >
          Import Data
        </div>
      </div>
      <div className="flex-auto flex flex-row">
        {importDisplay && (
          <div className="w-1/4 border flex flex-col flex-initial">
            <div className="border flex-initial h-12 flex p-3 font-semibold text-lg text-gray-700">
              Import New Data From CSV
            </div>
            <div className="border flex-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (selectedFile == undefined) {
                    alert("Please select a file");
                  }
                  const formData = new FormData();
                  formData.append("name", name);
                  formData.append("file", selectedFile as Blob);
                  formData.append("columns", JSON.stringify(columns));
                  post({
                    url: constructUrl("data", "/api/data/import"),
                    body: formData,
                    header: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                    .then((res) => {
                      console.log(res);
                      alert("Data imported successfully");
                    })
                    .catch((err) => {
                      console.log(err);
                      alert("Data imported failed");
                    });
                }}
                className="flex flex-col"
              >
                {/* upload csv */}
                <div className="flex flex-row m-2">
                  <label className="mr-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="mr-2 border rounded-md"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-row  m-2">
                  <label className="mr-1" htmlFor="file">
                    File
                  </label>
                  <input
                    className="mr-2 border rounded-md"
                    type="file"
                    id="file"
                    name="file"
                    accept=".csv"
                    onChange={(e) => {
                      if (e.target.files == null) return;
                      setSelectedFile(e.target.files[0]);
                    }}
                    required
                  />
                </div>
                {selectedFile != undefined && selectedFile.name}

                <div className="flex flex-col  m-4 p-2 border">
                  <label className="mr-1" htmlFor="columnName">
                    Column Name
                  </label>
                  <input
                    className="mr-2 border rounded-md"
                    type="text"
                    id="columnName"
                    name="columnName"
                    value={columnName}
                    onChange={(e) => {
                      setColumnName(e.target.value);
                    }}
                  />

                  <label className="mr-1" htmlFor="type">
                    Column Type
                  </label>
                  <select
                    className="mr-2 border rounded-md"
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value as columnTypes);
                    }}
                  >
                    <option value={columnTypes.integer}>
                      {columnTypes.integer}
                    </option>
                    <option value={columnTypes.text}>{columnTypes.text}</option>
                    <option value={columnTypes.textArray}>
                      {columnTypes.textArray}
                    </option>
                    <option value={columnTypes.numeric21}>
                      {columnTypes.numeric21}
                    </option>
                    <option value={columnTypes.timestamp}>
                      {columnTypes.timestamp}
                    </option>
                    <option value={columnTypes.stringToArray}>
                      {columnTypes.stringToArray}
                    </option>
                    <option value={columnTypes.doubleToTimestamp}>
                      {columnTypes.doubleToTimestamp}
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setColumns(
                        columns.concat({ column: columnName, type: type })
                      );
                      setColumnName("");
                      setType(columnTypes.integer);
                    }}
                    className="bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
                  >
                    Add Column
                  </button>
                </div>

                <div className="flex flex-col  m-4 p-2 border">
                  <div className="flex flex-row justify-evenly border">
                    <div>Column Name</div>
                    <div>Column Type</div>
                  </div>
                  {columns.map((column, index) => (
                    <div key={index} className="flex flex-row justify-evenly">
                      <div>{column.column}</div>
                      <div>{column.type}</div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="bg-slate-500 rounded-sm m-4 p-2 font-medium text-slate-200"
                >
                  Import
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="flex-auto">

          {/* <table className="border m-5 ">
            <thead>
              <tr>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((name: string) => (
                <tr>
                  <td>{name}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <Table
          aria-label="Example table with dynamic content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          >
            <Table.Header columns={tableColumns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={tableRows}>
              {(item) => (
                <Table.Row key={item.key}>
                  {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DataList;
