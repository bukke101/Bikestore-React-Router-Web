import { Link } from "react-router-dom";

export default function ProductTile({
  product,
  searchParams,
  selectedCategory,
}) {
  return (
    <div className="product-tile">
      <Link
        to={product.id}
        state={{
          search: `?${searchParams.toString()}`,
          category: selectedCategory,
        }}
      >
        <h2>
          {product.brand} {product.name}
        </h2>
        <div className="product-img-container">
          <img src={product.image} alt={product.name} />
          <div className="middle">
            <div className="product-img-title">{product.name}</div>
          </div>
        </div>

        <div className="product-info">
          <p>
            {product.category} - {product.color} -
            <span className="price"> ${product.price}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
