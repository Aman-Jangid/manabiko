"use client";

import { UploadIcon, XIcon } from "lucide-react";
import { useState, useRef } from "react";

export default function UploadArea() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const fileUrl = URL.createObjectURL(file);
    console.log("File URL for preview:", fileUrl);
  };

  const handleManualSelect = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setUploadedFile(null);
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
        <div className="max-w-2xl w-[38rem] aspect-[16/9] border-2 rounded-lg flex flex-col items-center justify-center p-8 bg-blue-950/10 border-blue-400">
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-center font-medium">{uploadedFile.name}</p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 border-2 border-blue-600 rounded-md hover:bg-blue-600/30 hover:border-dashed transition-all"
                onClick={() => console.log("Process file:", uploadedFile)}
              >
                Process File
              </button>
              <button
                className="px-4 py-2 border-2 border-red-400 rounded-md hover:bg-red-400/30 hover:border-dashed transition-all"
                onClick={removeFile}
              >
                <XIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
