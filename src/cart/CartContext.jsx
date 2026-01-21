import { createContext, useContext, useState, useMemo } from "react";

//1. store 생성
const CartContext = createContext(null);

//2. Provider 생성
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); //미션 1. 로컬스토리지에서 값을 초기값

  //장바구니에 상품 추가 함수
  const addItem = (item) => {
    setCartItems(prev => {
      const i = prev.findIndex((v)=>v.id === item.id); //일치상품의 index 번호
      if(i === -1) return [...prev,{...item,qty: 1 }] //새상품 추가
      const next = [...prev];
      next[i] = {...next[i], qty:next[i].qty + 1}
      return next;
    })
    //미션 2.로컬스토리지에 cartItems를 저장
  }
  //장바구니의 개수
  const count = useMemo(
    ()=>cartItems.reduce((sum,n)=> sum + n.qty,0), [cartItems]
  ); //장바구니 상품 목록 변경되면, 수량 계산

 
  // const value = useMemo(()=>{return {cartItems, addItem, count}}, [cartItems,count]);
  const value = useMemo(()=>({cartItems, addItem, count}), [cartItems,count]);
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart는 cartProvider 외부에서는 사용 불가')
  return ctx;
}