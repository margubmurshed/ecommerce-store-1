import { Avatar, Badge, Button, Chip } from "@material-ui/core";
import { Menu, PersonOutline, ShoppingBasket } from "@material-ui/icons";
import { memo } from "react";
import { NavLink } from "react-router-dom";

const TopNav = ({ Toggle, user, cart, userInfo }) => {
  const name = userInfo ? userInfo.name : user ? user.displayName : '';
  return (
    <>
      <div className="flex items-center justify-between bg-white px-5 gap-x-2 sticky top-0" style={{ height: '70px' }}>
        <div className="flex items-center gap-x-2">
          <Menu
            className="cursor-pointer text-3xl important"
            onClick={Toggle}
          />
          <NavLink
            to="/"
            className="font-bold md:text-xl text-base pl-2 rounded-xl transition-all"
          >
            E-
            <span className="text-blue-600 font-semibold lowercase">
              Commerce
            </span>
          </NavLink>
        </div>
        <div className="flex items-center gap-5">
          {user === null ? (
            <NavLink to="/login">
              <Button
                className="flex-1"
                variant="outlined"
                color="primary"
                startIcon={<PersonOutline />}
              >
                Login
              </Button>
            </NavLink>
          ) : (
            <>
              <NavLink to="/cart">
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingBasket />
                </Badge>
              </NavLink>
              <NavLink to="/dashboard">
                <div className="hidden md:block">
                  <Chip
                    avatar={<Avatar src={user.photoURL} alt="user photo" />}
                    label={name.length < 20 ? name : name.slice(0, 16) + '...'}
                    variant="outlined"
                    clickable
                  />
                </div>
                <div className="block md:hidden">
                  <Avatar src={user.photoURL} alt="user photo" />
                </div>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(TopNav);
