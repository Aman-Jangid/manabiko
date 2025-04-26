// This file is used to ensure PDF.js worker is properly initialized in Next.js

export function setupPdfJsWorker(pdfjs) {
  if (typeof window !== "undefined") {
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      const workerSrc = `${window.location.origin}/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      // Optionally log for debugging
      // console.log("PDF.js worker initialized from utils/pdfjs-setup.js with path:", workerSrc);
    }
  }
}

export default function isPdfJsSetup() {
  // Simple function to check if we're properly set up
  // This can be imported to ensure the side effects run
  return typeof window !== "undefined";
}
