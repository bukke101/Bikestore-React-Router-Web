import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import CartContext from "./CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const isLoggedIn = localStorage.getItem("loggedin");

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }

  return (
    <header>
      <Link to="/" className="site-logo">
        Bikestore
      </Link>
      <nav>
        <NavLink
          to="/products"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>
        {cartItems.length !== 0 ? (
          <NavLink
            to="/cart"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Cart
          </NavLink>
        ) : null}

        {!isLoggedIn ? (
          <NavLink
            to="/login"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/admin"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Dashboard
            </NavLink>
            <button className="logout" onClick={fakeLogOut}>
              Log out
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
