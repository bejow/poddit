import create from "zustand"

const useUserStore = create((set, get) => ({
  user: {},
  setUser: (newUser) => set(() => ({ user: newUser })),
  isUserLoggedIn: () => {
    const user = get().user
    return user?.info?.isLoggedIn ? true : false
  },
}))

export default useUserStore
