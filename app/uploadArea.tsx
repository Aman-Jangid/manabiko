"use client";

import { UploadIcon } from "lucide-react";
import { useState } from "react";

export default function UploadArea() {
  const [dragActive, setDragActive] = useState(false);

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
      // Handle the files here
      console.log(e.dataTransfer.files);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] self-center h-min justify-items-center gap-6 text-white z-10">
      <div
        className={`relative max-w-2xl w-[38rem] aspect-[16/9] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 transition-colors ${
          dragActive ? "border-blue-400 bg-blue-950/20" : "border-gray-600"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-2 text-gray-300">
          <UploadIcon size={28} />
          <p className="text-center font-light">Drop file</p>
          <p className="text-center text-sm font-light opacity-80">or</p>
          <p className="text-center font-light">Select Manually</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 font-light">
        Maximum size: 25 MB, Format: PDF
      </p>
    </div>
  );
}
