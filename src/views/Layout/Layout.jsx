import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import { useContext } from "react";
import AppContext from "../../AppContext";

export default function Layout() {
  const { cart } = useContext(AppContext);
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
      <main>
        <Outlet />
      </main>
      <footer>&copy; IT Step Accademy 2025</footer>
    </div>
  );
}
