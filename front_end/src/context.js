import React from 'react';
import { createContext, useEffect, useState, useRef, useContext } from 'react';
import Cart from './components/Cart'
import { Menu } from './components/Menu';
import Filter from './components/Filters';
import Cookies from 'js-cookie';
const ApplicationContext = createContext();
export function useApplicationContext() {
  return useContext(ApplicationContext)
};
export function ContextProvider({ children }) {
  Notification.requestPermission().then((result) => {
    console.log(result);
  });
  
  const [user, setUser] = useState({});
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    return () => {
      const user1 = localStorage.getItem("user");
      const token = localStorage.getItem('token');
      if (token) {
        Cookies.set('token', token);
      }
      if (user1) {
        const parsedUser = JSON.parse(user1)
        setUser(parsedUser);
      }
    };
  }, []);
  /** handeling login */
  const openCart = () => setCartIsOpen(true);
  const closeCart = () => setCartIsOpen(false);
  const openMenu = () => setMenuIsOpen(true);
  const closeMenu = () => setMenuIsOpen(false);

  const openFilter = () => setFilterIsOpen(true);
  const closeFilter = () => setFilterIsOpen(false);
  const cartQuantity = cartItems.reduce((quantity ,item)=>item.quantity + quantity , 0);
  /**cart management 
   */
  function getItemsQuantity(id) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }
  function increaseCartQuantity(id) {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }]
      }
      else {
        return currentItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          else {
            return item
          }
        })
      }
    })
  }
  /**decrease item from cart */
  function decreaseCartQuantity(id) {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id)?. quantity === 1) {
        return currentItems.filter(item=> item.id !== id)
      }
      else {
        return currentItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          }
          else {
            return item
          }
        })
      }
    })
  }
  /** remove items */
  function removeItems (id){
    setCartItems(currentItems =>{
      return currentItems.filter(item=> item.id !== id)
    })
  }
  /**return  */

  return (
    <ApplicationContext.Provider value={{ openCart, closeCart, openMenu, closeMenu, user, setUser, openFilter, closeFilter ,
      increaseCartQuantity ,getItemsQuantity,decreaseCartQuantity,removeItems,cartQuantity,
      cartItems
    }}
    >
      {children}
      <Cart isOpen={cartIsOpen} />
      <Menu isOpen={menuIsOpen} />
      <Filter isOpen={filterIsOpen} />
    </ApplicationContext.Provider>
  )
};
//export {ContextProvider,}
