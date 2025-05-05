"use client";
import { ChevronDown, User } from "lucide-react";
import { useResponsive } from "../hooks/useResponsive";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import TOCTree from "@/components/TableOfContents";
import NotesContainerMobile from "@/components/NotesContainerMobile";
import NotesContainer from "@/components/NotesContainer";
import UserEditsMobile from "@/components/UserEditsMobile";
import UserEdits from "@/components/UserEdits";

const toc = [
  {
    title: "Chapter 1 Introduction to Algorithms",
    page: 20,
    kids: [
      {
        title: "Introduction",
        page: 20,
        kids: [
          {
            title: "What youll learn about performance",
            page: 20,
          },
          {
            title: "What youll learn about solving problems",
            page: 21,
          },
        ],
      },
      {
        title: "Binary search",
        page: 22,
        kids: [
          {
            title: "A better way to search",
            page: 24,
          },
          {
            title: "Running time",
            page: 29,
          },
        ],
      },
      {
        title: "Big O notation",
        page: 29,
        kids: [
          {
            title: "Algorithm running times grow at different rates",
            page: 30,
          },
          {
            title: "Visualizing different Big O run times",
            page: 32,
          },
          {
            title: "Big O establishes a worst-case run time",
            page: 34,
          },
          {
            title: "Some common Big O run times",
            page: 34,
          },
          {
            title: "The traveling salesperson",
            page: 36,
          },
        ],
      },
      {
        title: "Recap",
        page: 38,
      },
    ],
  },
];

const notes = [
  {
    title: "Note 1",
    content: "This is the content of note 1.",
  },
  {
    title: "Note 2",
    content: "This is the content of note 2.",
  },
];

export enum Tool {
  HIGHLIGHTER = "HIGHLIGHTER",
  STICKY_NOTE = "STICKY_NOTE",
  PEN_TOOL = "PEN_TOOL",
  TIMER = "TIMER",
  SWATCH_BOOK = "SWATCH_BOOK",
}

export default function ReaderPage() {
  const [showToc, setShowToc] = useState(false);
  const [showToolkit, setShowToolkit] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool>(Tool.HIGHLIGHTER);
  const [activePage, setActivePage] = useState(0);
  const [showNote, setShownote] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { isMobile } = useResponsive();
  const router = useRouter();

  const handleToggleToc = () => {
    setShowToc((prev) => !prev);
  };

  // const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (
    page: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setActivePage(page);
  };

  const handleSetToolMobile = (tool: Tool) => {
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

  return !hasMounted ? null : (
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
            title="Manabiko"
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
                pg.{activePage}
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
        {
          <div>
            <div
              className={`overflow-hidden overflow-y-scroll  transition-all duration-300  rounded-lg ${
                isMobile
                  ? showToc
                    ? `h-[42vh] overflow-y-auto`
                    : "h-0 overflow-hidden -scale-y-0 p-0"
                  : "h-full overflow-y-auto"
              }`}
            >
              {showNotes ? (
                <NotesContainerMobile
                  notes={notes}
                  handleAddNote={() => {}}
                  handleDeleteNote={() => {}}
                  showNote={showNote}
                  handleShowNote={handleShowNote}
                />
              ) : (
                <TOCTree
                  data={toc}
                  active={activePage}
                  onSelect={handlePageChange}
                  showNotes={showNotes}
                />
              )}
            </div>
            {/* Action button for previous and next chapters */}
          </div>
        }
      </nav>
      {/* BOOK READER */}
      <main
        className={`h-full w-full flex flex-row items-center justify-center z-10 bg-[var(--color-bg-secondary)]`}
      >
        {/* PDF Viewer */}
        <div className="h-full w-full">
          <iframe
            className="w-[100%] h-[100%]"
            src="/temp/p1/Part_1:_Improving_over_basic_data_structures.html"
            title="Book Reader"
            style={{ border: "none", background: "var(--color-bg)" }}
            allowFullScreen
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
            <UserEditsMobile
              showToolkit={showToolkit}
              setShowToolkit={setShowToolkit}
              selectedTool={selectedTool}
              handleSetToolMobile={handleSetToolMobile}
              transformValue={transformValue}
            />
          )}
          {!isMobile && (
            <div className="h-full flex flex-col p-2 overflow-hidden ">
              {/* TOOLBOX */}
              <UserEdits
                selectedTool={selectedTool}
                handleSetTool={handleSetTool}
              />
              {/* Notes */}
              <NotesContainer
                notes={notes}
                handleAddNote={() => {}}
                handleDeleteNote={() => {}}
                showNote={showNote}
                handleShowNote={handleShowNote}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
