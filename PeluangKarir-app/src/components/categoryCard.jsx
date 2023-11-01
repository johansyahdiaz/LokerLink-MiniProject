import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CategoryCard({ categories, showMore }) {
  const categoriesToShow = showMore ? categories : categories.slice(0, 10);

  return (
    <div className="category-list flex flex-wrap items-center justify-evenly gap-y-4 m-4 ">
      {categoriesToShow.map((category) => (
        <Link to={`/job-catalog?category=${category.title}`} key={category.id} className="card w-72 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 pb-5">
            <i className={category.logo}></i>
          </figure>
          <div className="card-body items-center text-center">
            <a className="card-title">{category.title}</a>
            <p>{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

CategoryCard.propTypes = {
  categories: PropTypes.array.isRequired,
  showMore: PropTypes.bool.isRequired,
};

export default CategoryCard;
