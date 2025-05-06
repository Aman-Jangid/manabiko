"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";
import { useLibrary } from "./hooks/useLibrary";
import DragDropZone from "@/components/upload/DragDropZone";
import BookPreview from "@/components/upload/BookPreview";
import { BookDocument } from "@/types/types";
import { useFileUpload } from "./hooks/upload/useFileUpload";
import { usePdfProcessing } from "./hooks/upload/usePdfProcessing";

export default function UploadArea({
  close = () => {},
  showClose = false,
}: {
  close?: () => void;
  showClose?: boolean;
}) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { addBook, books } = useLibrary();
  const { uploadFile } = useFileUpload();

  const {
    isProcessing,
    coverImage,
    metadata,
    enhancedChapters,
    error: processError,
    processOutline,
    setCoverImage,
  } = usePdfProcessing(uploadedFile);

  const handleProcess = async () => {
    await processOutline();
  };

  const handleCancel = () => {
    setUploadedFile(null);
  };

  // Add to Library handler
  const handleAddToLibrary = async () => {
    if (!metadata || !uploadedFile || !enhancedChapters) return;

    const { filePath, success } = await uploadFile(uploadedFile);
    if (!success) {
      alert("Failed to upload file");
      return;
    }

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

  const handleCoverChange = (newCover: string) => {
    setCoverImage(newCover);
  };

  const renderMetadataLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
      <div className="flex flex-row justify-center items-end gap-2 mb-6 mt-8">
        {[0, 100, 200, 300, 400].map((delay) => (
          <span
            key={delay}
            className="animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
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
        ))}
      </div>
      <div className="text-lg text-[var(--color-text-secondary)] font-light">
        Extracting Book Metadata
      </div>
    </div>
  );

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

        {!uploadedFile && <DragDropZone onFileSelect={setUploadedFile} />}

        {uploadedFile &&
          isProcessing &&
          metadata === null &&
          renderMetadataLoading()}

        {uploadedFile && metadata && (
          <BookPreview
            fileName={uploadedFile.name}
            coverImage={coverImage}
            metadata={metadata}
            isFetchingMetadata={isProcessing && !metadata}
            isEnhancing={isProcessing && metadata !== null}
            enhanceError={processError}
            enhancedChapters={enhancedChapters}
            onProcess={handleProcess}
            onCancel={handleCancel}
            onAddToLibrary={handleAddToLibrary}
            onCoverChange={handleCoverChange}
          />
        )}
      </div>
    </>
  );
}
