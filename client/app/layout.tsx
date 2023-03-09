// These styles apply to every route in the application
import { AppContext } from 'next/app';
import './globals.css';
import SideNav from './side-nav';
import {get, post} from '../api/api'

async function RootLayout({ children }:{children: React.ReactNode}) {
  const res = await post("auth-srv.default", "/api/users/status");
  const {loggedIn, username } = res;
  console.log(res);
  return (
    <html lang="en">
      <head>
        <title>Comp0022</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="w-screen h-screen overflow-hidden">
          <SideNav />
          <div className="bg-blue-100">
          ({loggedIn})
          ({username})
          </div>
          
          {children}
        </div>
        
      </body>
    </html>)
}

export default RootLayout;