import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList } = value
      const total = cartList.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      )

      return (
        <div className="cart-summary">
          <h1 className="order-total">
            Order Total: <span className="total-price">Rs {total}/-</span>
          </h1>
          <p className="total-cart-items">{cartList.length} Items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
