import { useOutletContext } from "react-router-dom";

export default function AdminProductPhotos() {
  const { currentProduct } = useOutletContext();
  return (
    <img src={currentProduct.image} className="admin-product-detail-image" />
  );
}
