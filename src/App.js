import { BrowserRouter } from "react-router-dom"
import Routes from "./routing/Routes"
import styles from "./App.module.scss"

function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Routes />
      </div>
    </BrowserRouter>
  )
}

export default App
