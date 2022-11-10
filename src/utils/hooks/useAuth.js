import { useEffect } from "react"
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser"
import shallow from "zustand/shallow"
import useUserStore from "../../states/User"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import paths from "../../routing/routePaths"

const useAuth = () => {
  const [user, isUserLoggedIn, setUser] = useUserStore(
    (state) => [state.user, state.isUserLoggedIn, state.setUser],
    shallow,
  )

  useEffect(() => {
    onRedirectAfterLogin()
  }, [])

  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  let from = searchParams.get("from")

  const onLogin = () => {
    const redirectUrl = new URL(window.location.href)

    // build redirect url
    if (location?.state?.from) {
      redirectUrl.searchParams.append("from", location.state.from)
    }

    login({
      oidcIssuer: "https://login.inrupt.com",
      clientName: "Poddit - Decentral Reddit",
      redirectUrl,
    })
  }

  const onRedirectAfterLogin = async () => {
    // handle oauth callback
    await handleIncomingRedirect()
    const session = getDefaultSession()

    // check for login state
    if (session?.info?.isLoggedIn) {
      // successful Login
      setUser(session)
      if (from) {
        // Redirect User to Page visited before Login
        navigate(from)
      } else {
        navigate(paths.main)
      }
    }
  }

  return { user, isUserLoggedIn, login: onLogin }
}

export default useAuth
