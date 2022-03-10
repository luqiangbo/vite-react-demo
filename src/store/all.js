import create from 'zustand'

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

const createRootSlice = (set, get) => ({
  ...createBearSlice(set, get),
  ...createBearSlice1(set, get),
  ...createBearSlice2(set, get),
})

export const useStoreAll = create(createRootSlice)
