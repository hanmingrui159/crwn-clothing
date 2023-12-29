import { createContext, useState, useEffect } from 'react';

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    setCartItems(newCartItems)
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    setCartItems(newCartItems)
  }

  const deleteItemFromCart = (productToDelete) => {
    const newCartItems = deleteItem(cartItems, productToDelete);
    setCartItems(newCartItems)
  }

  useEffect(() => {
    const newItemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newItemCount);
  }, [cartItems]); // This effect runs whenever cartItems changes

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]); // This effect runs whenever cartItems changes


  const value = { isCartOpen, setIsCartOpen, cartItems, cartCount, cartTotal, removeItemFromCart, addItemToCart, deleteItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}