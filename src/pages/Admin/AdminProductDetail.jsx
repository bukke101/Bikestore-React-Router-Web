import { Suspense } from "react";
import {
  Link,
  Outlet,
  NavLink,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getProducts } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ products: getProducts(params.id) });
}

export default function AdminProductDetail() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const dataPromise = useLoaderData();

  function renderProduct(product) {
    return (
      <section>
        <Link to=".." relative="path" className="back-button">
          &larr;{" "}
          <span>
            Back to all <b>products</b>
          </span>
        </Link>

        <div className="admin-product-detail-layout-container">
          <div className="admin-product-detail">
            <img src={product.image} />
            <div className="admin-product-detail-info-text">
              <h3>
                {product.brand} {product.name}
              </h3>
              <h4>${product.price}</h4>
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

          <Outlet context={{ product }} />
        </div>
      </section>
    );
  }
  return (
    <Suspense
      fallbacl={
        <div className="loading">
          <h2>Loading Products...</h2>
        </div>
      }
    >
      <Await resolve={dataPromise.products}>{renderProduct}</Await>
    </Suspense>
  );
}
