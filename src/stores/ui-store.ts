import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UIState {
  isDrawerOpen: boolean;
  isDialogOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  setDialogOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isDrawerOpen: false,
      isDialogOpen: false,
      setDrawerOpen: (open) => set({ isDrawerOpen: open }),
      setDialogOpen: (open) => set({ isDialogOpen: open }),
    }),
    { name: "ui-store" },
  ),
);
