import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

const Layout = (props) => {
  return (
    <div>
      <MainNavigation position="fixed" />
      <div style={{ height: 70, width: "100vw" }} />
      <main style={{ paddingTop: "20px", paddingLeft: "10px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
