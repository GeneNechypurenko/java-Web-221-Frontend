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
        <i style={{ color: "white" }}>{JSON.stringify(cart)}</i>
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
