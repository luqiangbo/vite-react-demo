import create from 'zustand'
import { devtools } from 'zustand/middleware'

const createAuth = (set, get) => ({
  isAuth: false, // 是否验证过
  auth: -1, // 权限  -1:无 0:404等页面 1:详细页面
  name: '',
  setIsAuth: (e) => set({ isAuth: e }),
  setAuth: (e) => set({ auth: e }),
  setKey: (e) => set({ ...e }),
})

const createRootSlice = (set, get) => ({
  ...createAuth(set, get),
})

export const useStore = create(devtools(createRootSlice))
