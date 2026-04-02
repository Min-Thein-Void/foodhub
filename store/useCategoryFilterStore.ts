import { create } from "zustand";
import { CategoryStore } from "@/types/category";

export const useCategoryFilterStore = create<CategoryStore>((set) => ({
  category: "all",
  setCategory: (cat) => set({ category: cat }),
}));
