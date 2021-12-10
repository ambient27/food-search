import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

const Layout = (props) => {
  return (
    <div>
      <MainNavigation position="fixed" />
      <main>
          <Outlet/>
      </main>
    </div>
  );
}

export default Layout;
