import { useOutletContext } from "react-router-dom";

export default function AdminProductPhotos() {
  const { product } = useOutletContext();
  return <img src={product.image} className="admin-product-detail-image" />;
}
