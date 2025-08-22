// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
export default function Layout() {
  return (
    <div>
       <Topbar />
      <Sidebar />
     
      <Outlet /> {/* This is where each page will be rendered */}
    </div>
  );
}
