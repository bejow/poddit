import { useEffect } from "react"
import useSubscriptionStore from "../../states/Subscriptions"
import shallow from "zustand/shallow"
import {
  getSubscribedCommunities,
  subscribeToCommunity,
  unsubscribeFromCommunity,
} from "../rdfHelper"
import useAuth from "./useAuth"
import useErrorStore from "../../states/Error"

export default function useSubscriptions() {
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
        // subscriptions not initialized yet
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
