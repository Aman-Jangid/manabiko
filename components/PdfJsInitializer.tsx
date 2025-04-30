"use client";

import { useEffect } from "react";
import isPdfJsSetup from "../utils/pdfjs-setup";

// This is a client component that ensures PDF.js is initialized
export default function PdfJsInitializer() {
  useEffect(() => {
    // Just importing the utility will trigger its side effects
    const isSetup = isPdfJsSetup();
    console.log(
      "PdfJsInitializer component mounted, PDF.js setup status:",
      isSetup
    );
  }, []);

  // This component doesn't render anything
  return null;
}
