import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

export default function ProductDetail() {
  const params = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.products));
  }, [params.id]);

  const search = location.state?.search || "";
  const category = location.state?.category || "products";

  return (
    <div className="product-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {category}</span>
      </Link>
      {product ? (
        <div className="product-detail">
          <img src={product.image} />
          <h2>
            {product.brand} {product.name}
          </h2>
          <p className="product-price">
            <span>${product.price}</span>
          </p>
          <p>{product.description}</p>
          <p>
            {product.category} - {product.color}
          </p>
          <button className="link-button">Buy</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
