import { createContext, useContext, useState, useMemo, useEffect } from "react";

const STORAGE_KEY = 'cartItems';

//1. store 생성
const CartContext = createContext(null);

//2. Provider 생성, 로컬스토리지에서 기존 장바구니 정보 조회 초기값 할당
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(()=>{
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved? JSON.parse(saved) : [];
  }); 

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

  //상품 개수 증가
  const incQty = (id)=>{
    setCartItems(prev=>
      prev.map(p=> p.id === id ? {...p, qty:p.qty + 1}:p)
    )
  }
  //상품 개수 차감
  const decQty = (id)=>{
    setCartItems(prev=>
      prev.map(p=> p.id === id ? {...p, qty:p.qty - 1}:p).filter(p=>p.qty>0)
    )
  }
  //개별 상품 삭제
  const removeItem = (id)=>{
    setCartItems(prev=>
      prev.filter(p=>p.id !== id)
    )
  }
  //전체 삭제
  const clearCart = ()=>{
    setCartItems([]);
  }
  //총합계 
  const totalPrice = useMemo(()=>{
    return cartItems.reduce((acc, item)=>{
      const price = Number(item.price ?? 0);
      return acc + item.qty*price;
    }, 0)
  }, [cartItems]);


  //장바구니 항목 변경시 로컬스토리지에 저장
  useEffect(()=>{
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  },[cartItems]);
 
  // const value = useMemo(()=>{return {cartItems, addItem, count}}, [cartItems,count]);
  const value = useMemo(()=>({cartItems, addItem, count, incQty, decQty, removeItem, clearCart, totalPrice}), [cartItems,count,totalPrice]);
  
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