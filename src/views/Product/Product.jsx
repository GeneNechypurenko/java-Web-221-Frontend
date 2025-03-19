import { useParams } from "react-router-dom";
import "./Product.css";

export default function Product() {
  const { id } = useParams();
  return <h1>Product {id}</h1>;
}
