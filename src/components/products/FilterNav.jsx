import { SelectedFilters } from "./SelectedFilterNav";
export default function FilterNav({
  handleFilterChange,
  selectedCategory,
  selectedBrand,
  selectedColor,
  brandOptions,
  categoryOptions,
  colorOptions,
  handlePriceChange,
}) {
  const renderFilterList = (options, key) => {
    return options.map((value, id) => {
      return (
        <button onClick={() => handleFilterChange(key, value)} key={id}>
          {value}
        </button>
      );
    });
  };

  return (
    <>
      <div className="product-list-filter-buttons">
        <div className="dropdown">
          <button className="dropbtn">Brands</button>
          <div className="dropdown-content">
            {renderFilterList(brandOptions, "brand")}
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Categories</button>
          <div className="dropdown-content">
            {renderFilterList(categoryOptions, "category")}
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Colors</button>
          <div className="dropdown-content">
            {renderFilterList(colorOptions, "color")}
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Sort</button>
          <div className="dropdown-content">
            <button onClick={handlePriceChange}>By Price</button>
          </div>
        </div>

        {selectedCategory || selectedBrand || selectedColor ? (
          <button
            onClick={() => {
              handleFilterChange("category", null);
              handleFilterChange("brand", null);
              handleFilterChange("color", null);
            }}
            className="product-type clear-filters"
          >
            Clear all filters
          </button>
        ) : null}
      </div>
      <SelectedFilters
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        selectedColor={selectedColor}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
}
