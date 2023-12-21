import { Content } from "./layout/Content"
import {Router} from "./router/Router"
import ScrollToTop from "./utils/ScrollToTop"

function App() {
  

  return (
    <div>
      <Content>
        <ScrollToTop />
        <Router />
      </Content>
    </div>
  )
}

export default App
