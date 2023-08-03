import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../components/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <div className="cart-header">
        {cartItems.length !== 0 ? (
          <h3>Cart Items</h3>
        ) : (
          <>
            <h3>empty cart</h3>
            <Link to="/products"> Return to Products</Link>
          </>
        )}
      </div>

      <ul>
        {cartItems.map((product) => (
          <div key={product.id} className="cart-product">
            <img src={product.image} alt={product.name} />
            <div className="admin-product-info">
              <h3>
                {product.brand} {product.name}
              </h3>
              <p>
                <b>${product.price}</b>
              </p>
              <p>
                Quantity: <b>{product.quantity}</b>
              </p>
              <button
                className="cart-remove-btn"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
