import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../AppContext";

export default function Admin() {
  const [categories, setCategories] = useState([]);
  const { request, accessToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !accessToken.accessTokenId) {
      navigate("/signin");
      return;
    }

    request("/product?type=categories").then(setCategories).catch(console.log);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    request("/product", {
      method: "POST",
      body: formData,
    })
      .then((response) => console.log("Product added:", response))
      .catch(console.log);
  };

  return (
    <>
      <h1>Admin</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="product-title" placeholder="Title" required />
        <br />
        <input
          type="text"
          name="product-description"
          placeholder="Description"
          required
        />
        <br />
        <input
          type="number"
          name="product-price"
          placeholder="Price"
          step="0.01"
          required
        />
        <br />
        <input
          type="number"
          name="product-stock"
          placeholder="Quantity"
          required
        />
        <br />
        <input type="text" name="product-code" placeholder="Code" required />
        <br />
        <input type="file" name="product-image" required />
        <br />
        <select name="category-id" required>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.categoryId} value={c.categoryId}>
              {c.categoryTitle}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">ADD PRODUCT</button>
      </form>
    </>
  );
}
