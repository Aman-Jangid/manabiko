"use client";

import { Redo, RefreshCcw, Undo, UploadIcon, XIcon } from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { initPdfWorker, processPdfFile } from "@/services/pdfProcessingService";
import Image from "next/image";
import { useLibrary } from "./hooks/useLibrary";
import { setOLCover } from "@/services/openLibraryService";
import { Chapter } from "@/types/types";
import { useResponsive } from "./hooks/useResponsive";

function EnhanceLoadingIndicator() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (elapsed > 200) {
    const err = new Error("Extracting is taking too long.");
    err.name = "AITimeoutError";
    throw err;
  }

  return (
    <div className="flex items-start gap-2 text-[var(--color-accent)] text-sm h-10  rounded-lg px-2 py-1 relative">
      <svg
        className="animate-spin h-8 w-8 text-[var(--color-accent)]/80"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="opacity-25"
        />
        <path
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          fill="currentColor"
          className="opacity-75"
        />
      </svg>
      <span>
        Processing with AI
        <span className="absolute min-w-fit max-w-40 bottom-1 right-2 text-[11px] text-[var(--color-text-secondary)]">
          (est ~60s, {elapsed}s elapsed)
        </span>
      </span>
    </div>
  );
}

type TOCOutlineItem = {
  pageNumber: number;
  children?: TOCOutlineItem[];
  title?: string;
};

export type BookDocument = {
  title: string;
  author: string;
  isbn: string;
  description: string;
  coverUrl: string;
  filePath: string;
  fileHash: string;
  uploadedById: string;
  tableOfContents: Chapter[];
  progress: number;
  lastOpened: Date;
};

// traverses only the first level of children
function outlineToCompactString(
  outline: TOCOutlineItem[],
  maxDepth = 2
): string {
  function itemToString(item: TOCOutlineItem, depth: number): string {
    const t = item.title || "";
    const p = item.pageNumber;
    let c = "";

    if (item.children && item.children.length > 0 && depth < maxDepth) {
      c = `,c:[${item.children
        .map((child) => itemToString(child, depth + 1))
        .join(";")}]`;
    }

    return `t:${t},p:${p}${c}`;
  }

  return outline.map((item) => itemToString(item, 1)).join(";\n");
}

export default function UploadArea({
  close = () => {},
  showClose = false,
}: {
  close?: () => void;
  showClose?: boolean;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState<string | null>(null);
  type Chapter = { title: string; level?: number };
  const [enhancedChapters, setEnhancedChapters] = useState<Chapter[] | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tocPageText, setTocPageText] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [fetchingCover, setFetchingCover] = useState(false);
  const [prevCover, setPrevCover] = useState<string | null>(null);
  const [newCover, setNewCover] = useState<string | null>(null);
  const [currentCoverState, setCurrentCoverState] = useState<
    "original" | "new" | null
  >(null);

  type BookMetadata = {
    title?: string;
    author?: string;
    publisher?: string;
    year?: string | number;
    isbn?: string;
    description?: string;
    pages?: number;
    fileName: string; // Ensure fileName is required
  };
  const [metadata, setMetadata] = useState<BookMetadata | null>(null);
  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >({});
  const { addBook, books } = useLibrary();

  // Responsive: detect mobile
  const { isMobile } = useResponsive();

  // Initialize the PDF.js worker
  useEffect(() => {
    initPdfWorker();
    if (showClose) {
      history.pushState(null, "", location.href);
      window.onpopstate = () => {
        close();
      };
      return () => {
        window.onpopstate = null;
      };
    }
  }, [close, showClose]);

  // Enhance TOC with LLM after tocPageText is set
  useEffect(() => {
    async function enhanceTOC() {
      if (tocPageText && tocPageText.length > 0) {
        setIsEnhancing(true);
        setEnhanceError(null);
        try {
          const res = await fetch("/api/ai/extract/toc", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rawText: tocPageText }),
          });
          if (!res.ok) throw new Error(await res.text());
          const data = await res.json();
          setEnhancedChapters(data.chapters);
        } catch {
          setEnhanceError("Failed to enhance chapters. No chapters available.");
          setEnhancedChapters(null);
        } finally {
          setIsEnhancing(false);
        }
      } else {
        setEnhancedChapters(null);
      }
    }
    enhanceTOC();
  }, [tocPageText]);

  // After upload, extract cover, outline, and metadata (from pages 2 to tocStart-1)
  useEffect(() => {
    async function preview() {
      if (!uploadedFile) return;
      setIsFetchingMetadata(true);
      try {
        const { coverImagePath, outline, getTextForPageRange } =
          await processPdfFile(uploadedFile);
        setPrevCover(coverImagePath || null);
        setCoverImage(coverImagePath || null);
        // Find TOC start page
        const { min: tocStart } = getTOCPageRange(outline);
        // Extract raw text from pages 2 to (tocStart-1)
        let infoText =
          tocStart > 2 ? await getTextForPageRange(2, tocStart - 1) : "";
        if (!infoText || infoText.trim().length === 0) {
          // Fallback: scan first 5 pages for any text
          infoText = await getTextForPageRange(1, 5);
        }
        // Truncate to ~500 words (about 3000 characters) for LLM
        if (infoText.length > 3000) {
          infoText = infoText.slice(0, 3000);
        }
        // Always log what will be sent to the LLM for metadata extraction
        console.log("Metadata extraction text sent to LLM:", infoText);
        // Fetch metadata from LLM
        let metadata = null;
        if (infoText && infoText.length > 0) {
          const res = await fetch("/api/ai/extract/info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rawText: infoText }),
          });
          if (res.ok) {
            const data = await res.json();
            metadata = data.info;
          }
        }
        setMetadata(metadata);
        // Save outline and getTextForPageRange for later use
        (window as { _manabikoOutline?: TOCOutlineItem[] })._manabikoOutline =
          outline;
        (
          window as {
            _manabikoGetTextForPageRange?: (
              start: number,
              end: number
            ) => Promise<string>;
          }
        )._manabikoGetTextForPageRange = getTextForPageRange;
      } catch {
        setEnhanceError("Failed to preview PDF file");
        setCoverImage(null);
        setMetadata(null);
      } finally {
        setIsFetchingMetadata(false);
      }
    }
    preview();
  }, [uploadedFile]);

  // Helper to extract a page range from the outline
  function getTOCPageRange(outline: TOCOutlineItem[]): {
    min: number;
    max: number;
  } {
    const flatPages = outline.flatMap(function flatten(
      item: TOCOutlineItem
    ): number[] {
      return [item.pageNumber].concat(
        item.children ? item.children.flatMap(flatten) : []
      );
    });
    const minPage = Math.min(...flatPages);
    const maxPage = Math.max(...flatPages);
    return { min: minPage, max: maxPage };
  }

  const handleProcess = async () => {
    setIsEnhancing(true);
    setEnhancedChapters(null);
    try {
      const outline = (window as { _manabikoOutline?: TOCOutlineItem[] })
        ._manabikoOutline;
      if (!outline) throw new Error("Missing outline");
      // Convert outline to compact string
      const compactOutline = outlineToCompactString(outline);
      // Log the string that will be sent to the LLM
      console.log("TOC outline string to be sent to LLM:", compactOutline);
      // Send to LLM for enhancement
      const res = await fetch("/api/ai/extract/toc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: compactOutline }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setEnhancedChapters(data.chapters);
    } catch {
      setEnhanceError("Failed to process PDF file");
      setTocPageText(null);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    // Check file size (25MB = 26214400 bytes)
    if (file.size > 26214400) {
      alert("File size exceeds 25MB limit");
      return;
    }

    setUploadedFile(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleManualSelect = () => {
    fileInputRef.current?.click();
  };

  // Recursively render chapters and their children/topics
  type EnhancedChapter = {
    title?: string;
    c?: string;
    p?: number | string;
    t?: EnhancedChapter[];
    topics?: EnhancedChapter[];
    children?: EnhancedChapter[];
  };

  function toggleChapter(key: string) {
    setExpandedChapters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function getSubChapters(item: EnhancedChapter) {
    return item.t || item.topics || item.children || [];
  }

  function renderChapters(
    chapters: EnhancedChapter[],
    level = 0,
    parentKey = ""
  ) {
    return chapters.map((item, idx) => {
      const key = parentKey + (item.title || item.c || "") + idx;
      const subChapters = getSubChapters(item);
      const hasChildren = subChapters.length > 0;
      const isExpanded = expandedChapters[key] || false;

      return (
        <div key={key} style={{ marginLeft: level * 16, marginBottom: 4 }}>
          <div
            className="flex items-center rounded-lg px-2 hover:bg-blend-darken py-1 cursor-pointer"
            onClick={() => hasChildren && toggleChapter(key)}
            style={{
              minHeight: 30,
              userSelect: "none",
              fontWeight: 500,
              fontSize: "1rem",

              ...(hasChildren ? { background: "var(--color-surface)" } : {}),
            }}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={18} className="mr-2 text-gray-500" />
              ) : (
                <ChevronRight size={18} className="mr-2 text-gray-500" />
              )
            ) : (
              <span
                style={{
                  width: 18,
                  display: "inline-block",
                }}
              />
            )}
            <span className="text-[var(--color-text-secondary)]">
              {item.title || item.c}
            </span>
            {item.p && (
              <span className="text-xs text-blue-500 ml-2">p.{item.p}</span>
            )}
          </div>
          {hasChildren && isExpanded && (
            <div>{renderChapters(subChapters, level + 1, key)}</div>
          )}
        </div>
      );
    });
  }

  // Reset chapters when a new file is uploaded
  useEffect(() => {
    setEnhancedChapters(null);
  }, [uploadedFile]);

  // Add to Library handler
  const addToLibrary = async () => {
    if (!metadata || !uploadedFile || !enhancedChapters) return;

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("filename", uploadedFile.name);
    const res = await fetch("/api/file/upload", {
      method: "POST",
      body: formData,
    });

    const { filePath } = await res.json();
    console.log("File was uploaded to:", filePath);

    const newBook: BookDocument = {
      title: metadata.title || uploadedFile.name,
      author: metadata.author || "Unknown",
      isbn: metadata.isbn || "",
      coverUrl: coverImage || "",
      lastOpened: new Date(),
      progress: 0,
      filePath: filePath,
      tableOfContents: enhancedChapters,
      description: metadata.description || "",
      fileHash: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      uploadedById: crypto.randomUUID(),
    };
    // Check for duplicates
    const duplicate = books.find((book) => book.fileName === newBook.filePath);
    if (duplicate) {
      alert("Book already exists in library");
      close();
      return;
    }
    await addBook(newBook);
    close();
  };

  const getNewCover = async () => {
    if (fetchingCover) return;
    setFetchingCover(true);
    try {
      if (metadata && metadata.isbn) {
        const newCover = await setOLCover(metadata.isbn);
        if (newCover) {
          console.log("New cover fetched:", newCover);
          // download the new cover image
          const file = await fetch("/api/file/download", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: newCover }),
          });

          const newCoverUrl = URL.createObjectURL(await file.blob());

          console.log("New cover URL:", newCoverUrl);

          setNewCover(newCoverUrl); // Save the new cover URL
          setPrevCover(coverImage); // Save the current cover as the previous one
          setCoverImage(newCover); // Set the new cover
          setNewCover(newCover); // Save the new cover
          setCurrentCoverState("new"); // Update the state to reflect the new cover
        }
      }
    } catch (error) {
      console.error("Failed to fetch new cover:", error);
    } finally {
      setFetchingCover(false);
    }
  };

  const switchCover = () => {
    if (currentCoverState === "new") {
      setCoverImage(prevCover); // Switch back to the previous cover
      setCurrentCoverState("original"); // Update the state to reflect the original cover
    } else {
      setCoverImage(newCover); // Switch to the new cover
      setCurrentCoverState("new"); // Update the state to reflect the new cover
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-8 grid grid-rows-[auto_1fr_auto] self-center h-min justify-items-center gap-6 text-white z-10 relative">
        {showClose && !uploadedFile && (
          <div className="absolute -top-10 right-[12.4%] z-50">
            <button
              className="flex gap-2 align-middle items-center-safe border-dashed rounded-xl px-4 border-2 p-2 opacity-60 hover:opacity-100 transition-all duration-200 hover:bg-[var(--color-accent-secondary)]/10 text-[var(--color-accent-secondary)] border-[var(--color-accent-secondary)]"
              onClick={close}
              aria-label="Close"
            >
              Close <XIcon size={20} />
            </button>
          </div>
        )}
        {!uploadedFile ? (
          <>
            {isMobile ? (
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="w-[80%]">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <button
                    className="w-full sm:w-auto px-6 py-4 border-2 border-[var(--color-accent)]/80 rounded-xl bg-[var(--color-bg-secondary)]/40 hover:bg-[var(--color-accent)]/10 transition-all text-base font-semibold text-[var(--color-accent)]/80 flex items-center justify-center gap-2"
                    onClick={handleManualSelect}
                  >
                    <UploadIcon size={24} /> Select PDF Manually
                  </button>
                </div>
                <p
                  className="text-sm text-gray-400 font-light mt-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Maximum size: 25 MB, Format: PDF
                </p>
              </div>
            ) : (
              <>
                <div
                  className={`relative w-full max-w-2xl aspect-[16/9] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 transition-colors hover:bg-[var(--color-bg-secondary)]/20 ${
                    dragActive
                      ? "border-[var(--color-accent)]/60 bg-[var(--color-bg-secondary)]/20"
                      : "border-[var(--color-border)] "
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleManualSelect}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <div
                    className="flex flex-col items-center gap-2"
                    style={{
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <UploadIcon size={28} />
                    <p className="text-center font-light">Drop file</p>
                    <p className="text-center text-sm font-light opacity-80">
                      or
                    </p>
                    <p className="text-center font-light cursor-pointer">
                      Select Manually
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm text-gray-400 font-light"
                  style={{
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Maximum size: 25 MB, Format: PDF
                </p>
              </>
            )}
          </>
        ) : isFetchingMetadata ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
            <div className="flex flex-row justify-center items-end gap-2 mb-6 mt-8">
              <span
                className="animate-bounce"
                style={{ animationDelay: "0ms" }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--color-muted)"
                  strokeWidth="2"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "100ms" }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--color-muted)"
                  strokeWidth="2"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "200ms" }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--color-muted)"
                  strokeWidth="2"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "300ms" }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--color-muted)"
                  strokeWidth="2"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "400ms" }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--color-muted)"
                  strokeWidth="2"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>
              </span>
            </div>
            <div className="text-lg text-[var(--color-text-secondary)] font-light">
              Extracting Book Metadata
            </div>
          </div>
        ) : metadata ? (
          <div
            className="max-w-3xl max-h-[80vh] overflow-hidden w-full border-2 rounded-lg flex flex-col items-center  bg-blue-950/10 border-blue-400"
            style={{
              minWidth:
                Math.max(260, Math.min(window.innerWidth * 0.4, 600)) + "px",
              maxWidth: "98%",
              padding: "1rem 0.75rem",
            }}
          >
            <div className="flex flex-col items-center gap-8 w-[98%] ">
              <p className="text-center text-sm font-medium text-[var(--color-text-secondary)]">
                {uploadedFile.name}
              </p>
              <div className="flex flex-row w-full items-start gap-4 mb-6 ml-4">
                {coverImage && (
                  <div className="w-36 h-50 rounded relative">
                    <Image
                      src={coverImage}
                      alt="Book cover"
                      width={144}
                      height={200}
                      className="object-cover w-full h-full rounded"
                      sizes="144px"
                    />
                    {metadata && metadata.isbn ? (
                      <button
                        className="absolute bottom-0 -right-10 rounded-xl p-1 border-2 border-[var(--color-accent-quaternary)]/80 transition-all duration-200 hover:bg-[var(--color-accent-quaternary)]/20"
                        title="get cover from OpenLibrary"
                        onClick={newCover ? switchCover : getNewCover}
                        disabled={fetchingCover}
                      >
                        {fetchingCover && !newCover ? (
                          <RefreshCcw
                            size={16}
                            className="animate-spin text-[var(--color-accent-quaternary)]"
                          />
                        ) : currentCoverState === "new" && prevCover ? (
                          <Undo size={16} />
                        ) : currentCoverState === "original" && newCover ? (
                          <Redo size={16} />
                        ) : (
                          <RefreshCcw
                            size={16}
                            className="text-[var(--color-accent-quaternary)]"
                          />
                        )}
                      </button>
                    ) : null}
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  {isFetchingMetadata && (
                    <div className="text-blue-300">Fetching metadata...</div>
                  )}
                  {metadata && !isFetchingMetadata && (
                    <div>
                      {metadata.title && (
                        <div className="text-xl font-semibold text-[var(--color-text)]">
                          {metadata.title}
                        </div>
                      )}
                      {metadata.author && (
                        <div className="text-sm text-[var(--color-text-secondary)]">
                          {metadata.author}
                        </div>
                      )}
                      {metadata.publisher && (
                        <div className="text-sm text-[var(--color-text-secondary)]">
                          {metadata.publisher}
                        </div>
                      )}
                      {metadata.year && (
                        <div className="text-sm text-[var(--color-text-secondary)]">
                          {metadata.year}
                        </div>
                      )}
                      {metadata.isbn && (
                        <div className="text-sm text-[var(--color-text-secondary)]">
                          ISBN: {metadata.isbn}
                        </div>
                      )}
                      {metadata.pages && (
                        <div className="text-xs text-[var(--color-text-secondary)]">
                          {metadata.pages} pages
                        </div>
                      )}
                      {metadata.description && (
                        <div
                          className="text-xs text-[var(--color-text-secondary)] mt-2"
                          title={metadata.description}
                        >
                          {metadata.description.length > 50
                            ? metadata.description.slice(
                                0,
                                isMobile ? 20 : 100
                              ) + "..."
                            : metadata.description}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Show extracted chapters after processing */}
              <div className="w-full flex flex-col items-start mt-0">
                {/* Action buttons below loading indicator and error */}
                <div className="self-end  flex flex-row gap-4 z-50 mb-2 max-h-12 min-w-fit sm:max-h-14">
                  <div className="flex flex-col items-start self-center h-10  rounded-lg px-2 py-1">
                    {isEnhancing && <EnhanceLoadingIndicator />}
                    {enhanceError && (
                      <div className="text-red-400 text-xs mb-2">
                        {enhanceError}
                      </div>
                    )}
                  </div>

                  {!isEnhancing && !enhancedChapters && (
                    <button
                      className="px-6 py-1.5 border-2 border-[var(--color-accent)]/80 rounded-xl hover:bg-[var(--color-accent)]/20 transition-all text-base font-semibold text-[var(--color-accent)]/80 flex items-center gap-2"
                      onClick={handleProcess}
                      disabled={isEnhancing}
                    >
                      Process
                    </button>
                  )}
                  {isEnhancing ? (
                    <button
                      className="px-6 py-1.5 border-2 border-[var(--color-accent-secondary)]/60 rounded-xl hover:bg-[var(--color-accent-secondary)]/20 transition-all text-base font-semibold text-[var(--color-accent-secondary)]/60 flex items-center gap-2"
                      onClick={removeFile}
                    >
                      Cancel
                    </button>
                  ) : (
                    <>
                      {enhancedChapters && enhancedChapters.length > 0 && (
                        <button
                          className="px-6 py-1.5 border-2  border-[var(--color-accent-quaternary)] rounded-xl hover:bg-[var(--color-accent-quaternary)]/30 transition-all text-base font-semibold text-[var(--color-accent-quaternary)]"
                          onClick={addToLibrary}
                        >
                          Add to Library
                        </button>
                      )}
                      <button
                        className="px-6 py-1.5 border-2 border-[var(--color-accent-secondary)]/60 rounded-xl hover:bg-[var(--color-accent-secondary)]/20 transition-all text-base font-semibold text-[var(--color-accent-secondary)]/60 flex items-center gap-2"
                        onClick={removeFile}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
                {enhancedChapters && enhancedChapters.length > 0 && (
                  <>
                    <h3 className="text-md font-medium mb-2 text-left mt-8 text-[var(--color-text)]">
                      Extracted Table of Contents
                    </h3>
                    <div
                      className="w-full mx-auto overflow-y-scroll h-40 sm:h-60 items-start rounded "
                      style={{ maxHeight: "220px" }}
                    >
                      {renderChapters(enhancedChapters)}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
