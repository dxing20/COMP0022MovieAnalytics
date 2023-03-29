import Link from "next/link";
//import AppsIcon from '@mui/icons-material/Apps';
import { IoApps } from "react-icons/io5";
import { GrDatabase } from "react-icons/gr";
import { IoAnalyticsSharp } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { CgLogIn } from "react-icons/cg";
import { MdOutlineAppRegistration } from "react-icons/md";

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
        <Link href="/" style={{ margin: "3%" }}>
          <div className=" pl-1 w-10 h-10 bg-[#394450] rounded-md mt-3 cursor-pointer text-center flex justify-center flex-col">
            <IoApps size="33"></IoApps>
          </div>
        </Link>
        <Link href="/data" style={{ padding: "3%" }}>
          <div className="pl-1  w-10 h-10 bg-[#394450] rounded-md mt-3 cursor-pointer text-center flex justify-center flex-col">
            <GrDatabase size="33" style={{ padding: "3%" }}></GrDatabase>
          </div>
        </Link>
        <Link href="/correlation">
          <div className="pl-1  w-10 h-10 bg-[#394450] rounded-md mt-3 cursor-pointer text-center flex justify-center flex-col">
            <IoAnalyticsSharp
              size="33"
              style={{ padding: "3%" }}
            ></IoAnalyticsSharp>
          </div>
        </Link>
      </div>
      <div className="flex-none w-14 items-center flex flex-col gap-y-2 pt-3">
        {loggedIn && (
          <Link href="/auth/signout">
            <div className="w-10 h-10 bg-[#394450] rounded-md mt-3 cursor-pointer text-center flex justify-center flex-col">
              <CgLogOut size="medium" style={{ padding: "3%" }}></CgLogOut>
            </div>
          </Link>
        )}
        {!loggedIn && (
          <Link href="/auth/signup">
            <div className="w-10 h-10 bg-[#394450] rounded-md mt-3 cursor-pointer text-center flex justify-center flex-col">
              <MdOutlineAppRegistration
                size="medium"
                style={{ padding: "3%" }}
              ></MdOutlineAppRegistration>
            </div>
          </Link>
        )}
        {!loggedIn && (
          <Link href="/auth/signin">
            <div className="w-10 h-10 bg-[#394450] rounded-md mt-3 cursor-pointer text-center flex justify-center flex-col">
              <CgLogIn size="medium" style={{ padding: "3%" }}></CgLogIn>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default SideNav;
