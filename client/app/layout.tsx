// These styles apply to every route in the application
import './globals.css';
import SideNav from './side-nav';

export default function RootLayout({ children }:{children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <title>Comp0022</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="w-screen h-screen overflow-hidden">
          <SideNav />
          
          {children}
        </div>
        
      </body>
    </html>)
}