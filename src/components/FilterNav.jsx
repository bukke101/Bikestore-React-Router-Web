export default function FilterNav(props) {
  const renderFilterList = (options, key) => {
    return options.map((value, id) => {
      return (
        <a onClick={() => props.handleFilterChange(key, value)} key={id}>
          {value}
        </a>
      );
    });
  };
  return (
    <>
      <div className="dropdown">
        <button className="dropbtn">Brands</button>
        <div className="dropdown-content">
          {renderFilterList(props.brandOptions, "brand")}
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">Categories</button>
        <div className="dropdown-content">
          {renderFilterList(props.categoryOptions, "category")}
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">Colors</button>
        <div className="dropdown-content">
          {renderFilterList(props.colorOptions, "color")}
        </div>
      </div>
      {/* 
      {props.categoryOptions || props.selectedBrand || props.selectedColor ? (
        <button
          onClick={() => props.handleFilterChange("category", null)}
          className="product-type clear-filters"
        >
          Clear filter
        </button>
      ) : null} */}
    </>
  );
}
