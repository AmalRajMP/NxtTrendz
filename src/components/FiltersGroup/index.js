import { IoIosSearch } from "react-icons/io";

import "./index.css";

const FiltersGroup = (props) => {
  const {
    searchInput,
    activeCategoryId,
    categoryOptions,
    ratingsList,
    onChangeSearchInput,
    onEnterSearchInput,
    onChangeCategory,
    onChangeRating,
    clearFilters,
  } = props;

  const onChangeInput = (event) => {
    onChangeSearchInput(event.target.value);
  };

  const onClickEnter = (event) => {
    if (event.key === "Enter") {
      onEnterSearchInput();
    }
  };

  return (
    <div className="filters-group-container">
      <div className="search-box-container">
        <input
          className="search-box"
          type="search"
          value={searchInput}
          placeholder="Search"
          onChange={onChangeInput}
          onKeyDown={onClickEnter}
        />
        <IoIosSearch className="search-icon" />
      </div>
      <div className="categories-container">
        <h1 className="category-text">Category</h1>
        {categoryOptions.map((eachItem) => {
          const activeCategoryOptionClassName =
            activeCategoryId === eachItem.categoryId
              ? "active-category-option"
              : "";
          const onClickCategory = () => {
            onChangeCategory(eachItem.categoryId);
          };

          return (
            <p
              key={eachItem.categoryId}
              className={`category-option ${activeCategoryOptionClassName}`}
              onClick={onClickCategory}
            >
              {eachItem.name}
            </p>
          );
        })}
      </div>
      <div className="ratings-container">
        <p className="rating-text">Rating</p>
        {ratingsList.map((eachItem) => {
          const onClickRating = () => onChangeRating(eachItem.ratingId);
          return (
            <button
              key={eachItem.ratingId}
              className="rating-btn"
              type="button"
              value={eachItem.ratingId}
              onClick={onClickRating}
            >
              <img
                className="rating-img"
                src={eachItem.imageUrl}
                alt={`rating ${eachItem.ratingId}`}
              />
              & up
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FiltersGroup;
