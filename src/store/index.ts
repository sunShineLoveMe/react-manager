import { User } from '@/types/api'
import { create } from 'zustand'

export const useStore = create<{
  token: string
  userInfo: User.UserItem
  collapsed: boolean
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
  updateCollapsed: () => void
}>(set => ({
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: '',
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
