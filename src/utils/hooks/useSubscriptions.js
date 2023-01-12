import {
  getSubscribedCommunities,
  subscribeToCommunity,
  unsubscribeFromCommunity,
} from "../rdfHelper"
import { useEffect } from "react"
import shallow from "zustand/shallow"
import useAuth from "./useAuth"
import useErrorStore from "../../states/Error"
import useSubscriptionStore from "../../states/Subscriptions"

export default function useSubscriptions() {
  // Used to uniformly interact with users community subscriptions
  const { user } = useAuth()
  const { setError } = useErrorStore()
  const [subscriptions, setSubscriptions, isSubscribedTo] = useSubscriptionStore(
    (state) => [state.subscriptions, state.setSubscriptions, state.isSubscribedTo],
    shallow,
  )

  const fetchSubscriptions = async () => {
    let subscriptions = []
    try {
      subscriptions = await getSubscribedCommunities(user)
    } catch (error) {
      if (error.message.includes("Not Found")) {
        // subscriptions may not be initialized in the solid pod yet
        // todo: add explicit subscription initialization here
      } else {
        setError({ message: error.message })
      }
    }
    setSubscriptions(subscriptions)
  }

  const subscribeTo = async (communityId) => {
    await subscribeToCommunity(user, communityId)
  }

  const unsubscribeFrom = async (communityId) => {
    await unsubscribeFromCommunity(user, communityId)
  }

  useEffect(() => {
    fetchSubscriptions()
    return () => {}
  }, [user])

  return { fetchSubscriptions, subscribeTo, unsubscribeFrom, subscriptions, isSubscribedTo }
}
