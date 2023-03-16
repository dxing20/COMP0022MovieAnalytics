function SideNav({
  loggedIn,
  username,
}: {
  loggedIn: boolean;
  username: string;
}) {
  return (
    <div className="flex-initial w-14 h-screen border flex flex-col justify-between">
      <div className="flex-1 w-14 border">
        <p>Data Map</p>
      </div>
      <div className="flex-1 w-14 flex flex-col justify-end border">
        <p>{`logged in: ${loggedIn}`}</p>
        <p>{`username: ${username}`}</p>
      </div>
    </div>
  );
}

export default SideNav;
