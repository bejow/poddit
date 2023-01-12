import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser"
import { getPodUrls } from "../rdfHelper"
import { INRUPT_APP_NAME, INRUPT_APP_NAME_DEV } from "../../assets/constants/strings"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import paths from "../../routing/routePaths"
import shallow from "zustand/shallow"
import useErrorStore from "../../states/Error"
import useUserStore from "../../states/User"

const useAuth = () => {
  // used to log the user in and save session informations in zustand store
  const [user, isUserLoggedIn, setUser] = useUserStore(
    (state) => [state.user, state.isUserLoggedIn, state.setUser],
    shallow,
  )
  const { setError } = useErrorStore()
  const navigate = useNavigate()

  useEffect(() => {
    // catch redirect from inrupt login
    if (!isUserLoggedIn()) {
      onRedirectAfterLogin()
    }
  }, [])

  const [searchParams] = useSearchParams()
  let from = searchParams.get("from")

  const onLogin = async () => {
    if (!getDefaultSession().info.isLoggedIn) {
      const redirectUrl = new URL(window.location.href)

      // build redirect url
      if (location?.state?.from) {
        redirectUrl.searchParams.append("from", location.state.from)
      }

      await login({
        oidcIssuer: "https://login.inrupt.com",
        clientName: process.env.NODE_ENV === "development" ? INRUPT_APP_NAME_DEV : INRUPT_APP_NAME,
        redirectUrl,
      })
    }
  }

  const onLogout = async () => {
    await user.logout()
    window.location.reload()
  }

  const onRedirectAfterLogin = async () => {
    // handle oauth callback
    await handleIncomingRedirect({ restorePreviousSession: true })
    const session = getDefaultSession()
    console.log(session)
    if (session?.info?.isLoggedIn) {
      const pods = await getPodUrls(session, setError)
      setUser({ ...session, pods })
      if (from) {
        // Redirect User to Page visited before Login
        navigate(from)
      } else {
        navigate(paths.main)
      }
    }
  }

  return { user, isUserLoggedIn, login: onLogin, logout: onLogout }
}

export default useAuth
