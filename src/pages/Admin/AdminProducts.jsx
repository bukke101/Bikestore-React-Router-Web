import { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getAdminProducts } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ products: getAdminProducts() });
}

export default function AdminProducts() {
  const dataPromise = useLoaderData();

  function renderAdminProducts(products) {
    const adminProductsEl = products.map((product) => (
      <Link
        to={`/admin/products/${product.id}`}
        key={product.id}
        className="admin-product-link-wrapper"
      >
        <div className="admin-product-single" key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className="admin-product-info">
            <h3>
              {product.brand} {product.name}
            </h3>
            <p>${product.price}</p>
          </div>
        </div>
      </Link>
    ));
    return (
      <div className="admin-product-list">
        <section>{adminProductsEl}</section>
      </div>
    );
  }

  return (
    <section>
      <h1 className="admin-product-title">Your listed products</h1>
      <Suspense
        fallback={
          <div className="loading">
            <h2>Loading Products...</h2>
          </div>
        }
      >
        <Await resolve={dataPromise.products}>{renderAdminProducts}</Await>
      </Suspense>
    </section>
  );
}
