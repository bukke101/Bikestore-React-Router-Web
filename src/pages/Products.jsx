import { useState } from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import FilterNav from "../components/FilterNav";
import { getProducts } from "../../api";

export function loader() {
  return getProducts();
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  const products = useLoaderData();

  const selectedCategory = searchParams.get("category");
  const selectedBrand = searchParams.get("brand");
  const selectedColor = searchParams.get("color");

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];
  const uniqueColors = [...new Set(products.map((product) => product.color))];
  const uniquePrices = [...new Set(products.map((product) => product.price))];

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  const filteredProducts = products.filter((product) => {
    const filteredBrand = selectedBrand
      ? product.brand === selectedBrand
      : products;
    const filteredCategory = selectedCategory
      ? product.category === selectedCategory
      : products;
    const filteredColor = selectedColor
      ? product.color === selectedColor
      : products;
    return filteredBrand && filteredCategory && filteredColor;
  });

  const allProducts = filteredProducts.map((product) => (
    <div key={product.id} className="product-tile">
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
        <img src={product.image} />
        <div className="product-info">
          <p>
            {product.category} - {product.color} - ${product.price}{" "}
          </p>
        </div>
      </Link>
    </div>
  ));

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-filter-buttons">
        <FilterNav
          categoryOptions={uniqueCategories}
          brandOptions={uniqueBrands}
          colorOptions={uniqueColors}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <div className="product-list">{allProducts}</div>
    </div>
  );
}
