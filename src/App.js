import { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({ cartList: [] })
  }

  removeCartItem = (id) => {
    const { cartList } = this.state
    const updatedCartList = cartList.filter((eachItem) => eachItem.id !== id)
    this.setState({ cartList: updatedCartList })
  }

  addCartItem = (product) => {
    this.setState((prevState) => {
      const productExists = prevState.cartList.find(
        (item) => item.id === product.id
      )
      if (productExists !== undefined) {
        return {
          cartList: prevState.cartList.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          ),
        }
      }

      return { cartList: [...prevState.cartList, product] }
    })
  }
  //   TODO: Update the code here to implement addCartItem

  incrementCartItemQuantity = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }))
  }

  decrementCartItemQuantity = (id) => {
    this.setState((prevState) => {
      const cartItem = prevState.cartList.find((item) => item.id === id)
      if (cartItem.quantity === 1) {
        return {
          cartList: prevState.cartList.filter((eachItem) => eachItem.id !== id),
        }
      }
      return {
        cartList: prevState.cartList.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      }
    })
  }

  render() {
    const { cartList } = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
