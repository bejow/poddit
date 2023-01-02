import create from "zustand"

const useSubscriptionStore = create((set, get) => ({
  subscriptions: [],
  setSubscriptions: (subscriptions) => set(() => ({ subscriptions })),
  isSubscribedTo: (communityId) => {
    const subscriptions = get().subscriptions
    return subscriptions.indexOf(communityId.toString()) > -1
  },
}))

export default useSubscriptionStore
