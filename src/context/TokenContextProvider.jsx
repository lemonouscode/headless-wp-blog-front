import React, { useEffect, useState } from 'react'
import { TokenContext } from './TokenContext'
import { parseJwt } from '../utils/TokenExpiration';

export const TokenContextProvider = ({children}) => {
    
  const [token, setToken] = useState(()=>{
    const valid = parseJwt(localStorage.getItem("jwt_token"))
    if(valid){
      return localStorage.getItem("jwt_token")
    }
  });

  return (
   <TokenContext.Provider value={{ token,setToken }}>
        {children}
   </TokenContext.Provider>     
  )
}
