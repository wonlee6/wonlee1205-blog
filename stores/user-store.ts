import { createStore } from 'zustand/vanilla'

export type UserState = {
  name: string
  id: string
}

export type UserActions = {
  setUserInfo: (id: string, name: string) => void
}

export type UserStore = UserState & UserActions

export const defaultInitUserState = {
  name: '',
  id: ''
}

export const createUserStore = (initState: UserState = defaultInitUserState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUserInfo: (id: string, name: string) => set(() => ({ id, name }))
  }))
}
