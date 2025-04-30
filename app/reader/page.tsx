"use client";
import { ChevronDown, User } from "lucide-react";
import { useResponsive } from "../hooks/useResponsive";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function ReaderPage() {
  const [showToc, setShowToc] = useState(false);

  const { isMobile } = useResponsive();

  const handleToggleToc = () => {
    setShowToc((prev) => !prev);
  };

  return (
    <div
      className={`w-full h-[100vh] font-[family-name:var(--font-geist-sans)] grid sm:grid-rows-1 grid-rows-2 relative overflow-hidden transition-all duration-200`}
      style={{
        // Background color and text color
        background: "var(--color-bg)",
        color: "var(--color-strong)",
        ...(isMobile
          ? { gridTemplateRows: `${showToc ? "50vh" : "17vh"} auto` }
          : { gridTemplateColumns: "24vw 1fr" }),
      }}
    >
      <nav
        className={`${
          isMobile ? (showToc ? "h-[85vh]" : "h-[20vh]") : "h-full"
        } sm:h-full min-w-[18vw] p-2 flex flex-col justify-start z-10 bg-[var(--color-bg)] transition-all duration-300 overflow-hidden`}
      >
        <header className="h-10 p-2 flex justify-between items-center z-10 rounded-xl">
          <h1
            className="text-xl font-bold cursor-pointer select-none"
            style={{ fontFamily: "Hachi Maru Pop", translate: "0 -4px" }}
          >
            学ぶKo
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button title="profile">
              <User className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Book Title */}
        <div
          className="flex flex-col items-center gap-2 mt-4"
          title={"Book Title"}
        >
          <h1
            className="text-lg sm:text-2xl w-[94%] font-semibold text-start self-start mb-0 sm:mb-1 ml-2 truncate text-ellipsis"
            style={{ color: "var(--color-strong)" }}
            aria-label="Book title"
          >
            Fundamentals of Machine Learning
          </h1>
        </div>

        {/* TOC Heading */}
        <div>
          <h2
            className="flex flex-row w-[92%] justify-between text-sm font-regular text-start self-start m-4 mt-2"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Table of contents"
          >
            <span>Table of contents</span>
            {isMobile && (
              <button
                className="flex items-center"
                onClick={handleToggleToc}
                aria-label="Toggle table of contents"
                title="Toggle table of contents"
              >
                <ChevronDown
                  className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                    showToc ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            )}
          </h2>
        </div>

        {/* TOC List */}
        <div
          className={`overflow-hidden transition-all duration-300 bg-[var(--color-bg-secondary)] p-2 rounded-lg ${
            isMobile
              ? showToc
                ? "h-[32vh] overflow-y-auto"
                : "h-0 overflow-hidden -scale-y-0 p-0"
              : "h-full"
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0">
              <button
                className="text-sm font-semibold text-start self-start m-1"
                style={{ color: "var(--color-text)" }}
                aria-label="Chapter 1"
              >
                Chapter 1
              </button>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  className="text-sm font-normal text-start self-start m-1"
                  style={{ color: "var(--color-text-secondary)" }}
                  aria-label="Topic 1.1"
                >
                  Topic 1.1
                </button>
                <button
                  className="text-sm font-normal text-start self-start m-1"
                  style={{ color: "var(--color-text-secondary)" }}
                  aria-label="Topic 1.2"
                >
                  Topic 1.2
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* BOOK READER */}
      <main
        className={`h-full flex items-center justify-center z-10 bg-[var(--color-bg-secondary)] ${0}`}
        //   isMobile ? (showToc ? "h-[15vh]" : "h-[80vh]") : "h-full"
      >
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-2xl font-bold">Reader Page</h1>
        </div>
      </main>
    </div>
  );
}
