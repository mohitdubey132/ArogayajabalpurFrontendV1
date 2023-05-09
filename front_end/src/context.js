import React from 'react';
import { createContext, useEffect, useState, useRef  ,useContext} from 'react';
import Cart from './components/Cart'
import {Menu} from './components/Menu';
const ApplicationContext = createContext();
export function useApplicationContext(){
    return useContext(ApplicationContext)
};
export function ContextProvider({children}){
const [user,setUser] = useState({});
const [cartIsOpen,setCartIsOpen] =useState(false);
const [menuIsOpen, setMenuIsOpen] =useState(false);
const [isLogin,setLogin] = useState(false);
useEffect(() => {
    return () => {
      const user1 = localStorage.getItem("user");
      if(user1){
        const parsedUser = JSON.parse(user1)
        setUser(parsedUser);
      }
    };
}, []);
/** handeling login */
const openCart =()=>setCartIsOpen(true);
const closeCart =()=> setCartIsOpen(false);
const openMenu =()=>setMenuIsOpen(true);
const closeMenu =()=> setMenuIsOpen(false);
/**return  */

return (
    <ApplicationContext.Provider value={{openCart,closeCart,openMenu,closeMenu,user,setUser}}
    >
        {children}
        <Cart isOpen ={cartIsOpen}/>
        <Menu isOpen={menuIsOpen}/>
    </ApplicationContext.Provider>
)
};
//export {ContextProvider,}
