import { MutableRefObject } from 'react'
export type IAction = 'create' | 'edit' | 'delete'
import { User } from '@/types/api'

export interface IModalProp<T = User.UserItem> {
  mRef: MutableRefObject<
    | {
        open: (type: IAction, data: T) => void
      }
    | undefined
  >
  update: () => void
}

export interface IDetailProp {
  mRef: MutableRefObject<{ open: (orderId: string) => void } | undefined>
}
