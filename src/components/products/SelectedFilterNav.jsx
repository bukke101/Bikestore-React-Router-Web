export function SelectedFilters({
  selectedCategory,
  selectedBrand,
  selectedColor,
  handleFilterChange,
}) {
  const filters = [];

  if (selectedCategory) {
    const categoryValues = selectedCategory.split(",");
    categoryValues.forEach((value) => {
      filters.push(
        <button
          key={`category-${value}`}
          className="selected-cat-btn"
          onClick={() => handleFilterChange("category", value)}
        >
          <span aria-hidden="true">&times; {value}</span>
        </button>
      );
    });
  }

  if (selectedBrand) {
    const brandValues = selectedBrand.split(",");
    brandValues.forEach((value) => {
      filters.push(
        <button
          key={`brand-${value}`}
          className="selected-cat-btn"
          onClick={() => handleFilterChange("brand", value)}
        >
          <span aria-hidden="true">&times; {value}</span>
        </button>
      );
    });
  }

  if (selectedColor) {
    const colorValues = selectedColor.split(",");
    colorValues.forEach((value) => {
      filters.push(
        <button
          key={`color-${value}`}
          className="selected-cat-btn"
          onClick={() => handleFilterChange("color", value)}
        >
          <span aria-hidden="true">&times; {value}</span>
        </button>
      );
    });
  }

  return filters.length > 0 ? (
    <div className="selected-filters">{filters}</div>
  ) : null;
}
