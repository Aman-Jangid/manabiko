import { useState, useRef } from "react";
import { UploadIcon } from "lucide-react";
import { useResponsive } from "../../app/hooks/useResponsive";

interface DragDropZoneProps {
  onFileSelect: (file: File) => void;
}

export default function DragDropZone({ onFileSelect }: DragDropZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useResponsive();

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

    onFileSelect(file);
  };

  const handleManualSelect = () => {
    fileInputRef.current?.click();
  };

  if (isMobile) {
    return (
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
    );
  }

  return (
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
          <p className="text-center text-sm font-light opacity-80">or</p>
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
  );
}
