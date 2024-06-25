import { useState } from "react";
import switchImg from "../assets/icons/switch.svg";

const Filter = ({ onFilter, onSort }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [startingPrice, setStartingPrice] = useState(150);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const handleOpen = () => {
    setIsOpened(!isOpened);
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setStartingPrice(newPrice);
    onFilter({ startingPrice: newPrice, category, sortBy });
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    onFilter({ startingPrice, category: newCategory, sortBy });
  };

  const handleSortByChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    onSort(newSortBy);
  };

  const handleClear = () => {
    setStartingPrice(150);
    setCategory("all");
    setSortBy("");
    onFilter({ startingPrice: 150, category: "all", sortBy: "" });
  };

  return (
    <div className="relative">
      <div
        className="relative grid place-items-center w-16 h-16 left-2 -top-2 bg-lagoon-blue shadow shadow-lagoon-blue/40 rounded-3xl cursor-pointer p-1 overflow-hidden"
        onClick={handleOpen}
      >
        <img src={switchImg} className="w-5 h-5" alt="Switch" />
      </div>

      <div className={`absolute top-16 -left-36 ${isOpened ? "block" : "hidden"}`}>
        <div className="bg-white shadow-2xl rounded-lg p-2 w-52">
          <div className="flex items-center justify-between">
            <label htmlFor="filter" className="text-base font-semibold">
              Filter
            </label>
            <button
              className="text-sm font-semibold text-lagoon-blue"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
          <div className="mt-3">
            <label htmlFor="filter" className="text-sm font-semibold">
              Price
            </label>
            <input
              type="range"
              min={40}
              max={150}
              id="filter"
              className="w-full bg-sea-form-1 px-4 py-2 rounded-lg mt-1"
              value={startingPrice}
              onChange={handlePriceChange}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="filter" className="text-sm font-semibold">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="w-full bg-sea-form-1 px-4 py-2 rounded-lg mt-1"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="all">All</option>
              <option value="Coffee Shop">Coffee Shop</option>
              <option value="Restaurant">Restaurant</option>
            </select>
          </div>
          <div className="mt-3">
            <p className="text-sm font-semibold">Sort by</p>
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  id="sort1"
                  className="mr-2"
                  value="name-az"
                  checked={sortBy === "name-az"}
                  onChange={handleSortByChange}
                />
                <label htmlFor="sort1" className="text-sm">
                  Name: A - Z
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  id="sort2"
                  className="mr-2"
                  value="name-za"
                  checked={sortBy === "name-za"}
                  onChange={handleSortByChange}
                />
                <label htmlFor="sort2" className="text-sm">
                  Name: Z - A
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  id="sort3"
                  className="mr-2"
                  value="popularity"
                  checked={sortBy === "popularity"}
                  onChange={handleSortByChange}
                />
                <label htmlFor="sort3" className="text-sm">
                  Popularity
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
