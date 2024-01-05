import { createContext, useReducer, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const res = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if (res) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToAdd) => {
  const res = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  // count reach 0, delete from cart
  if (res && res.quantity === 1) {
    return deleteItem(cartItems, res)
  }
  else if (res) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
      { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const deleteItem = (cartItems, productToDelete) => cartItems.filter((item) => item.id !== productToDelete.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  deleteItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  INCR_ITEM_TO_CART: "INCR_ITEM_TO_CART",
  DECR_ITEM_FROM_CART: "DECR_ITEM_FROM_CART",
  DELETE_ITEM_FROM_CART: "DELETE_ITEM_FROM_CART",
  TOGGLE_IS_CART_OPEN: "TOGGLE_IS_CART_OPEN",
}

const cartReducer = (state, action) => {
  console.log("reducer is dispatched:", action, state)
  const { type, payload } = action;
  console.log(payload)

  let newCartItems = '';
  switch (type) {
    case CART_ACTION_TYPES.INCR_ITEM_TO_CART:
      newCartItems = addCartItem(state.cartItems, payload);
      return { ...state, cartItems: newCartItems, cartCount: state.cartCount + 1, cartTotal: state.cartTotal + payload.price }
    case CART_ACTION_TYPES.DECR_ITEM_FROM_CART:
      newCartItems = removeCartItem(state.cartItems, payload);
      return { ...state, cartItems: newCartItems, cartCount: state.cartCount + 1, cartTotal: state.cartTotal - payload.price }
    case CART_ACTION_TYPES.DELETE_ITEM_FROM_CART:
      newCartItems = deleteItem(state.cartItems, payload);
      return { ...state, cartItems: newCartItems, cartCount: state.cartCount + 1, cartTotal: state.cartTotal - payload.price * payload.quantity }
    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return { ...state, isCartOpen: !state.isCartOpen };
    default:
      throw new Error(`unhandled type ${type} in cartReducer`);
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  const toggleIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, payload: null });
  }

  // const addItemToCart = (productToAdd) => {
  //   const newCartItems = addCartItem(cartItems, productToAdd);
  //   setCartItems(newCartItems)
  // }

  const addItemToCart = (productToAdd) => {
    dispatch({ type: CART_ACTION_TYPES.INCR_ITEM_TO_CART, payload: productToAdd });
  }

  // const removeItemFromCart = (productToRemove) => {
  //   const newCartItems = removeCartItem(cartItems, productToRemove);
  //   setCartItems(newCartItems)
  // }

  const removeItemFromCart = (productToRemove) => {
    dispatch({ type: CART_ACTION_TYPES.DECR_ITEM_FROM_CART, payload: productToRemove });
  }

  // const deleteItemFromCart = (productToDelete) => {
  //   const newCartItems = deleteItem(cartItems, productToDelete);
  //   setCartItems(newCartItems)
  // }

  const deleteItemFromCart = (productToDelete) => {
    dispatch({ type: CART_ACTION_TYPES.DELETE_ITEM_FROM_CART, payload: productToDelete });
  }

  // useEffect(() => {
  //   const newItemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  //   setCartCount(newItemCount);
  // }, [cartItems]); // This effect runs whenever cartItems changes

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
  //   setCartTotal(newCartTotal);
  // }, [cartItems]); // This effect runs whenever cartItems changes
  const value = { isCartOpen, cartItems, cartCount, cartTotal, toggleIsCartOpen, removeItemFromCart, addItemToCart, deleteItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}