import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <header>
      <Link to="/" className="site-logo">
        Bikeshop
      </Link>
      <nav>
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Log in
        </NavLink>
      </nav>
    </header>
  );
}