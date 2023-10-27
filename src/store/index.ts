import resso from 'resso'
import { User } from '@/types/api'
import { create } from 'zustand'
import { userInfo } from 'os'

const store = resso({
  token: '',
  userInfo: {
    userEmail: '',
    userName: '',
  },
  updateUserInfo(userInfo: User.UserItem) {
    store.userInfo = userInfo
  },
})

export const useBearStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  updateUserInfo: (userInfo: User.UserItem) => void
}>(set => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: '',
  },
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
}))

// export const useBearStore = create<{
//   bears: number
//   increasePopulation: () => void
// }>(set => ({
//   bears: 0,
//   increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))

export default store
