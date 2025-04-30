"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

import UploadArea from "./uploadArea";
import LibraryArea from "./libraryArea";

import AnimatedLogo from "../components/AnimatedLogo";

import { useLibrary } from "./hooks/useLibrary";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [emptyLibrary, setEmptyLibrary] = useState(true);
  const [displayLoading, setDisplayLoading] = useState(true);

  const { loading, error, books } = useLibrary();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setEmptyLibrary(books.length === 0);
  }, [books]);

  const showLoading = loading || displayLoading;

  return (
    <div
      className="w-full h-[100vh] font-[family-name:var(--font-geist-sans)] grid grid-rows-[5vh_95vh] relative overflow-hidden"
      style={{ background: "var(--color-bg)", color: "var(--color-strong)" }}
    >
      <header className="w-full h-12 p-4 flex justify-between items-center z-10">
        <h1
          className="text-xl font-bold cursor-pointer select-none"
          style={{ fontFamily: "Hachi Maru Pop", translate: "0 -6px" }}
          onClick={() => window.location.reload()}
        >
          学ぶKo
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <User className="w-6 h-6" />
        </div>
      </header>

      <main className="w-full grow flex items-center justify-center row-span-2 z-10">
        {showLoading ? (
          <AnimatedLogo />
        ) : !loading && error ? (
          <></>
        ) : !loading && emptyLibrary ? (
          <UploadArea />
        ) : (
          <LibraryArea />
        )}
      </main>
    </div>
  );
}
