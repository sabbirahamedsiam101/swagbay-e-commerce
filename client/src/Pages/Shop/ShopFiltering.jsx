import React from "react";

function ShopFiltering({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) {
  return (
    <div className="space-y-6 w-full md:w-[220px]">
      <h3 className="text-xl font-semibold">Filters</h3>

      {/* Category Filter */}
      <div>
        <h4 className="font-medium text-lg mb-2">Category</h4>
        {filters.categories.map((category) => (
          <label
            key={category}
            className="capitalize block pt-2 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
              className="mr-2"
            />
            <span> {category}</span>
          </label>
        ))}
      </div>

      {/* Color Filter */}
      <div>
        <h4 className="font-medium text-lg mb-2">Color</h4>
        {filters.colors.map((color) => (
          <label key={color} className="capitalize block pt-2 cursor-pointer">
            <input
              type="radio"
              name="colors"
              value={color}
              checked={filtersState.colors === color}
              onChange={(e) =>
                setFiltersState({ ...filtersState, colors: e.target.value })
              }
              className="mr-2"
            />
            <span> {color}</span>
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-medium text-lg mb-2">Price</h4>
        {filters.priceRanges.map((range) => (
          <label
            key={range.label}
            className="capitalize block pt-2 cursor-pointer"
          >
            <input
              type="radio"
              name="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({
                  ...filtersState,
                  priceRange: e.target.value,
                })
              }
              className="mr-2"
            />
            <span> {range.label}</span>
          </label>
        ))}
      </div>

      {/* Clear Button */}
      <div className="pt-5">
        <button
          onClick={clearFilters}
          className="text-sm bg-(--color-primary) hover:bg-(--color-primary-dark) text-white py-2 px-4 rounded"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}

export default ShopFiltering;
