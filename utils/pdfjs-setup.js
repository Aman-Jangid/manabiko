// This file is used to ensure PDF.js worker is properly initialized in Next.js

// This check is important for Next.js since it runs code on both server and client
if (typeof window !== "undefined") {
  // We're in the browser, so we can initialize PDF.js
  import("pdfjs-dist")
    .then((pdfjs) => {
      const workerSrc = `${window.location.origin}/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      console.log(
        "PDF.js worker initialized from utils/pdfjs-setup.js with path:",
        workerSrc
      );
    })
    .catch((error) => {
      console.error(
        "Failed to initialize PDF.js worker from utils/pdfjs-setup.js:",
        error
      );
    });
}

export default function isPdfJsSetup() {
  // Simple function to check if we're properly set up
  // This can be imported to ensure the side effects run
  return typeof window !== "undefined";
}
