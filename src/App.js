import { BrowserRouter } from "react-router-dom"
import Routes from "./routing/Routes"
import styles from "./App.module.scss"
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className={styles.wrapper}>
          <Routes />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
