import RedirectSignin from "@/components/redirect";
import { post, constructUrl } from "@/api/api";
import { cookies } from "next/headers";
import DataList from "./data-list";

async function DataPage() {
  // data fetching
  const userStatusPromise = post({
    url: constructUrl("auth", "/api/users/status"),
    body: {},
    useClientCookies: cookies(),
  });

  const [userStatus] = await Promise.all([userStatusPromise]);

  if (!userStatus.loggedIn) {
    return <RedirectSignin loggedIn={userStatus.loggedIn}></RedirectSignin>;
  }

  return (
    <div className="fixed left-0 top-0 border w-screen h-screen sm:ml-14 flex flex-col ">
      <div className="h-14 border flex-initial"> 🧰 Data </div>

      <DataList></DataList>
    </div>
  );
}

export default DataPage;
