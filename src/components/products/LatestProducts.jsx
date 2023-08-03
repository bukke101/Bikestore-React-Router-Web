import { Link } from "react-router-dom";

export default function LatestProducts({ products }) {
  const homeProducts = products.slice(-3);

  const newProducts = homeProducts.map((product) => (
    <div key={product.id} className="product-tile">
      <Link to={`products/${product.id}`}>
        <div className="product-img-container">
          <img src={product.image} alt={product.name} />
          <div className="middle">
            <div className="product-img-title">{product.name}</div>
          </div>
        </div>
        <h2 className="home-latest-products">
          {product.brand} {product.name}
        </h2>
      </Link>
    </div>
  ));

  return (
    <div>
      <div className="home-products-title">
        <h3>Latest Products</h3>
      </div>
      <div className="product-list">{newProducts}</div>
    </div>
  );
}
