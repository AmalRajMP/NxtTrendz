import { Component } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import Header from "../Header";
import SimilarProductItem from "../SimilarProductItem";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class ProductItemDetails extends Component {
  state = {
    productItemDetails: {},
    productCount: 1,
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getProductItemDetails();
  }

  getProductItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const apiUrl = `https://apis.ccbp.in/products/${id}`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = {
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        title: fetchedData.title,
        price: fetchedData.price,
        description: fetchedData.description,
        brand: fetchedData.brand,
        totalReviews: fetchedData.total_reviews,
        rating: fetchedData.rating,
        availability: fetchedData.availability,
        similarProducts: fetchedData.similar_products.map((product) => ({
          id: product.id,
          imageUrl: product.image_url,
          title: product.title,
          style: product.style,
          price: product.price,
          description: product.description,
          brand: product.brand,
          totalReviews: product.total_reviews,
          rating: product.rating,
          availability: product.availability,
        })),
      };
      this.setState({
        productItemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  incrementProductCount = () => {
    this.setState((prevState) => ({
      productCount: prevState.productCount + 1,
    }));
  };

  decrementProductCount = () => {
    this.setState((prevState) => ({
      productCount: prevState.productCount > 1 ? prevState.productCount - 1 : 1,
    }));
  };

  onClickContnueShopping = () => {
    const { history } = this.props;
    history.replace("/products");
  };

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  );

  renderProductItemDetailsView = () => {
    const { productItemDetails, productCount } = this.state;
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productItemDetails;

    return (
      <div className="product-item-bg-container">
        <div className="product-item-details-container">
          <img className="selected-product-img" src={imageUrl} alt="product" />
          <div className="product-item-info-container">
            <h1 className="selected-product-title">{title}</h1>
            <p className="selected-product-price">Rs {price}/-</p>
            <div className="selected-product-review-container">
              <div className="selected-product-rating">
                <p className="selected-product-rating-count">{rating}</p>
                <img
                  className="selected-product-star-icon"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p>{totalReviews} Reviews</p>
            </div>
            <p className="selected-product-description">{description}</p>
            <p className="product-availability">
              <span className="available-text">Available:</span> {availability}
            </p>
            <p className="product-brand">
              <span className="brand-text">Brand:</span> {brand}
            </p>
            <div className="product-count-container">
              <button
                data-testid="minus"
                type="button"
                className="product-count-btn"
                onClick={this.decrementProductCount}
              >
                <BsDashSquare className="product-count-icon" />
              </button>
              <p className="product-count-text">{productCount}</p>
              <button
                data-testid="plus"
                type="button"
                className="product-count-btn"
                onClick={this.incrementProductCount}
              >
                <BsPlusSquare className="product-count-icon" />
              </button>
            </div>
            <button type="button" className="add-to-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-products-container">
          <h1 className="similar-products-heading">Similar Products</h1>
          <ul className="similar-products-list">
            {similarProducts.map((eachItem) => (
              <SimilarProductItem key={eachItem.id} productDetails={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    );
  };

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Product Not Found</h1>
      <button
        type="button"
        className="continue-shopping-btn"
        onClick={this.onClickContnueShopping}
      >
        Continue Shopping
      </button>
    </div>
  );

  renderAllDetails = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader();
      case apiStatusConstants.success:
        return this.renderProductItemDetailsView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="product-item-details-bg-container">
        <Header />
        {this.renderAllDetails()}
      </div>
    );
  }
}

export default ProductItemDetails;
