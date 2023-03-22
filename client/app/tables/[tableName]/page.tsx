"use client";

import RedirectSignin from "@/components/redirect";
import { post, constructUrl } from "@/api/api";
import { useEffect, useState } from "react";
import { Table, Button } from "@nextui-org/react";
import { stringify } from "querystring";

function TableViewPage({ params }: any) {
  console.error("params", params);
  const { tableName } = params;
  const [userStatus, setUserStatus] = useState<{ loggedIn: boolean } | null>(
    null
  );
  const [data, setData] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [keys, setKeys] = useState<any>([]);
  const [values, setValues] = useState<any>([]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    async function fetchUserStatus() {
      const result = await post({
        url: constructUrl("auth", "/api/users/status"),
        body: {},
      });
      setUserStatus(result);
    }
    fetchUserStatus();
  }, []);

  useEffect(() => {
    if (userStatus && userStatus.loggedIn) {
      post({
        url: constructUrl("data", "/api/data/table"),
        body: { tableName, pageSize, page },
      })
        .then((res) => {
          if (res.error) {
            throw res.error;
          }
          // console.log(res.data.rows[0]);
          setData(Object.keys(res.data.rows[0]));
          setKeys(Object.keys(res.data.rows[0]));
          setValues(res.data.rows);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userStatus, tableName, pageSize, page]);

  if (userStatus === null) {
    return <div>Loading...</div>;
  }

  if (!userStatus.loggedIn) {
    window.location.href = "/auth/signin";
  }

  if (keys.length === 0) {
    return <div>Loading...</div>;
  } else {
    // converts the keys to an array that fits nextUI.
    const columns: any = keys.map((str: any) => ({ key: str, label: str }));
    // Convert, if exist, arrat to string.
    let count = 1;
    values.forEach((row: { [x: string]: string }) => {
      row["key"] = count.toString();
      count++;
      Object.keys(row).forEach((key) => {
        const value = row[key];
        if (Array.isArray(value)) {
          row[key] = value.join(", ");
        }
      });
    });
    const rows = values;
    const nextPage = "Next Page >";
    const previousPage = "< Previous Page";
    console.log("columnsT", columns);
    console.log("rowsT", rows);
    return (
      <div className="fixed left-0 top-0 border w-screen h-screen sm:ml-14 flex flex-col ">
        <div className="h-14 border flex-initial"> TableView </div>
        <div>
          <Table
            aria-label="Example table with dynamic content"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header columns={columns}>
              {(column: any) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={rows}>
              {(item: any) => (
                <Table.Row key={item.key}>
                  {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <div className="flex justify-center items-center h-full">
          <Button
            disabled={page == 0 ? true : false}
            onClick={handlePreviousPage}
            className="text-gray-500 bg-gray-200"
          >
            {" "}
            {previousPage}{" "}
          </Button>
          <div className="mx-2"></div>
          <Button
            onClick={handleNextPage}
            className="text-gray-500 bg-gray-200"
          >
            {" "}
            {nextPage}{" "}
          </Button>
        </div>
      </div>
    );
  }
}

export default TableViewPage;
