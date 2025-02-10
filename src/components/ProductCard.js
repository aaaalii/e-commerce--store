import { useNavigate } from "react-router";

export default function ProductCard({category, title, price, description, image, rating, ratingCount, id}){
  const navigate = useNavigate();
  return (
    <>
      <div className="product-card__container p-3 rounded bg-dark text-light">
        <div className="d-flex justify-content-around">
          <h3>{category}</h3>
          <img src={image} alt="" width='50px' height='50px'/>
        </div>
        <div className="text-truncate">
          <div className="text-truncate">{title}</div>
          <div className="text-truncate">{description}</div>
        </div>
        <div>Price: {price} $</div>
        <div>Rating: {rating} | Total ratings: {ratingCount}</div>
        <div className="position-relative float-end">
          <button className="p-1 btn btn-primary" onClick={() => {
            navigate(`/product/${id}`);
          }}>Details</button>
        </div>
      </div>
    </>
  );
}