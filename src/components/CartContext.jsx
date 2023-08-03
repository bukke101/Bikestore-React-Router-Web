import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Update localStorage whenever cart items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartMessage("Added to Cart");
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      // Product not in the cart, add it as a new entry with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  // Clear the cart message after 3 seconds
  useEffect(() => {
    if (cartMessage) {
      const timerId = setTimeout(() => {
        setCartMessage("");
      }, 2000);

      return () => clearTimeout(timerId);
    }
  }, [cartMessage]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartMessage }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
