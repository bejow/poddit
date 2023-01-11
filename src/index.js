import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"

Sentry.init({
  dsn: "https://5a9664076e41444bb9185eb13ccd9e69@o382984.ingest.sentry.io/4504486017236992",
  integrations: [new BrowserTracing()],
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.2,
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
