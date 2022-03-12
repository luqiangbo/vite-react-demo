import create from 'zustand'
import { persist } from 'zustand/middleware'

const createBearSlice = (set, get) => ({
  fishes: 0,
  addAFish: () => set({ fishes: get().fishes + 1 }),
  cutAFish: () => set((prev) => ({ fishes: prev.fishes - 1 })),
})

const createBearSlice2 = (set, get) => ({
  fishes2: 0,
  addAFish2: () => set({ fishes: get().fishes2 + 1 }),
  cutAFish2: () => set((prev) => ({ fishes: prev.fishes2 - 1 })),
})

const createRootSlice = persist(
  (set, get) => ({
    ...createBearSlice(set, get),
    ...createBearSlice2(set, get),
  }),
  {
    name: 'all-storage',
    getStorage: () => localStorage,
  },
)

export const useStoreAll = create(createRootSlice)
