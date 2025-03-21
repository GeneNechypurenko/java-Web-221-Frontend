import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import "./Layout.css";

export default function Layout() {
  const { cart, request } = useContext(AppContext);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [lastCategory, setLastCategory] = useState(null);

  useEffect(() => {
    request("/product?type=categories").then(setCategories).catch(console.log);
  }, []);

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let breadcrumbLinks = [{ name: "home", url: "/" }];

    for (let i = 0; i < pathSegments.length; i++) {
      let segment = pathSegments[i];
      let url = "/" + pathSegments.slice(0, i + 1).join("/");

      if (segment === "category" && pathSegments[i + 1]) {
        setLastCategory(pathSegments[i + 1]);
        breadcrumbLinks.push({ name: "shop", url: "/shop" });

        let categoryName = lastCategory;
        breadcrumbLinks.push({
          name: categoryName,
          url: `/category/${categoryName}`,
        });
        i++;
      } else if (segment === "product" && pathSegments[i + 1]) {
        breadcrumbLinks.push({ name: "shop", url: "/shop" });
        if (lastCategory) {
          breadcrumbLinks.push({
            name: lastCategory,
            url: `/category/${lastCategory}`,
          });
        }
        breadcrumbLinks.push({ name: pathSegments[i + 1], url: url });
        i++;
      } else {
        breadcrumbLinks.push({ name: segment, url: url });
      }
    }

    setBreadcrumbs(breadcrumbLinks);
  }, [location]);

  return (
    <div className="main-container">
      <header>
        <Link to={"/signup"}>Sign Up</Link>
        <Link to={"/signin"}>Sign In</Link>
        <Link to={"/profile"}>Profile</Link>
        <Link to={"/admin"}>Admin</Link>
        <Link to={"/shop"}>Shop</Link>
        {cart && <CustomerCart cart={cart} />}
      </header>

      <section className="content">
        <aside>
          <nav className="categories-nav">
            <ul>
              {categories.map((c) => (
                <li key={c.categoryId}>
                  <Link to={`/category/${c.categorySlug}`}>
                    {c.categoryTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="breadcrumbs">
            {breadcrumbs.map((bc, index) => (
              <span key={bc.url}>
                {index > 0 && " > "}
                <Link to={bc.url}>{bc.name}</Link>
              </span>
            ))}
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </section>

      <footer>&copy; IT Step Academy 2025</footer>
    </div>
  );
}

function CustomerCart({ cart }) {
  const cartItems = cart?.cartItems || [];

  const handleCountItems = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const handleCountTotalPrice = () => {
    return cartItems
      .reduce((price, item) => price + item.cartItemPrice, 0)
      .toFixed(2);
  };

  return (
    <span className="cart-icon">
      <button type="button" className="cart-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.5rem"
          viewBox="0 -960 960 960"
          width="1.5rem"
          fill="#FFFFFF"
        >
          <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h440q17 0 28.5 11.5T760-320q0 17-11.5 28.5T720-280H280q-45 0-68-39.5t-2-78.5l54-98-144-304H80q-17 0-28.5-11.5T40-840q0-17 11.5-28.5T80-880h65q11 0 21 6t15 17l27 57Zm134 280h280-280Z" />
        </svg>
      </button>

      {cartItems.length > 0 && (
        <span className="cart-count"> {handleCountItems()}</span>
      )}

      <span className="cart-total">
        {cartItems.length > 0
          ? handleCountTotalPrice() + " грн."
          : "Додайте товари в кошик"}
      </span>
    </span>
  );
}
