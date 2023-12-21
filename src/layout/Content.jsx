import { Header } from "./Header"
import {Footer} from "./Footer"

export const Content = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer />
    </div>
  )
}
