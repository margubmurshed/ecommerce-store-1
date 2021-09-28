import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import NavSlider from "./NavSlider";
import TopNav from "./TopNav";

const Navbar = () => {
  const { user, cart } = useSelector(({ user, cart }) => ({ user, cart }))
  const [toggle, setToggle] = useState(true);

  const Toggle = useCallback(() => {
    setToggle(prevToggle => !prevToggle);
  }, [])

  return (
    <>
      <TopNav Toggle={Toggle} user={user} cart={cart} />
      <NavSlider toggleState={toggle} Toggle={Toggle} />
    </>
  );
};

export default Navbar;
