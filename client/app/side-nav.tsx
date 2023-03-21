import Link from "next/link";

function SideNav({
  loggedIn,
  username,
}: {
  loggedIn: boolean;
  username: string;
}) {
  // #394450 for icon background
  return (
    <div className="flex-initial w-14 h-screen border flex flex-col bg-[#29343B] justify-between ">
      <div className="  flex-1 w-14 border grow-2 items-center flex flex-col gap-y-2">
        <Link href="/">
          <div className="w-10 h-10 bg-[#394450] rounded-md mt-3 cursor-pointer text-center flex justify-center flex-col">
            😀
          </div>
        </Link>
        <Link href="/data">
          <div className="w-10 h-10 bg-[#394450] rounded-md mt-3 cursor-pointer text-center flex justify-center flex-col">
            😍
          </div>
        </Link>
        <Link href="/analysis">
          <div className="w-10 h-10 bg-[#394450] rounded-md mt-3 cursor-pointer text-center flex justify-center flex-col">
            😉
          </div>
        </Link>
      </div>
      <div className="flex-none w-14 items-center flex flex-col gap-y-2 pt-3">
        <Link href="/auth/signout">
          <div className="w-10 h-10 bg-[#394450] rounded-md mb-3 cursor-pointer text-center flex justify-center flex-col">
            🤣
          </div>
        </Link>
        {!loggedIn && (
          <Link href="/auth/signup">
            <div className="w-10 h-10 bg-[#394450] rounded-md mb-3 cursor-pointer text-center flex justify-center flex-col">
              🙃
            </div>
          </Link>
        )}
        {!loggedIn && (
          <Link href="/auth/signin">
            <div className="w-10 h-10 bg-[#394450] rounded-md mb-3 cursor-pointer text-center flex justify-center flex-col">
              😚
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default SideNav;
