import { User } from '@/types/api'
import { create } from 'zustand'

export const useStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
}>(set => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: '',
  },
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateToken: (token: string) => set({ token }),
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
