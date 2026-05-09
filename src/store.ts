// A simple state store for the mock app
import { create } from "zustand";

interface FitInState {
  isAuthenticated: boolean;
  userName: string;
  email: string;
  age: number;
  phone: string;
  gender: string;
  stylePref: string;
  budgetMin: number;
  budgetMax: number;
  bodyProfile: any;
  userImage: string | null;
  setAuth: (isAuthenticated: boolean, userName: string, email?: string) => void;
  setPrefs: (prefs: Partial<FitInState>) => void;
  setBodyProfile: (profile: any) => void;
  setUserImage: (img: string | null) => void;
  logout: () => void;
}

export const useStore = create<FitInState>((set) => ({
  isAuthenticated: false,
  userName: "",
  email: "",
  age: 20,
  phone: "",
  gender: "female",
  stylePref: "Korean Casual",
  budgetMin: 50000,
  budgetMax: 500000,
  bodyProfile: null,
  userImage: null,
  setAuth: (isAuthenticated, userName, email) =>
    set({ isAuthenticated, userName, email: email || "" }),
  setPrefs: (prefs) => set((state) => ({ ...state, ...prefs })),
  setBodyProfile: (profile) => set({ bodyProfile: profile }),
  setUserImage: (img) => set({ userImage: img }),
  logout: () =>
    set({
      isAuthenticated: false,
      userName: "",
      bodyProfile: null,
      userImage: null,
    }),
}));
