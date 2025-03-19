import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import "./Category.css";

export default function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState({
    categoryId: "",
    categorySlug: id,
    categoryTitle: "",
    categoryDescription: "",
    categoryImageId: "",
    products: [],
  });
  const { request } = useContext(AppContext);

  useEffect(() => {
    request("/product?type=category&slug=" + id)
      .then(setCategory)
      .catch(console.log);
  }, [id]);

  return (
    <>
      <h1>{category.categoryTitle}</h1>
      <br />
      <br />
      <div className="products">
        {category.products.map((p) => (
          <ProductCard key={p.productId} product={p} />
        ))}
      </div>
      <br />
      <br />
      <Link to={"/shop"}>BACK</Link>
    </>
  );
}

function ProductCard({ product }) {
  const { accessToken, request } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!accessToken) {
      if (confirm("Please sign in to add to cart")) {
        navigate("/signin");
      }
      return;
    }
    console.log("ProductCard: ", product.productId);

    request("/cart", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "productId=" + product.productId,
    })
      .then(console.log)
      .catch(console.error());
  };

  return (
    <Link className="product-card" to={"/product/" + product.productSlug}>
      <span onClick={handleCardClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#252525"
        >
          <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
        </svg>
      </span>
      <img src={product.productImageId} alt="productImageId" />
      <h2>{product.productTitle}</h2>
      <p> {product.productDescription}</p>
      <b>{product.productPrice.toFixed(2)} грн.</b>
    </Link>
  );
}
