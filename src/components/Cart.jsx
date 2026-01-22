// import styles from './Cart.module.css';
import { useCart } from '../cart/CartContext';

export default function Cart() {
  const {cartItems} = useCart();
  console.log(cartItems);
  return (
   <div className="container">
    <h2>Cart Page</h2>
    {
      cartItems.length === 0 ? 
      <p>장바구니에 상품이 없습니다.</p>
      : 
      <ul className="cartlist">
        {cartItems.map(item=><li>{item.title}</li>)}
      </ul>
    }
   </div>
  )
}