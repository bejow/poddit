/* eslint-disable */
import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { render } from "react-dom" // add this

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
