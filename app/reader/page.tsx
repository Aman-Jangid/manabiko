"use client";
import {
  ChevronDown,
  Highlighter,
  PencilRuler,
  PenTool,
  StickyNote,
  SwatchBook,
  Timer,
  User,
  XIcon,
} from "lucide-react";
import { useResponsive } from "../hooks/useResponsive";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

// pdfjs
// import PdfJsInitializer from "@/components/PdfJsInitializer";
import PDFViewer from "@/components/pdf/PDFViewer";

export default function ReaderPage() {
  const [showToc, setShowToc] = useState(false);
  const [showToolkit, setShowToolkit] = useState(false);

  const { isMobile } = useResponsive();

  const handleToggleToc = () => {
    setShowToc((prev) => !prev);
  };

  const pdfUrl = "/temp/tpp20.pdf";

  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      {/* <PdfJsInitializer /> */}
      <div
        className={`w-full h-[100vh] font-[family-name:var(--font-geist-sans)] grid sm:grid-rows-1 grid-rows-2 relative overflow-hidden transition-all duration-200`}
        style={{
          background: "var(--color-bg)",
          color: "var(--color-strong)",
          ...(isMobile
            ? { gridTemplateRows: `${showToc ? "60vh" : "16vh"} auto` }
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
              <span>
                Table of contents{"  "}
                <span className="ml-1 text-[var(--color-text)] bg-[var(--color-accent)]/40 rounded-full px-1.5 py-0.5 text-[10px] sm:text-[12px] sm:px-2 sm-py-1 font-semibold">
                  pg.{currentPage}
                </span>
              </span>
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
            className={`overflow-hidden mx-2 transition-all duration-300 bg-[var(--color-surface)]/50 p-2 rounded-lg ${
              isMobile
                ? showToc
                  ? "h-[36vh] overflow-y-auto"
                  : "h-0 overflow-hidden -scale-y-0 p-0"
                : "h-[74%]"
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
          {/* Action button for previous and next chapters */}
          <div className="flex content-between place-content-between translate-y-1/2 mx-2">
            <button
              className="w-fit h-8 px-2 max-w-[40%]  text-[10px] sm:text-[12px] font-semibold border-2 border-[var(--color-border)] text-[var(--color-strong)] rounded-lg flex items-center justify-center shadow-md hover:bg-[var(--color-accent)]/50 transition-all duration-300"
              title="Previous chapter"
              onClick={() => {
                // Handle previous chapter
              }}
              aria-label="Previous chapter"
            >
              <span className="text-ellipsis whitespace-nowrap overflow-hidden truncate">
                Ch 2 : ML Basics
              </span>
            </button>

            <button
              className=" w-fit h-8 px-2 max-w-[40%] text-[10px] sm:text-[12px] font-semibold border-2 border-[var(--color-strong)]/80 text-[var(--color-strong)] rounded-lg flex items-center justify-center shadow-md hover:bg-[var(--color-accent)]/50 transition-all duration-300"
              title="Next chapter"
              onClick={() => {
                // Handle next chapter
              }}
              aria-label="Next chapter"
            >
              <span className="text-ellipsis whitespace-nowrap overflow-hidden truncate">
                Ch 4 : Advanced ML
              </span>
            </button>
          </div>
        </nav>

        {/* BOOK READER */}
        <main
          className={`h-full flex flex-row items-center justify-center z-10 bg-[var(--color-bg-secondary)]`}
        >
          {/* Floating Toolkit */}
          {/* PDF Viewer */}
          <PDFViewer
            pdfUrl={pdfUrl}
            onPageChange={(page) => setCurrentPage(page)}
          />
          {/* User edits */}
          <div
            className="w-20 h-20 fixed -bottom-1 -right-1 sm:static z-50 sm:w-[14vw] sm:h-full flex items-center  justify-center"
            style={{
              background: isMobile ? "transparent" : "var(--color-bg)",
            }}
          >
            {isMobile && (
              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg  transition-all duration-300 z-20"
                style={{
                  background: "var(--color-bg)",
                  transform: showToolkit ? "translateY(-200px)" : "none",
                }}
              >
                <div
                  className="absolute w-10 h-10 rounded-full rounded-t-none flex flex-col gap-3 items-center justify-center shadow-lg transition-all duration-300 z-10"
                  style={{
                    background: "var(--color-bg)",
                    transform: showToolkit ? "translateY(50%)" : "none",
                    opacity: showToolkit ? 0.9 : 0,
                    height: showToolkit ? "210px" : "0%",
                  }}
                >
                  {showToolkit && (
                    <>
                      <Timer className="w-6.4 h-6.4 mt-4" strokeWidth={1.4} />
                      <SwatchBook className="w-6.4 h-6.4" strokeWidth={1.4} />
                      <Highlighter className="w-6.4 h-6.4" strokeWidth={1.4} />
                      <StickyNote className="w-6.4 h-6.4" strokeWidth={1.4} />
                      <PenTool className="w-6.4 h-6.4" strokeWidth={1.4} />
                    </>
                  )}
                </div>

                <div className="w-9 h-9 bg-[var(--color-text)]/50 rounded-full flex items-center justify-center shadow-lg  transition-all duration-300 z-20">
                  <button
                    className="w-8 h-8 text-[var(--color-text)]/70 rounded-full flex items-center justify-center  transition-all duration-300 z-20"
                    style={{ background: "var(--color-bg)" }}
                    title="Add note"
                    onClick={() => setShowToolkit((prev) => !prev)}
                    aria-label="Add note"
                  >
                    {showToolkit ? (
                      <XIcon className="w-5 h-5" />
                    ) : (
                      <PencilRuler className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
