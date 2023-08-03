function filterProducts(
  products,
  selectedBrand,
  selectedCategory,
  selectedColor
) {
  return products.filter((product) => {
    const filteredBrand =
      !selectedBrand || selectedBrand.includes(product.brand);
    const filteredCategory =
      !selectedCategory || selectedCategory.includes(product.category);
    const filteredColor =
      !selectedColor || selectedColor.includes(product.color);
    return filteredBrand && filteredCategory && filteredColor;
  });
}

function sortProducts(products, sortOrder, sortKey) {
  return products.sort((a, b) => {
    return sortOrder === "asc"
      ? a[sortKey] - b[sortKey]
      : b[sortKey] - a[sortKey];
  });
}

export { filterProducts, sortProducts };
