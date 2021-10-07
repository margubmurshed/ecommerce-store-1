import { Menu } from "@material-ui/icons";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseAuth } from '../../firebase';
import { Links } from "./links";

export const textShortner = (text, letterNumber) => {
  return (text.length < letterNumber ? text : text.slice(0, letterNumber - 3) + '...')
}

const NavSlider = ({ toggleSlider, toggle, user, userInfo }) => {
  const name = userInfo ? userInfo.name : user ? user.displayName : '';
  const activeClassName = "bg-blue-500 text-white";
  const signOut = async () => {
    await FirebaseAuth.signOut()
  }

  return (
    <>
      <div
        className="top-0 h-full w-62 bg-white flex flex-col px-5 py-3 fixed gap-y-4 z-50 shadow-xl"
        style={
          toggle
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
            onClick={toggleSlider}
          />
          <NavLink to="/"
            className="font-bold text-xl px-5 py-3 rounded-xl transition-all"
          >
            E-<span className="text-blue-600 font-semibold lowercase">Commerce</span>
          </NavLink>
        </div>
        <div className="flex flex-col gap-y-2">
          {Links.map((link, index) => {
            return (
              <Fragment key={index}>
                {link.private ? (
                  user ? (
                    <NavLink
                      to={link.to}
                      className="p-2 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition"
                      activeClassName={activeClassName}
                      exact
                    >
                      <i className={link.icon} />
                      <span className="font-medium text-sm">{link.label}</span>
                    </NavLink>
                  ) : null
                ) : (
                  <NavLink
                    to={link.to}
                    className="p-2 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition"
                    activeClassName={activeClassName}
                    exact>
                    <i className={link.icon} />
                    <span className="font-medium text-sm">{link.label}</span>
                  </NavLink>
                )}
              </Fragment>
            )
          })}
          {user && (
            <NavLink to="/dashboard" className="p-2 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition" activeClassName={activeClassName} exact>
              <img src={user.photoURL} alt="" width="30px" className="rounded-full" />
              <span className="font-medium text-sm">{textShortner(name, 20)}</span>
            </NavLink>
          )}
          {user ? (
            <div className="p-2 flex gap-2 items-center rounded-md cursor-pointer hover:bg-red-500 hover:text-white" onClick={signOut}>
              <i className="fas fa-sign-out-alt" />
              <span className="font-medium text-sm">Sign Out</span>
            </div>
          ) : (
            <NavLink to="/login" className="p-2 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition" activeClassName={activeClassName} exact>
              <i className="fas fa-user" />
              <span className="font-medium text-sm">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default NavSlider;
