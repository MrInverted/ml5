import { create } from "zustand";



interface IUseStore {
  isLoading: boolean,
  isTrained: boolean,
  model: IML5Classifier | null

  setData: (key: "isLoading" | "isTrained" | "model", value: unknown) => void
}

export const useStore = create<IUseStore>((set) => ({
  isLoading: true,
  isTrained: false,
  model: null,

  setData: (key, value) => set({ [key]: value })
}))