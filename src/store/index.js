import create from 'zustand'
import { persist } from 'zustand/middleware'

const createBearSlice = (set, get) => ({
  fishes: 0,
  addAFish: () => set({ fishes: get().fishes + 1 }),
  cutAFish: () => set((prev) => ({ fishes: prev.fishes - 1 })),
})

const createBearSlice1 = (set, get) => ({
  fishes1: 0,
  addAFish1: () => set({ fishes: get().fishes1 + 1 }),
  cutAFish1: () => set((prev) => ({ fishes: prev.fishes1 - 1 })),
})

const createBearSlice2 = (set, get) => ({
  fishes2: 0,
  addAFish2: () => set({ fishes: get().fishes2 + 1 }),
  cutAFish2: () => set((prev) => ({ fishes: prev.fishes2 - 1 })),
})

const createUser = (set, get) => ({
  user: {
    isAuth: false, // 是否验证过
    auth: -1, // 权限  -1:无 0:404等页面 1:详细页面
  },
  setUser: (data) => set({ user: data }),
})

// const createRootSlice = persist(
//   (set, get) => ({
//     ...createUser(set, get),
//     ...createBearSlice(set, get),
//     ...createBearSlice1(set, get),
//     ...createBearSlice2(set, get),
//   }),
//   {
//     name: 'index-storage',
//     getStorage: () => sessionStorage,
//   },
// )

const createRootSlice = (set, get) => ({
  ...createUser(set, get),
  ...createBearSlice(set, get),
  ...createBearSlice1(set, get),
  ...createBearSlice2(set, get),
})

export const useStore = create(createRootSlice)
