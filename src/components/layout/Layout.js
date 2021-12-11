import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

const Layout = (props) => {
  return (
    <div>
      <MainNavigation position="fixed" />
      <div style={{ height: 64, width: "100vw" }} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
