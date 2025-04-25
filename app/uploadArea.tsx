"use client";

import { UploadIcon, XIcon, BookIcon, FileText, InfoIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BookInfo, TOCItem } from "@/utils/BookTypes";
import { initPdfWorker, processPdfFile } from "@/services/pdfProcessingService";
import {
  fetchBookDataByISBN,
  enrichBookInfoWithOpenLibraryData,
  shouldFetchCover,
} from "@/services/openLibraryService";

interface OpenLibraryData {
  title?: string;
  authors?: { name: string }[];
  publish_date?: string;
  cover_i?: number;
  cover_url?: string;
  description?: string;
}

export default function UploadArea() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [splitPages, setSplitPages] = useState<Blob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
  const [openLibraryData, setOpenLibraryData] =
    useState<OpenLibraryData | null>(null);
  const [isLoadingExtraData, setIsLoadingExtraData] = useState(false);
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
    setSplitPages([]);
    setBookInfo(null);
    setOpenLibraryData(null);
  };

  const processFile = async () => {
    if (!uploadedFile) return;

    try {
      setIsProcessing(true);

      // Process the PDF file using the service
      const { bookInfo: info, splitPages: pages } = await processPdfFile(
        uploadedFile
      );

      // Update state with the processed data
      setBookInfo(info);
      setSplitPages(pages);

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
      setIsLoadingExtraData(true);

      // Use the OpenLibrary service to fetch data
      const olData = await fetchBookDataByISBN(isbn);

      if (olData) {
        setOpenLibraryData(olData);

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
    } finally {
      setIsLoadingExtraData(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setSplitPages([]);
    setBookInfo(null);
    setOpenLibraryData(null);
  };

  const downloadPage = (pageBlob: Blob, index: number) => {
    const url = URL.createObjectURL(pageBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `page_${index + 1}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log(`Downloaded page ${index + 1}`);
  };

  const handleManualSelect = () => {
    fileInputRef.current?.click();
  };

  // Helper to render table of contents
  const renderTOC = (items: TOCItem[] | undefined) => {
    if (!items || items.length === 0)
      return (
        <p className="text-gray-400 text-sm">No table of contents found</p>
      );

    return (
      <div className="max-h-[150px] overflow-y-auto">
        <ul className="text-sm">
          {items.map((item, index) => (
            <li
              key={index}
              className="py-1"
              style={{ marginLeft: `${item.level * 16}px` }}
            >
              <span className="font-medium">{item.title}</span>
              <span className="text-gray-400 ml-2">p.{item.pageNumber}</span>
            </li>
          ))}
        </ul>
      </div>
    );
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
      ) : (
        <div className="max-w-3xl w-full border-2 rounded-lg flex flex-col items-center p-8 bg-blue-950/10 border-blue-400">
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-center font-medium">{uploadedFile.name}</p>

            {bookInfo ? (
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Book info section */}
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    {/* Display cover image in order of priority */}
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
                    <div className="flex-1">
                      <h2 className="text-lg font-medium">{bookInfo.title}</h2>
                      <p className="text-gray-400">{bookInfo.author}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {bookInfo.pages} pages
                      </p>

                      {bookInfo.isbn && (
                        <div className="flex items-center mt-2 gap-2">
                          <p className="text-sm text-gray-500">
                            ISBN: {bookInfo.isbn}
                          </p>
                          {/* Only show "More info" button if we don't have OpenLibrary data yet */}
                          {!openLibraryData && !isLoadingExtraData && (
                            <button
                              onClick={() => fetchExtraBookData(bookInfo.isbn!)}
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs"
                              title="Fetch additional book data"
                            >
                              <InfoIcon size={12} />
                              <span>More info</span>
                            </button>
                          )}
                          {isLoadingExtraData && (
                            <span className="text-xs text-gray-500">
                              Loading...
                            </span>
                          )}
                        </div>
                      )}

                      {openLibraryData?.publish_date && (
                        <p className="text-sm text-gray-500 mt-1">
                          Published: {openLibraryData.publish_date}
                        </p>
                      )}
                    </div>
                  </div>

                  {openLibraryData?.description && (
                    <div className="mt-1">
                      <h3 className="text-md font-medium mb-1">Description</h3>
                      <p className="text-sm text-gray-300 max-h-24 overflow-y-auto">
                        {openLibraryData.description}
                      </p>
                    </div>
                  )}

                  {bookInfo.tableOfContents &&
                    bookInfo.tableOfContents.length > 0 && (
                      <div className="mt-1">
                        <h3 className="text-md font-medium mb-2">
                          Table of Contents
                        </h3>
                        {renderTOC(bookInfo.tableOfContents)}
                      </div>
                    )}
                </div>

                {/* Pages section */}
                <div>
                  <h3 className="text-md font-medium mb-3">Individual Pages</h3>
                  <div className="max-h-[250px] overflow-y-auto grid grid-cols-3 gap-3">
                    {splitPages.map((page, index) => (
                      <button
                        key={index}
                        onClick={() => downloadPage(page, index)}
                        className="p-3 border border-blue-400 rounded hover:bg-blue-400/20 transition-all text-sm flex items-center justify-center gap-2"
                      >
                        <FileText size={14} />
                        <span>Page {index + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="mt-4 px-4 py-2 border-2 border-red-400 rounded-md hover:bg-red-400/30 hover:border-dashed transition-all w-32"
                  onClick={removeFile}
                >
                  Remove
                </button>
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
