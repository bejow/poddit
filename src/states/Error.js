import create from "zustand"

// Store information about the current error state
// consumed in ErrorBoundary
const useErrorStore = create((set, get) => ({
  error: {},
  setError: (error) => set(() => ({ error })),
  hasError: () => {
    const error = get().error
    return Object.keys(error).length > 0
  },
}))

export default useErrorStore
