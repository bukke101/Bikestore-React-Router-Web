import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <>
      <nav className="admin-nav">
        <NavLink
          to="/admin"
          end
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Products
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
