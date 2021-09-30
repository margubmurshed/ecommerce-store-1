import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import NavSlider from "./NavSlider";
import TopNav from "./TopNav";

const Navbar = () => {
  const { user, cart, userInfo } = useSelector(({ user, cart, userInfo }) => ({ user, cart, userInfo }))
  const [toggle, setToggle] = useState(true);

  const Toggle = useCallback(() => {
    setToggle(prevToggle => !prevToggle);
  }, [])

  return (
    <nav>
      <TopNav Toggle={Toggle} user={user} cart={cart} userInfo={userInfo} />
      <NavSlider toggleState={toggle} Toggle={Toggle} user={user} />
    </nav>
  );
};

export default Navbar;
