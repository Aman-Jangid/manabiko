"use client";

import { UploadIcon, XIcon, BookIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BookInfo, TOCItem } from "@/utils/BookTypes";
import { initPdfWorker, processPdfFile } from "@/services/pdfProcessingService";
import {
  fetchBookDataByISBN,
  enrichBookInfoWithOpenLibraryData,
  shouldFetchCover,
} from "@/services/openLibraryService";

export default function UploadArea() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize the PDF.js worker
  useEffect(() => {
    initPdfWorker();
  }, []);

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

    console.log(`File uploaded: ${file.name}, size: ${file.size} bytes`);
    setUploadedFile(file);
    // Reset split pages and book info when uploading a new file
    setBookInfo(null);
  };

  const processFile = async () => {
    if (!uploadedFile) return;

    try {
      setIsProcessing(true);

      // Process the PDF file using the service
      const { bookInfo: info } = await processPdfFile(uploadedFile);

      // Update state with the processed data
      setBookInfo(info);

      // Auto-fetch additional data if ISBN is available and we need more data
      if (
        info.isbn &&
        // Fetch if we're missing critical info or cover
        (info.title === "Untitled" ||
          info.author === "Unknown Author" ||
          !info.description ||
          shouldFetchCover(info))
      ) {
        console.log(
          "Auto-fetching OpenLibrary data to supplement local extraction"
        );
        fetchExtraBookData(info.isbn);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Failed to process PDF file");
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchExtraBookData = async (isbn: string) => {
    try {
      // Use the OpenLibrary service to fetch data
      const olData = await fetchBookDataByISBN(isbn);

      if (olData) {
        // Update book metadata with the fetched data if original data was incomplete
        if (bookInfo) {
          const updatedInfo = enrichBookInfoWithOpenLibraryData(
            bookInfo,
            olData
          );
          setBookInfo(updatedInfo);
        }
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setBookInfo(null);
  };

  const handleManualSelect = () => {
    fileInputRef.current?.click();
  };

  // Helper to filter out only true extras and flatten TOC to top-level chapters
  function filterChapters(items: TOCItem[]): TOCItem[] {
    return items.filter((item) => {
      if (item.level !== 0 || item.title.length <= 2) return false;
      // Normalize: remove all leading whitespace, non-breaking spaces, and '&#160;' entities, then lowercase
      const normalized = item.title
        .replace(/^(?:\s|\u00A0|&#160;)+/gu, "")
        .replace(/&#160;/g, "")
        .trim()
        .toLowerCase();
      // Only include if it looks like a chapter (e.g., starts with 'chapter' or a number + dot/space)
      if (/^(chapter\s*\d+|\d+\.|\d+\s)/.test(normalized)) return true;
      return false;
    });
  }

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
      ) : (
        <div className="max-w-3xl w-full border-2 rounded-lg flex flex-col items-center p-8 bg-blue-950/10 border-blue-400">
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-center font-medium">{uploadedFile.name}</p>

            {bookInfo ? (
              <div className="w-full flex flex-col items-center gap-8">
                {/* Book cover and info */}
                <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-center">
                  {/* Book cover */}
                  {bookInfo.coverImagePath ? (
                    <div className="w-32 h-40 rounded overflow-hidden relative">
                      <Image
                        src={bookInfo.coverImagePath}
                        alt="Book cover"
                        fill
                        sizes="128px"
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                  ) : bookInfo.externalCoverUrl ? (
                    <div className="w-32 h-40 rounded overflow-hidden relative">
                      <Image
                        src={bookInfo.externalCoverUrl}
                        alt="Book cover"
                        fill
                        sizes="128px"
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-40 bg-gray-800 rounded flex items-center justify-center">
                      <BookIcon size={48} className="text-gray-600" />
                    </div>
                  )}
                  {/* Book info */}
                  <div className="flex-1 flex flex-col gap-2 items-center md:items-start">
                    <h2 className="text-lg font-medium">{bookInfo.title}</h2>
                    <p className="text-gray-400">{bookInfo.author}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {bookInfo.pages} pages
                    </p>
                    {bookInfo.isbn && (
                      <p className="text-sm text-gray-500">
                        ISBN: {bookInfo.isbn}
                      </p>
                    )}
                    {bookInfo.description && (
                      <div className="mt-1 max-w-xs">
                        <h3 className="text-md font-medium mb-1">
                          Description
                        </h3>
                        <p className="text-sm text-gray-300 max-h-24 overflow-y-auto">
                          {bookInfo.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main chapters as compact pill boxes, only top-level (level 0) */}
                <div className="w-full flex flex-col items-start mt-4">
                  <h3 className="text-md font-medium mb-2 text-left">
                    Extracted Chapters
                  </h3>
                  <div
                    className="w-full mx-auto flex flex-col gap-2 overflow-y-auto items-start"
                    style={{ maxHeight: "180px" }}
                  >
                    {bookInfo.tableOfContents &&
                      filterChapters(bookInfo.tableOfContents).map(
                        (item, index) => (
                          <div
                            key={index}
                            className="inline-block border border-blue-400 bg-blue-900/40 text-white text-xs font-medium rounded-full px-4 py-1 shadow-sm whitespace-nowrap text-center"
                            style={{
                              minWidth: "60px",
                              maxWidth: "90%",
                              margin: 0,
                            }}
                          >
                            {item.title}
                          </div>
                        )
                      )}
                  </div>
                </div>

                {/* Action buttons: Add to Library and Cancel */}
                <div className="w-full flex flex-row justify-center gap-6 mt-8">
                  <button
                    className="px-6 py-2 border-2 border-green-400 rounded-full hover:bg-green-400/30 transition-all text-base font-semibold text-green-300"
                    onClick={() => alert("Add to library logic goes here!")}
                  >
                    Add to Library
                  </button>
                  <button
                    className="px-6 py-2 border-2 border-red-400 rounded-full hover:bg-red-400/30 transition-all text-base font-semibold text-red-300"
                    onClick={removeFile}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 border-2 border-blue-600 rounded-md hover:bg-blue-600/30 hover:border-dashed transition-all flex items-center gap-2"
                  onClick={processFile}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Process File"}
                </button>
                <button
                  className="px-4 py-2 border-2 border-red-400 rounded-md hover:bg-red-400/30 hover:border-dashed transition-all"
                  onClick={removeFile}
                  disabled={isProcessing}
                >
                  <XIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
