import {Route, Routes} from "react-router-dom"
import {Home} from "../pages/Home"
import {Contact} from "../pages/Contact"
import { Login } from "../pages/Login"
import { SinglePost } from "../pages/SinglePost"
import { Category } from "../pages/Category"
import { Dashboard } from "../pages/Dashboard"
import { ProtectedRoute } from "./ProtectedRoute"

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/post/:slug" element={<SinglePost />}/>
        <Route path="/category/:slug" element={<Category/>}/>
        <Route element={<ProtectedRoute RedirectPath="/login"/>} >
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </div>
  )
}
