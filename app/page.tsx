"use client";

import { useEffect, useState } from "react";
import { Lightbulb, LightbulbOff, User } from "lucide-react";

import UploadArea from "./uploadArea";
import LibraryArea from "./libraryArea";
import { useRouter } from "next/navigation";
import { useTheme } from "./themeContext";

export default function Home() {
  const [emptyLibrary, setEmptyLibrary] = useState(true);

  useEffect(() => {
    const library = localStorage.getItem("manabikoLibrary");
    if (library) {
      setEmptyLibrary(false);
    } else {
      setEmptyLibrary(true);
    }
  }, []);

  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="w-full h-[100vh] font-[family-name:var(--font-geist-sans)] grid grid-rows-[5vh_95vh] relative overflow-hidden"
      style={{ background: "var(--color-bg)", color: "var(--color-strong)" }}
    >
      <header className="w-full h-12 p-4 flex justify-between items-center z-10">
        <h1
          className="text-2xl font-bold cursor-pointer select-none"
          onClick={() => router.push("/")}
        >
          学ぶKO
        </h1>
        <div className="flex items-center gap-4">
          {theme === "light" ? (
            <Lightbulb
              className="w-6 h-6 cursor-pointer"
              onClick={toggleTheme}
            />
          ) : (
            <LightbulbOff
              className="w-6 h-6 cursor-pointer"
              onClick={toggleTheme}
            />
          )}
          <User className="w-6 h-6" />
        </div>
      </header>

      <main className="w-full grow flex items-center justify-center row-span-2 z-10">
        {emptyLibrary ? <UploadArea /> : <LibraryArea />}
      </main>
    </div>
  );
}
