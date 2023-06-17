import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

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
    <section>
      <h1 className="admin-product-title">Your listed products</h1>
      <div className="admin-product-list">
        {products.length > 0 ? (
          <section>{adminProductsEl}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}
