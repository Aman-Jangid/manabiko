"use client";

import { useEffect, useState } from "react";
import { Moon, User } from "lucide-react";

import UploadArea from "./uploadArea";
import LibraryArea from "./libraryArea";

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

  return (
    <div className="w-full h-[100vh] font-[family-name:var(--font-geist-sans)] grid grid-rows-[5vh_95vh] relative overflow-hidden">
      <header className="w-full h-12 p-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold">学ぶKO</h1>
        <div className="flex items-center gap-4">
          <Moon className="w-6 h-6" />
          <User className="w-6 h-6" />
        </div>
      </header>

      <main className="w-full grow flex items-center justify-center row-span-2 z-10">
        {emptyLibrary ? <UploadArea /> : <LibraryArea />}
      </main>
    </div>
  );
}
