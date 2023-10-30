import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Login from "@/components/Login";
import { Poppins } from "next/font/google";
import { signInWithGoogle } from "@/firebase/firebase";
import { useState } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

import { create } from "zustand";

export const useFilterStore = create((set) => ({
  filter: {
    sort: "",
    major: "",
    semester: [],
    condition: 0,
  },
  setSemester: (newSemester) => {
    set((state) => ({
      filter: {
        ...state.filter,
        semester: [...state.filter.semester, newSemester],
      },
    }));
  },
  removeSemester: (semesterToRemove) => {
    set((state) => ({
      filter: {
        ...state.filter,
        semester: state.filter.semester.filter(
          (semester) => semester !== semesterToRemove
        ),
      },
    }));
  },
}));

export default function App({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const handleLogin = () => {
    signInWithGoogle();
  };

  if (loading)
    return (
      <div className="w-screen h-[100svh] flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-40 h-40 animate-pulse text-medium-green"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
        <h1 className="font-bold text-4xl text-medium-green animate-pulse">
          BookBazr
        </h1>
      </div>
    );
  else if (user !== null) {
    return (
      <div className={poppins.className}>
        <Component {...pageProps} />
        <NavBar />
      </div>
    );
  } else if (user === null) {
    return (
      <div className={poppins.className}>
        <Login loginFunction={handleLogin} />
      </div>
    );
  }
}
