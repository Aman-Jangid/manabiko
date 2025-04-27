"use client";

import { UploadIcon } from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { initPdfWorker, processPdfFile } from "@/services/pdfProcessingService";
import Image from "next/image";
import { useRouter } from "next/navigation";

function EnhanceLoadingIndicator() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const estimate = elapsed < 60 ? "~30–60s" : ">1 min";

  return (
    <div className="flex flex-col items-center gap-0 text-blue-300 text-sm mb-2">
      <div className="flex items-center gap-2">
        <svg className="animate-spin h-6 w-6 text-blue-400" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Extracting chapters using AI...{" "}
      </div>
      <span className="ml-2 text-xs text-blue-200">
        (est. {estimate}, {elapsed}s elapsed)
      </span>
    </div>
  );
}

// Converts a TOCOutlineItem[] to a compact string with abbreviated keys
type TOCOutlineItem = {
  pageNumber: number;
  children?: TOCOutlineItem[];
  title?: string;
};
function outlineToCompactString(outline: TOCOutlineItem[]): string {
  function itemToString(item: TOCOutlineItem): string {
    const t = item.title || "";
    const p = item.pageNumber;
    const c =
      item.children && item.children.length > 0
        ? `,c:[${item.children.map(itemToString).join(";")}]`
        : "";
    return `t:${t},p:${p}${c}`;
  }
  return outline.map(itemToString).join(";\n");
}

export default function UploadArea() {
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
  type BookMetadata = {
    title?: string;
    author?: string;
    publisher?: string;
    year?: string | number;
    isbn?: string;
    description?: string;
    pages?: number;
  };
  const [metadata, setMetadata] = useState<BookMetadata | null>(null);
  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >({});
  const router = useRouter();

  // Initialize the PDF.js worker
  useEffect(() => {
    initPdfWorker();
  }, []);

  // Enhance TOC with LLM after tocPageText is set
  useEffect(() => {
    async function enhanceTOC() {
      if (tocPageText && tocPageText.length > 0) {
        setIsEnhancing(true);
        setEnhanceError(null);
        try {
          const res = await fetch("/api/enhance-toc", {
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
          const res = await fetch("/api/get-info", {
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

  // Only process after user confirms: fetch TOC from LLM using TOC page range
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
      const res = await fetch("/api/enhance-toc", {
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

              ...(hasChildren ? { background: "#3345" } : {}),
            }}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={18} className="mr-2 text-gray-300" />
              ) : (
                <ChevronRight size={18} className="mr-2 text-gray-300" />
              )
            ) : (
              <span
                style={{
                  width: 18,
                  display: "inline-block",
                }}
              />
            )}
            <span className="text-white">{item.title || item.c}</span>
            {item.p && (
              <span className="text-xs text-blue-300 ml-2">p.{item.p}</span>
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
  const addToLibrary = () => {
    if (!metadata || !uploadedFile || !enhancedChapters) return;
    const newBook = {
      id: Date.now().toString(),
      title: metadata.title || uploadedFile.name,
      author: metadata.author || "Unknown",
      coverImage,
      lastRead: "",
      progress: 0,
      fileName: uploadedFile.name,
      toc: enhancedChapters,
      metadata,
    };
    // Get current library
    let library = [];
    if (typeof window !== "undefined") {
      const libStr = localStorage.getItem("manabikoLibrary");
      if (libStr) {
        try {
          library = JSON.parse(libStr);
        } catch {}
      }
      // Add new book and save
      library.push(newBook);
      localStorage.setItem("manabikoLibrary", JSON.stringify(library));
      // Optionally, navigate to library page
      router.push("/")
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] self-center h-min justify-items-center gap-6 text-white z-10">
      {!uploadedFile ? (
        <>
          <div
            className={`relative max-w-2xl w-[38rem] aspect-[16/9] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 transition-colors hover:bg-blue-400/2 ${
              dragActive ? "border-blue-400 bg-blue-950/20" : "border-gray-600"
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
            <div className="flex flex-col items-center gap-2 text-gray-300">
              <UploadIcon size={28} />
              <p className="text-center font-light">Drop file</p>
              <p className="text-center text-sm font-light opacity-80">or</p>
              <p className="text-center font-light cursor-pointer">
                Select Manually
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400 font-light">
            Maximum size: 25 MB, Format: PDF
          </p>
        </>
      ) : isFetchingMetadata ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
          <div className="flex flex-row justify-center items-end gap-2 mb-6 mt-8">
            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="white"
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
                stroke="white"
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
                stroke="white"
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
                stroke="white"
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
                stroke="white"
                strokeWidth="2"
              >
                <circle cx="10" cy="10" r="8" />
              </svg>
            </span>
          </div>
          <div className="text-lg text-white font-light">
            Extracting Book Info
          </div>
        </div>
      ) : metadata ? (
        <div
          className="max-w-3xl w-full border-2 rounded-lg flex flex-col items-center  bg-blue-950/10 border-blue-400"
          style={{
            minWidth: "clamp(260px,40vw,600px)",
            padding: "2rem 1.5rem",
          }}
        >
          <div className="flex flex-col items-center gap-6 w-full ">
            <p className="text-center font-medium">{uploadedFile.name}</p>
            <div className="flex flex-row w-full items-start gap-8 mb-6 ">
              {coverImage && (
                <div className="w-36 h-50 rounded overflow-hidden relative">
                  <Image
                    src={coverImage}
                    alt="Book cover"
                    width={144}
                    height={200}
                    className="object-cover w-full h-full"
                    sizes="144px"
                  />
                </div>
              )}
              <div className="flex-1 space-y-2">
                {isFetchingMetadata && (
                  <div className="text-blue-300">Fetching metadata...</div>
                )}
                {metadata && !isFetchingMetadata && (
                  <div>
                    {metadata.title && (
                      <div className="text-lg font-semibold">
                        {metadata.title}
                      </div>
                    )}
                    {metadata.author && (
                      <div className="text-sm text-gray-400">
                        {metadata.author}
                      </div>
                    )}
                    {metadata.publisher && (
                      <div className="text-sm text-gray-400">
                        {metadata.publisher}
                      </div>
                    )}
                    {metadata.year && (
                      <div className="text-sm text-gray-400">
                        {metadata.year}
                      </div>
                    )}
                    {metadata.isbn && (
                      <div className="text-sm text-gray-400">
                        ISBN: {metadata.isbn}
                      </div>
                    )}
                    {metadata.pages && (
                      <div className="text-xs text-gray-500">
                        {metadata.pages} pages
                      </div>
                    )}
                    {metadata.description && (
                      <div className="text-xs text-gray-300 mt-2">
                        {metadata.description.length > 200
                          ? metadata.description.slice(0, 200) + "..."
                          : metadata.description}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Show extracted chapters after processing */}
            <div className="w-full flex flex-col items-start mt-4">
              {/* Action buttons below loading indicator and error */}
              <div className="self-end flex flex-row gap-6 z-50 mb-2">
                <div className="flex flex-col items-start self-center  h-10 mr-4">
                  {isEnhancing && <EnhanceLoadingIndicator />}
                  {enhanceError && (
                    <div className="text-red-400 text-xs mb-2">
                      {enhanceError}
                    </div>
                  )}
                </div>

                {!isEnhancing && !enhancedChapters && (
                  <button
                    className="px-6 py-2 border-2 border-blue-400 rounded-xl hover:bg-blue-400/30 transition-all text-base font-semibold text-blue-300 flex items-center gap-2"
                    onClick={handleProcess}
                    disabled={isEnhancing}
                  >
                    Extract contents
                  </button>
                )}
                {isEnhancing ? (
                  <button
                    className="px-6 py-2 border-2 border-red-400 rounded-xl hover:bg-red-400/30 transition-all text-base font-semibold text-red-300"
                    onClick={removeFile}
                  >
                    Cancel
                  </button>
                ) : (
                  <>
                    {enhancedChapters && enhancedChapters.length > 0 && (
                      <button
                        className="px-6 py-2 border-2 border-green-400 rounded-xl hover:bg-green-400/30 transition-all text-base font-semibold text-green-300"
                        onClick={addToLibrary}
                      >
                        Add to Library
                      </button>
                    )}
                    <button
                      className="px-6 py-2 border-2 border-red-400 rounded-xl hover:bg-red-400/30 transition-all text-base font-semibold text-red-300"
                      onClick={removeFile}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
              {enhancedChapters && enhancedChapters.length > 0 && (
                <>
                  <h3 className="text-md font-medium mb-2 text-left mt-8">
                    Extracted Table of Contents
                  </h3>
                  <div
                    className="w-full mx-auto overflow-y-auto items-start rounded "
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
  );
}
