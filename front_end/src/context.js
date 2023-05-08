import React from 'react';
import { createContext, useEffect, useState, useRef  ,useContext} from 'react';
import Cart from './components/Cart'
const ApplicationContext = createContext();
export function useApplicationContext(){
    return useContext(ApplicationContext)
};
export function ContextProvider({children}){
const [user,setUser] = useState({});
const [cartIsOpen,setCartIsOpen] =useState(false);
const [menuIsOpen, setMenuIsOpen] =useState(false);

useEffect(() => {
    return () => {
      const user1 = localStorage.getItem("user");
      if(user1){
        const parsedUser = JSON.parse(user1)
        setUser(parsedUser);
        alert(user)
      }
    };
}, [])
const openCart =()=>setCartIsOpen(true);
const closeCart =()=> setCartIsOpen(false);
const openMenu =()=>setCartIsOpen(true);
const closeMenu =()=> setCartIsOpen(false);
/**return  */

return (
    <ApplicationContext.Provider value={{openCart,closeCart,openMenu,closeMenu,user}}
    >
        {children}
        <Cart isOpen ={cartIsOpen}/>
    </ApplicationContext.Provider>
)
};
//export {ContextProvider,}
