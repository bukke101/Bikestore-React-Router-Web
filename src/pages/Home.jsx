import { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getProducts } from "../api";
import LatestProducts from "../components/products/LatestProducts";

export function loader() {
  return defer({ products: getProducts() });
}

export default function Home() {
  const dataPromise = useLoaderData();
  return (
    <>
      <div className="home-container">
        <h1>Welcome to Our Online Bike store</h1>
        <p>Worldwide Shipping</p>
        <Link to="products">Check New Arrivals</Link>
      </div>
      <div className="product-list-container">
        <Suspense
          fallback={
            <div className="loading">
              <h2>Loading Products...</h2>
            </div>
          }
        >
          <Await resolve={dataPromise.products}>
            {(products) => <LatestProducts products={products} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}
