// import styles from './Cart.module.css';
import { useCart } from '../cart/CartContext';

export default function Cart() {
  const { cartItems, incQty, decQty, removeItem, clearCart, totalPrice } = useCart();
  console.log(cartItems);
  return (
    <div className="container">
      <h2>Cart Page</h2>
      {
        cartItems.length === 0 ?
          <p>장바구니에 상품이 없습니다.</p>
          :
          <div className="cartlistWrapper">
            <ul className="cartlist">
              {cartItems.map(item => 
                <li>
                  <img src={item.thumbnail} alt="" />
                  <div>
                    {item.title}
                    {item.price}
                  </div>
                  <div>
                    {item.qty}
                  </div>
                  <div>
                    <button>+</button>
                    <button>-</button>
                  </div>
                  <button>삭제</button>
                </li>
              )}
            </ul>
            <div className="cart_info">
              <h3>합계</h3>
              <h4>{totalPrice}</h4>
              <button>주문하기</button>
            </div>
          </div>

      }
    </div>
  )
}