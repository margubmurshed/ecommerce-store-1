import { useState } from "react";
import { useSelector } from "react-redux";
import NavSlider from "./NavSlider";
import TopNav from "./TopNav";

const Navbar = () => {
  const { user, cart, userInfo } = useSelector(({ user, cart, userInfo }) => ({ user, cart, userInfo }))
  const [toggle, setToggle] = useState(true);
  const toggleSlider = () => {
    setToggle((prevState) => !prevState);
  }

  return (
    <nav>
      <TopNav toggleSlider={toggleSlider} user={user} cart={cart} />
      <NavSlider toggleSlider={toggleSlider} toggle={toggle} user={user} userInfo={userInfo} />
    </nav>
  );
};

export default Navbar;
