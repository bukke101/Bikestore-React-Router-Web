import { useOutletContext } from "react-router-dom";
export default function AdminProductInfo() {
  const { currentProduct } = useOutletContext();
  return (
    <section className="admin-product-detail-info">
      <h4>Name: {currentProduct.name}</h4>
      <h4>Category: {currentProduct.category}</h4>
      <h4>Description: {currentProduct.description}</h4>
      <h4>Visibility: public</h4>
    </section>
  );
}
