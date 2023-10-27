import { User } from '@/types/api'
import { create } from 'zustand'

export const useStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  collapsed: boolean
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
  updateCollapsed: () => void
}>(set => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: '',
  },
  collapsed: false,
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateToken: (token: string) => set({ token }),
  updateCollapsed: () =>
    set(state => {
      return {
        collapsed: !state.collapsed,
      }
    }),
}))

// export const useBearStore = create<{
//   bears: number
//   increasePopulation: () => void
// }>(set => ({
//   bears: 0,
//   increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))

// export default store
