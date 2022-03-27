import create from 'zustand'
import { persist } from 'zustand/middleware'

const createBearSlice = (set, get) => ({
  fishes: 0,
  addAFish: () => set({ fishes: get().fishes + 1 }),
  cutAFish: () => set((prev) => ({ fishes: prev.fishes - 1 })),
})

const createRootSlice = persist(
  (set, get) => ({
    ...createBearSlice(set, get),
  }),
  {
    name: 'all-storage',
    getStorage: () => localStorage,
  },
)

export const useStoreAll = create(createRootSlice)
