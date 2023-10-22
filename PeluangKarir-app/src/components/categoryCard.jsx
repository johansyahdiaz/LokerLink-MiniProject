// CategoryCard.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

function CategoryCard({ categories, showMore }) {
  const categoriesToShow = showMore ? categories : categories.slice(0, 10);

  return (
    <div className="category-list flex flex-wrap items-center justify-evenly gap-y-4 m-4">
      {categoriesToShow.map((category) => (
        <div key={category.id} className="card w-72 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <a className="card-title">{category.title}</a>
            <p>{category.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

CategoryCard.propTypes = {
  categories: PropTypes.array.isRequired,
  showMore: PropTypes.bool.isRequired,
};

export default CategoryCard;
