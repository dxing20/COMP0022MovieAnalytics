"use client";

import RedirectSignin from "@/components/redirect";
import { post, constructUrl } from "@/api/api";
import { useEffect, useState } from "react";

function TableViewPage({ params }: any) {
  console.error("params", params);
  const { tableName } = params;
  const [userStatus, setUserStatus] = useState<{ loggedIn: boolean } | null>(
    null
  );
  const [data, setData] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

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
          console.log(res);
          setData(res);
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

  return (
    <div className="fixed left-0 top-0 border w-screen h-screen sm:ml-14 flex flex-col ">
      <div className="h-14 border flex-initial"> TableView </div>

      <div className="flex-auto">{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}

export default TableViewPage;
