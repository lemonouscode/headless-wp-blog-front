import {Navigate, Outlet} from "react-router-dom"
import { parseJwt } from "../utils/TokenExpiration";
import { TokenContext } from "../context/TokenContext";
import { useContext } from "react";


export const ProtectedRoute = ({RedirectPath, children}) => {
  
    const {token} = useContext(TokenContext)
    const valid = parseJwt(token);
  
    if(!valid){
        return <Navigate to={RedirectPath} replace />
    }

    return children ? children : <Outlet />
}
