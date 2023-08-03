import { Suspense, useContext } from "react";
import { useLocation, useLoaderData, defer, Await } from "react-router-dom";
import ProductDetailTile from "../../components/products/ProductDetailTile";
import { getProducts } from "../../api";
import CartContext from "../../components/CartContext";

export function loader({ params }) {
  return defer({ products: getProducts(params.id) });
}

export default function ProductDetail() {
  const location = useLocation();
  const productDataPromise = useLoaderData();
  const { addToCart } = useContext(CartContext);

  const search = location.state?.search || "";
  const category =
    location.state?.category?.split(",").join(" & ") || "products";

  function renderProduct(product) {
    return (
      <ProductDetailTile
        product={product}
        search={search}
        category={category}
        addToCart={addToCart}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <div className="loading">
          <h2>Loading Products...</h2>
        </div>
      }
    >
      <Await resolve={productDataPromise.products}>{renderProduct}</Await>
    </Suspense>
  );
}
