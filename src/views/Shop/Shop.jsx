import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import "./Shop.css";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState({});
  const { request } = useContext(AppContext);

  useEffect(() => {
    Promise.all([
      request("/product?type=categories"),
      request("/product?type=category-count"),
    ])
      .then(([categoriesData, categoryCountData]) => {
        setCategories(categoriesData);
        setCategoryCount(categoryCountData);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      <h1>Shop</h1>
      <br />
      <br />
      <div className="categories">
        {categories.map((c) => (
          <Link
            to={`/category/${c.categorySlug}`}
            key={c.categoryId}
            className="category-card"
          >
            <img src={c.categoryImageId} alt="Logo" />
            <h3 className="card-header">{c.categoryTitle}</h3>
            <span className="card-footer">
              {c.categoryDescription}
              <i>
                {categoryCount[c.categoryId]
                  ? `товарів: ${categoryCount[c.categoryId]}`
                  : `немає залишків`}
              </i>
            </span>
          </Link>
        ))}
      </div>
      <br />
      <br />
      <Link to={"/"}>HOME</Link>
    </>
  );
}
