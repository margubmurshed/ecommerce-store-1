import { Menu } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { FirebaseAuth } from '../../firebase';

const NavSlider = ({ toggleState, Toggle, user }) => {
  const logout = async () => {
    await FirebaseAuth.signOut()
  }

  return (
    <>
      <div
        className="top-0 h-full w-62 bg-white flex flex-col px-5 py-3 fixed gap-y-4 z-50 shadow-xl"
        style={
          toggleState
            ? {
              left: "-100%",
              transition: "left 1s ease-in-out",
            }
            : {
              left: "0",
              transition: "left 0.5s ease",
            }
        }
      >
        <div className="flex items-center gap-x-2">
          <Menu
            className="cursor-pointer text-3xl important"
            onClick={Toggle}
          />
          <NavLink to="/"
            className="font-bold text-xl px-5 py-3 rounded-xl transition-all"
          >
            E-<span className="text-blue-600 font-semibold lowercase">Commerce</span>
          </NavLink>
        </div>
        <div className="flex flex-col gap-y-3">
          {user ? (
            <>
              <NavLink to="/" className="bg-gray-100 p-3 rounded-md cursor-pointer transition hover:bg-blue-500 hover:text-white" activeClassName="bg-blue-500 text-white" exact>Home</NavLink>
              <NavLink to="/cart" className="bg-gray-100 p-3 rounded-md cursor-pointer transition hover:bg-blue-500 hover:text-white" activeClassName="bg-blue-500 text-white" exact>Cart</NavLink>
              <NavLink to="/dashboard" className="bg-gray-100 p-3 rounded-md cursor-pointer transition hover:bg-blue-500 hover:text-white" activeClassName="bg-blue-500 text-white" exact>Dashboard</NavLink>
              <div className="bg-red-500 text-white p-3 rounded-md cursor-pointer transition" onClick={logout}>Logout</div>
            </>
          ) : (
            <>
              <NavLink to="/" className="bg-gray-100 p-3 rounded-md cursor-pointer transition hover:bg-blue-500 hover:text-white" activeClassName="bg-blue-500 text-white" exact>Home</NavLink>
              <NavLink to="/login" className="bg-gray-100 p-3 rounded-md cursor-pointer transition hover:bg-blue-500 hover:text-white" activeClassName="bg-blue-500 text-white" exact>Login</NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavSlider;
