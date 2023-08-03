import { useOutletContext } from "react-router-dom";
export default function AdminProductInfo() {
  const { product } = useOutletContext();
  return (
    <section className="admin-product-detail-info">
      <h4>Name: {product.name}</h4>
      <h4>Category: {product.category}</h4>
      <h4>Description: {product.description}</h4>
      <h4>Visibility: public</h4>
    </section>
  );
}
