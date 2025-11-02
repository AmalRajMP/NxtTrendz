import "./index.css";

const SimilarProductItem = (props) => {
  const { productDetails } = props;
  const { imageUrl, title, price, brand, rating } = productDetails;

  return (
    <li>
      <div className="similar-product-container">
        <img
          className="similar-product-img"
          src={imageUrl}
          alt={`similar product ${title}`}
        />
        <p className="similar-product-title">{title}</p>
        <p className="similar-product-brand">By {brand}</p>
        <div className="similar-product-price-and-rating-container">
          <p className="similar-product-price">Rs {price}/-</p>
          <div className="similar-product-rating-container">
            <p className="similar-product-rating">{rating}</p>
            <img
              className="similar-product-star-img"
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SimilarProductItem;
