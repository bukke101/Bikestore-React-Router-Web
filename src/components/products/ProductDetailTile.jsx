import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../CartContext";
export default function ProductDetailTile({ product, search, category }) {
  const { addToCart, cartMessage } = useContext(CartContext);
  return (
    <div className="product-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr;
        <span>
          Back to <b>{category}</b>
        </span>
      </Link>

      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <h3 className="cart-msg">{cartMessage}</h3>
        <h2>
          {product.brand} {product.name} - <span>${product.price}</span>
        </h2>
        <p>{product.description}</p>
        <button className="link-button" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
        <p>
          <span className="product-meta">categories:</span> {product.category} -{" "}
          {product.color}
        </p>
      </div>
    </div>
  );
}
