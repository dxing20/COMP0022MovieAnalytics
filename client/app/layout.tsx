// These styles apply to every route in the application
import "./globals.css";
import SideNav from "./side-nav";
import { post, constructUrl } from "../api/api";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // data fetching
  const userStatusPromise = post({
    url: constructUrl("auth", "/api/users/status"),
    body: {},
    useClientCookies: cookies(),
  });

  const [userStatus] = await Promise.all([userStatusPromise]);

  return (
    <html lang="en">
      <head>
        <title>Comp0022</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="w-screen h-screen overflow-hidden">
          <SideNav {...userStatus} />

          {children}
        </div>
      </body>
    </html>
  );
}
