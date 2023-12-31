import { useContext } from 'react';

//test

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const {toggleIsCartOpen, cartCount} = useContext(CartContext);

  // const toggleIsCartOpen = () => {
  //   setIsCartOpen((prev) => !prev);
  // }

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon;