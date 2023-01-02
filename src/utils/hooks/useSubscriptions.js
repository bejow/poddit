import { useEffect } from "react"
import useSubscriptionStore from "../../states/Subscriptions"
import shallow from "zustand/shallow"
import {
  getSubscribedCommunities,
  subscribeToCommunity,
  unsubscribeFromCommunity,
} from "../rdfHelper"
import useAuth from "./useAuth"

export default function useSubscriptions() {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions, isSubscribedTo] = useSubscriptionStore(
    (state) => [state.subscriptions, state.setSubscriptions, state.isSubscribedTo],
    shallow,
  )

  const fetchSubscriptions = async () => {
    const subscriptions = await getSubscribedCommunities(user)
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
