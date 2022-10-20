import React, { useEffect, useState } from "react"
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser"

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("Not logged in")

  useEffect(() => {
    onRedirectAfterLogin()
  }, [])

  const onLogin = () => {
    login({
      oidcIssuer: "https://login.inrupt.com",
      clientName: "Poddit - Decentral Reddit",
      redirectUrl: window.location.href,
    })
  }

  const onRedirectAfterLogin = async () => {
    await handleIncomingRedirect()
    const session = getDefaultSession()

    if (session.info.isLoggedIn) {
      setIsLoggedIn("Logged in")
      console.log(session)
    } else setIsLoggedIn("Login failed")
  }

  return (
    <div>
      <p>Login</p>
      <p>Status: {isLoggedIn}</p>
      <button onClick={onLogin}>Login with Inrupt</button>
    </div>
  )
}

export default Login
