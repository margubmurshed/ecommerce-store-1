import { useCallback, useState } from "react";
import { connect } from "react-redux";
import NavSlider from "./NavSlider";
import TopNav from "./TopNav";

const MapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

const Navbar = ({user, cart}) => {
  console.log("Navbar Component Render")
  const [toggle, setToggle] = useState(true);

  // function Toggle() {
  //   setToggle(prevToggle => !prevToggle);
  // }

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

export default connect(MapStateToProps)(Navbar);
