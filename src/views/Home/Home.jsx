import { Link } from "react-router-dom";

export default function Home() {
  return (
    <h1>
      Welcome to our shop! <Link to={"/shop"}>Shop</Link>
    </h1>
  );
}
