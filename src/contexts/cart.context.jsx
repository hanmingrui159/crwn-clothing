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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    setCartItems(newCartItems)
  }

  useEffect(() => {
    const newItemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newItemCount);
  }, [cartItems]); // This effect runs whenever cartItems changes


  // const updateItemCount = () => {
  //   // loop over cartItems and get aggregate sum
  //   let sum = 0;

  //   for (var i = 0; i < cartItems.length; i++) { sum += cartItems[i].quantity }
    
  //   setItemCount(sum);
  // }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}