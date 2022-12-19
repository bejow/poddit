import create from "zustand"

const useErrorStore = create((set, get) => ({
  error: {},
  setError: (error) => set(() => ({ error })),
  hasError: () => {
    const error = get().error
    return Object.keys(error).length > 0
  },
}))

export default useErrorStore
