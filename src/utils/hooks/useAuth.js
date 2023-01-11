import { useEffect } from "react"
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser"
import shallow from "zustand/shallow"
import useUserStore from "../../states/User"
import { getPodUrl } from "../rdfHelper"
import useErrorStore from "../../states/Error"
import { INRUPT_APP_NAME, INRUPT_APP_NAME_DEV } from "../../assets/constants/strings"
import { useNavigate, useSearchParams } from "react-router-dom"
import paths from "../../routing/routePaths"

const useAuth = () => {
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
    // check for login state
    if (session?.info?.isLoggedIn) {
      // successful Login
      const pods = await getPodUrl(session, setError)
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
