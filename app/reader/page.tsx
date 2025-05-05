"use client";
import {
  ChevronDown,
  Highlighter,
  PencilRuler,
  PenTool,
  PlusSquare,
  StickyNote,
  SwatchBook,
  Timer,
  User,
  XIcon,
} from "lucide-react";
import { useResponsive } from "../hooks/useResponsive";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";

// pdfjs
// import PdfJsInitializer from "@/components/PdfJsInitializer";

enum Tool {
  HIGHLIGHTER = "HIGHLIGHTER",
  STICKY_NOTE = "STICKY_NOTE",
  PEN_TOOL = "PEN_TOOL",
  TIMER = "TIMER",
  SWATCH_BOOK = "SWATCH_BOOK",
}

export default function ReaderPage() {
  const [showToc, setShowToc] = useState(false);
  const [showToolkit, setShowToolkit] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(
    Tool.HIGHLIGHTER
  );
  const [showNote, setShownote] = useState(1);
  const [showNotes, setShowNotes] = useState(false);

  const { isMobile } = useResponsive();
  const router = useRouter();

  const handleToggleToc = () => {
    setShowToc((prev) => !prev);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSetToolMobile = (tool: Tool) => {
    // if (selectedTool === tool) {
    //   setShowToolkit((prev) => !prev);
    //   return;
    // }
    setSelectedTool(tool);
  };

  const getY = () => {
    switch (selectedTool) {
      case Tool.TIMER:
        return -12;
      case Tool.SWATCH_BOOK:
        return 24;
      case Tool.HIGHLIGHTER:
        return 60;
      case Tool.PEN_TOOL:
        return 94;
      default:
        return Infinity;
    }
  };

  const transformValue = `
  ${showToolkit ? "translateY(50%)" : ""}
  translate(-70px, ${getY()}px)
  rotate(90deg)
`;

  const handleSetTool = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleShowNote = (note: number) => {
    if (showNote === note) {
      setShownote(-1);
      return;
    }
    setShownote(note);
  };

  return (
    <>
      {/* Prompt: confirm user action */}

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
          } sm:h-full min-w-[18vw] p-2 flex flex-col justify-start z-200 bg-[var(--color-bg)] transition-all duration-300 overflow-hidden`}
        >
          <header className="h-10 p-2 flex justify-between items-center z-10 rounded-xl">
            <h1
              className="text-xl font-bold cursor-pointer select-none"
              style={{ fontFamily: "Hachi Maru Pop", translate: "0 -4px" }}
              onClick={() => router.push("/")}
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
              <span
                style={
                  showNotes
                    ? {
                        color: "var(--color-text-secondary)",
                      }
                    : { color: "var(--color-accent)", opacity: 0.8 }
                }
                onClick={() => setShowNotes((prev) => !prev)}
              >
                Table of contents{"  "}
                <span className="ml-1 text-[var(--color-text)] bg-[var(--color-accent)]/40 rounded-full px-1.5 py-0.5 text-[10px] sm:text-[12px] sm:px-2 sm-py-1 font-semibold">
                  pg.{currentPage}
                </span>
              </span>

              {isMobile && (
                <>
                  |
                  <span
                    style={
                      showNotes
                        ? { color: "var(--color-accent)", opacity: 0.8 }
                        : { color: "var(--color-text-secondary" }
                    }
                    onClick={() => setShowNotes((prev) => !prev)}
                  >
                    Notes
                  </span>
                </>
              )}
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
          {!showNotes ? (
            <>
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
            </>
          ) : (
            <div>
              {/* Notes */}
              <div className="h-[42vh] w-full sm:w-[100%] flex flex-col self-center justify-start items-center bg-[var(--color-bg)]/50 rounded-lg overflow-hidden">
                <div className="w-full h-10 p-2 mt-4 flex justify-between items-center z-10 rounded-xl">
                  <h2 className="font-semibold">Your Notes</h2>
                  <button
                    className=""
                    title="Add note"
                    // onClick={() => setShowNote(-1)}
                    aria-label="Add note"
                  >
                    <PlusSquare
                      className="w-4 h-4 md:w-5 md:h-5  hover:scale-120 transition-all duration-100"
                      strokeWidth={1.4}
                    />
                  </button>
                </div>
                {/* Scrollable notes list */}
                <div className="h-full max-h-[90%] p-2 w-full flex flex-col gap-2 rounded-lg overflow-y-auto justify-start items-center bg-[var(--color-surface)]/50">
                  {[...Array(11)].map((_, i) => {
                    const isOpen = showNote === i;

                    return (
                      <div
                        key={i}
                        className={`w-full flex flex-col items-start justify-start rounded-lg transition-all duration-300 py-1
            ${
              isOpen
                ? "bg-[var(--color-surface-secondary)] hover:bg-[var(--color-surface)] shadow-lg"
                : "bg-[var(--color-surface-secondary)]/50 hover:bg-[var(--color-surface)]/70"
            }`}
                        onClick={() => handleShowNote(i)}
                      >
                        {/* Header */}
                        <div className="w-full flex items-center justify-between px-2 py-2 cursor-pointer">
                          <h3
                            className="whitespace-nowrap overflow-hidden text-ellipsis text-sm font-semibold text-start"
                            style={{ color: "var(--color-text)" }}
                          >
                            afaf {i + 1}
                          </h3>
                          <button
                            className="flex-shrink-0 ml-2 w-5 h-5 text-[var(--color-text)]/70 rounded-xl flex items-center justify-center transition-all border-2 border-[var(--color-border)] duration-100 z-20 hover:bg-[var(--color-accent-secondary)]/60 hover:text-[var(--color-text)]"
                            title="Delete note"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Expandable Content */}
                        <div
                          className={`w-full px-2 transition-all duration-300 ease-in-out overflow-hidden`}
                          style={{
                            maxHeight: isOpen ? "1000px" : "0px",
                            opacity: isOpen ? 1 : 0,
                          }}
                        >
                          {isOpen && (
                            <p className="text-sm text-[var(--color-text-secondary)] font-normal text-start py-2">
                              This is the detailed content of Note {i + 1}. You
                              can add more information here. Lorem ipsum dolor
                              sit amet, consectetur adipisicing elit. Est,
                              voluptas! Lorem ipsum dolor sit amet consectetur
                              adipisicing elit. Eveniet rerum fugiat totam sit.
                              Impedit, aperiam nobis voluptatibus delectus atque
                              magnam!
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </nav>
        {/* BOOK READER */}
        <main
          className={`h-full w-full flex flex-row items-center justify-center z-10 bg-[var(--color-bg-secondary)]`}
        >
          {/* Floating Toolkit */}
          {/* PDF Viewer */}
          <div className="h-full w-full">
            <iframe
              className="w-[100%] h-[100%]"
              src="/temp/p1/Part_1:_Improving_over_basic_data_structures.html"
              title="Book Reader"
              style={{ border: "none", background: "var(--color-bg)" }}
              allowFullScreen
              // srcDoc=""
            />
          </div>
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
                  className="absolute w-10 h-10 rounded-full rounded-t-none flex flex-col gap-3 items-center justify-center shadow-lg transition-all duration-300 z-10 "
                  style={{
                    background: "var(--color-bg)",
                    transform: showToolkit ? "translateY(50%)" : "none",
                    opacity: showToolkit ? 0.9 : 0,
                    height: showToolkit ? "210px" : "0%",
                  }}
                >
                  {showToolkit && (
                    <>
                      <StickyNote
                        className="w-6.4 h-6.4 mt-4"
                        strokeWidth={1.4}
                        stroke={
                          selectedTool === Tool.STICKY_NOTE
                            ? "var(--color-accent-quaternary)"
                            : "var(--color-text-secondary"
                        }
                        onClick={() => handleSetToolMobile(Tool.STICKY_NOTE)}
                      />
                      <Timer
                        className="w-6.4 h-6.4"
                        strokeWidth={1.4}
                        stroke={
                          selectedTool === Tool.TIMER
                            ? "var(--color-accent-quaternary)"
                            : "var(--color-text-secondary"
                        }
                        onClick={() => handleSetToolMobile(Tool.TIMER)}
                      />
                      <SwatchBook
                        className="w-6.4 h-6.4"
                        strokeWidth={1.4}
                        stroke={
                          selectedTool === Tool.SWATCH_BOOK
                            ? "var(--color-accent-quaternary)"
                            : "var(--color-text-secondary"
                        }
                        onClick={() => handleSetToolMobile(Tool.SWATCH_BOOK)}
                      />
                      <Highlighter
                        className="w-6.4 h-6.4"
                        strokeWidth={1.4}
                        stroke={
                          selectedTool === Tool.HIGHLIGHTER
                            ? "var(--color-accent-quaternary)"
                            : "var(--color-text-secondary"
                        }
                        onClick={() => handleSetToolMobile(Tool.HIGHLIGHTER)}
                      />

                      <PenTool
                        className="w-6.4 h-6.4"
                        strokeWidth={1.4}
                        stroke={
                          selectedTool === Tool.PEN_TOOL
                            ? "var(--color-accent-quaternary)"
                            : "var(--color-text-secondary"
                        }
                        onClick={() => handleSetToolMobile(Tool.PEN_TOOL)}
                      />
                    </>
                  )}
                </div>
                <div
                  className={`absolute w-10 h-10 rounded-b-full ${
                    selectedTool === Tool.PEN_TOOL
                      ? "rounded-tr-full"
                      : "rounded-t-none"
                  } flex flex-col gap-3 items-center justify-center shadow-lg transition-all duration-300 z-8 overflow-hidden`}
                  style={{
                    background: "var(--color-bg)",
                    transform: transformValue.trim(),
                    opacity: showToolkit ? 0.9 : 0,
                    height: showToolkit
                      ? selectedTool === Tool.STICKY_NOTE
                        ? "0px"
                        : "180px"
                      : "0px",
                  }}
                ></div>
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
            {!isMobile && (
              <div className="h-full flex flex-col p-2 overflow-hidden ">
                {/* TOOLBOX */}
                <div
                  className={`w-[94%] h-${
                    selectedTool === Tool.STICKY_NOTE ? "fit" : "[28vh]"
                  }  self-center justify-center bg-[var(--color-bg)]/50 rounded-lg overflow-hidden mt-2`}
                >
                  <div className=" w-full flex flex-cols gap-2.5 transition-all duration-200 z-20">
                    <button
                      className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-text)]/70 rounded-xl flex items-center justify-center transition-all border-0 border-[var(--color-border)] duration-100 z-20"
                      style={
                        selectedTool === Tool.STICKY_NOTE
                          ? {
                              background: "var(--color-surface-secondary)",
                              marginBottom: "10px",
                            }
                          : {}
                      }
                      title="Sticky Note"
                      onClick={() => handleSetTool(Tool.STICKY_NOTE)}
                      aria-label="Sticky Note"
                    >
                      <StickyNote
                        className="w-5 h-5 md:w-6 md:h-6  hover:scale-120 transition-all duration-100"
                        strokeWidth={1.4}
                      />
                    </button>
                    <button
                      className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-text)]/70 rounded-xl rounded-b-none flex items-center justify-center transition-all border-0 border-[var(--color-border)] duration-100 z-20"
                      style={
                        selectedTool === Tool.PEN_TOOL
                          ? {
                              background: "var(--color-surface-secondary)",
                            }
                          : {}
                      }
                      title="Pen Tool"
                      onClick={() => handleSetTool(Tool.PEN_TOOL)}
                      aria-label="Pen Tool"
                    >
                      <PenTool
                        className="w-5 h-5 md:w-6 md:h-6  hover:scale-120 transition-all duration-100"
                        strokeWidth={1.4}
                      />
                    </button>
                    <button
                      className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-text)]/70 rounded-xl rounded-b-none flex items-center justify-center transition-all border-0 border-[var(--color-border)] duration-100 z-20"
                      style={
                        selectedTool === Tool.TIMER
                          ? {
                              background: "var(--color-surface-secondary)",
                            }
                          : {}
                      }
                      title="Timer"
                      onClick={() => handleSetTool(Tool.TIMER)}
                      aria-label="Timer"
                    >
                      <Timer
                        className="w-5 h-5 md:w-6 md:h-6  hover:scale-120 transition-all duration-100"
                        strokeWidth={1.4}
                      />
                    </button>
                    <button
                      className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-text)]/70 rounded-xl rounded-b-none flex items-center justify-center transition-all border-0 border-[var(--color-border)] duration-100 z-20"
                      style={
                        selectedTool === Tool.SWATCH_BOOK
                          ? {
                              background: "var(--color-surface-secondary)",
                            }
                          : {}
                      }
                      title="Swatch Book"
                      onClick={() => handleSetTool(Tool.SWATCH_BOOK)}
                      aria-label="Swatch Book"
                    >
                      <SwatchBook
                        className="w-5 h-5 md:w-6 md:h-6  hover:scale-120 transition-all duration-100"
                        strokeWidth={1.4}
                      />
                    </button>
                    <button
                      className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-text)]/70 rounded-xl rounded-b-none flex items-center justify-center transition-all border-0 border-b-0 border-[var(--color-border)] duration-100 z-20"
                      style={
                        selectedTool === Tool.HIGHLIGHTER
                          ? {
                              background: "var(--color-surface-secondary)",
                            }
                          : {}
                      }
                      title="Highlighter"
                      onClick={() => handleSetTool(Tool.HIGHLIGHTER)}
                      aria-label="Highlighter"
                    >
                      <Highlighter
                        className="w-5 h-5 md:w-6 md:h-6  hover:scale-120 transition-all duration-100"
                        strokeWidth={1.4}
                      />
                    </button>
                  </div>
                  <div
                    className="w-full h-[20vh] bg-[var(--color-surface-secondary)] rounded-tr-none rounded-xl"
                    style={
                      selectedTool === Tool.HIGHLIGHTER
                        ? { borderTopRightRadius: 0 }
                        : {
                            borderTopRightRadius: "12px",
                            height:
                              selectedTool === Tool.STICKY_NOTE
                                ? "0vh"
                                : "20vh",
                          }
                    }
                  ></div>
                </div>
                {/* Notes */}
                <div className="h-full w-full sm:w-[100%] flex flex-col self-center justify-start items-center bg-[var(--color-bg)]/50 rounded-lg overflow-hidden">
                  <div className="w-full h-10 p-2 mt-4 flex justify-between items-center z-10 rounded-xl">
                    <h2 className="font-semibold">Your Notes</h2>
                    <button
                      className=""
                      title="Add note"
                      // onClick={() => setShowNote(-1)}
                      aria-label="Add note"
                    >
                      <PlusSquare
                        className="w-4 h-4 md:w-5 md:h-5  hover:scale-120 transition-all duration-100"
                        strokeWidth={1.4}
                      />
                    </button>
                  </div>
                  {/* Scrollable notes list */}
                  <div className="h-full max-h-[90%] p-2 w-full flex flex-col gap-2 rounded-lg overflow-y-auto justify-start items-center bg-[var(--color-surface)]/50">
                    {[...Array(11)].map((_, i) => {
                      const isOpen = showNote === i;

                      return (
                        <div
                          key={i}
                          className={`w-full flex flex-col items-start justify-start rounded-lg transition-all duration-300 py-1
            ${
              isOpen
                ? "bg-[var(--color-surface-secondary)] hover:bg-[var(--color-surface)] shadow-lg"
                : "bg-[var(--color-surface-secondary)]/50 hover:bg-[var(--color-surface)]/70"
            }`}
                          onClick={() => handleShowNote(i)}
                        >
                          {/* Header */}
                          <div className="w-full flex items-center justify-between px-2 py-2 cursor-pointer">
                            <h3
                              className="whitespace-nowrap overflow-hidden text-ellipsis text-sm font-semibold text-start"
                              style={{ color: "var(--color-text)" }}
                            >
                              afaf {i + 1}
                            </h3>
                            <button
                              className="flex-shrink-0 ml-2 w-5 h-5 text-[var(--color-text)]/70 rounded-xl flex items-center justify-center transition-all border-2 border-[var(--color-border)] duration-100 z-20 hover:bg-[var(--color-accent-secondary)]/60 hover:text-[var(--color-text)]"
                              title="Delete note"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <XIcon className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Expandable Content */}
                          <div
                            className={`w-full px-2 transition-all duration-300 ease-in-out overflow-hidden`}
                            style={{
                              maxHeight: isOpen ? "1000px" : "0px",
                              opacity: isOpen ? 1 : 0,
                            }}
                          >
                            {isOpen && (
                              <p className="text-sm text-[var(--color-text-secondary)] font-normal text-start py-2">
                                This is the detailed content of Note {i + 1}.
                                You can add more information here. Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit.
                                Est, voluptas! Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Eveniet rerum
                                fugiat totam sit. Impedit, aperiam nobis
                                voluptatibus delectus atque magnam!
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
