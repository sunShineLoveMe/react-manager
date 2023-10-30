import { MutableRefObject } from 'react'
export type IAction = 'create' | 'edit' | 'delete'
import { User } from '@/types/api'

export interface IModalProp {
  mRef: MutableRefObject<
    | {
        open: (type: IAction, data: User.UserItem) => void
      }
    | undefined
  >
  update: () => void
}
