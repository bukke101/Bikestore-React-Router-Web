import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useLoaderData, defer, Await } from "react-router-dom";
import FilterNav from "../../components/products/FilterNav";
import ProductTile from "../../components/products/ProductTile";
import { filterProducts, sortProducts } from "../../helpers/productsUtils";
import { getProducts } from "../../api";

export function loader() {
  return defer({ products: getProducts() });
}
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const productDataPromise = useLoaderData();

  const selectedCategory = searchParams.get("category");
  const selectedBrand = searchParams.get("brand");
  const selectedColor = searchParams.get("color");
  const [sortByPriceAsc, setSortByPriceAsc] = useState(true);

  function uniqueValues(products) {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];
    const uniqueColors = [...new Set(products.map((product) => product.color))];
    return { uniqueCategories, uniqueBrands, uniqueColors };
  }

  function handleFilterChange(filterType, filterValue) {
    setSearchParams((prevParams) => {
      const values = prevParams.get(filterType)?.split(",") || [];

      if (filterValue === null) {
        // Remove the entire filter type from the URL
        prevParams.delete(filterType);
      } else if (values.includes(filterValue)) {
        // Remove the specific filter value from the URL
        const updatedValues = values.filter((value) => value !== filterValue);
        if (updatedValues.length === 0) {
          // If there are no filter values left, delete the filter type from the URL
          prevParams.delete(filterType);
        } else {
          prevParams.set(filterType, updatedValues.join(","));
        }
      } else {
        // Add the filter value to the URL
        prevParams.set(filterType, [...values, filterValue].join(","));
      }
      return prevParams;
    });
  }

  function handlePriceChange() {
    setSortByPriceAsc((prevSortByPriceAsc) => !prevSortByPriceAsc);
  }

  function renderProducts(products) {
    const sortedFilteredProducts = useMemo(() => {
      const filteredProducts = filterProducts(
        products,
        selectedBrand,
        selectedCategory,
        selectedColor
      );
      return sortProducts(
        filteredProducts,
        sortByPriceAsc ? "asc" : "desc",
        "price"
      );
    }, [selectedBrand, selectedCategory, selectedColor, sortByPriceAsc]);

    const { uniqueCategories, uniqueBrands, uniqueColors } =
      uniqueValues(products);

    const renderedProducts = sortedFilteredProducts.map((product) => (
      <ProductTile
        key={product.id}
        product={product}
        searchParams={searchParams}
        selectedCategory={selectedCategory}
      />
    ));
    return (
      <>
        <FilterNav
          categoryOptions={uniqueCategories}
          brandOptions={uniqueBrands}
          colorOptions={uniqueColors}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          selectedColor={selectedColor}
          handleFilterChange={handleFilterChange}
          handlePriceChange={handlePriceChange}
        />
        <div className="product-list">{renderedProducts}</div>
      </>
    );
  }

  return (
    <div className="product-list-container">
      <Suspense
        fallback={
          <div className="loading">
            <h2>Loading Products...</h2>
          </div>
        }
      >
        <Await resolve={productDataPromise.products}>{renderProducts}</Await>
      </Suspense>
    </div>
  );
}
