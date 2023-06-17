import { useState, useEffect } from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";

export default function AdminProductDetail() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentProduct(data.products));
  }, []);

  if (!currentProduct) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all products</span>
      </Link>

      <div className="admin-product-detail-layout-container">
        <div className="admin-product-detail">
          <img src={currentProduct.image} />
          <div className="admin-product-detail-info-text">
            <h3>
              {currentProduct.brand} {currentProduct.name}
            </h3>
            <h4>${currentProduct.price}</h4>
          </div>
        </div>

        <nav className="admin-product-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Details
          </NavLink>

          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>

        <Outlet context={{ currentProduct }} />
      </div>
    </section>
  );
}
