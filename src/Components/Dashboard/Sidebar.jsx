import { Menu } from "@material-ui/icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Links = [
  {
    pathName: "/dashboard/my-account",
    iconClass: "far fa-user",
    label: "My Account",
  },
  {
    pathName: "/dashboard/orders",
    iconClass: "fas fa-shopping-cart",
    label: "My Orders",
  },
  {
    pathName: "/dashboard/favorites",
    iconClass: "far fa-heart",
    label: "My Favorites",
  }
];

const Sidebar = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
    <div
      className={`h-full bg-white overflow-y-auto p-2 dashboard-sidebar ${open ? 'dashboard-sidebar-open' : ''}`}
      style={{ flex: "0.2" }}
    >
      {Links.map(({ pathName, iconClass, label }) => (
        <NavLink to={pathName} activeClassName="hover:bg-blue-100 hover:text-blue-500">
          <div className="flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500">
            <i className={`${iconClass} text-blue-500`}></i>
            <p>{label}</p>
          </div>
        </NavLink>
      ))}
    </div>
    <div onClick={() => setOpen(!open)}><Menu className="responsive-dashboard-menuIcon"/></div>
    </>
  );
};

export default Sidebar;
