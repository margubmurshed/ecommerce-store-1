import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <>
      <div
        className={`h-full bg-white overflow-y-auto p-2 dashboard-sidebar`}
        style={{ flex: "0.2" }}
      >
        <Link to="/dashboard/my-account" activeClassName="hover:bg-blue-100 hover:text-blue-500">
            <div className="flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500">
              <i className={`far fa-user text-blue-500`}></i>
              <p>My Account</p>
            </div>
        </Link>
        <Link to="/dashboard/orders" activeClassName="hover:bg-blue-100 hover:text-blue-500">
            <div className="flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500">
              <i className={`fas fa-shopping-cart text-blue-500`}></i>
              <p>My Orders</p>
            </div>
        </Link>
        <Link to="/dashboard/favorites" activeClassName="hover:bg-blue-100 hover:text-blue-500">
            <div className="flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500">
              <i className={`far fa-heart text-blue-500`}></i>
              <p>My Favorites</p>
            </div>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
