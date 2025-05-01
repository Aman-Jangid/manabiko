"use client";
import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import useResizeObserver from "@react-hook/resize-observer";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF.js worker
// Use the same version that's installed via react-pdf (4.8.69)
pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

type PDFViewerProps = {
  pdfUrl: string;
  onPageChange?: (page: number) => void;
};

export default function PDFViewer({ pdfUrl, onPageChange }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use the resize observer to update container width
  useResizeObserver(containerRef, (entry) => {
    const { width } = entry.contentRect;
    setContainerWidth(width);
  });

  // Initialize container width on mount
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  // Add effect to apply custom styling to text spans after render
  useEffect(() => {
    if (!isLoading) {
      // Give the PDF a moment to render
      const timer = setTimeout(() => {
        const textSpans = document.querySelectorAll(
          ".react-pdf__Page__textContent span"
        );
        textSpans.forEach((span) => {
          // Add space at the end of each text span if it doesn't end with space
          const spanElement = span as HTMLSpanElement;
          const text = spanElement.textContent || "";
          if (text && !text.endsWith(" ") && !text.endsWith("\n")) {
            spanElement.style.marginRight = "3px";
          }
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Track current visible page for navigation
  useEffect(() => {
    if (!scrollRef.current || !numPages) return;

    const handleScroll = () => {
      if (!scrollRef.current) return;

      const scrollContainer = scrollRef.current;

      // Find all page elements
      const pageElements = Array.from(
        document.querySelectorAll(".react-pdf__Page")
      );

      // Find the page that is most visible in the viewport
      let maxVisiblePage = 1;
      let maxVisibleArea = 0;

      pageElements.forEach((pageEl, index) => {
        const rect = pageEl.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();

        // Calculate the visible area of this page
        const top = Math.max(rect.top, containerRect.top);
        const bottom = Math.min(rect.bottom, containerRect.bottom);
        const visibleHeight = Math.max(0, bottom - top);

        // If this page has more visible area than the current max, update
        if (visibleHeight > maxVisibleArea) {
          maxVisibleArea = visibleHeight;
          maxVisiblePage = index + 1;
        }
      });

      if (maxVisiblePage !== currentPage) {
        setCurrentPage(maxVisiblePage);
        onPageChange?.(maxVisiblePage);
      }
    };

    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [numPages, currentPage, onPageChange]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    onPageChange?.(1);
  }

  return (
    <div
      ref={containerRef}
      className="pdf-container h-full w-full flex flex-col overflow-hidden"
      style={{ height: "100%", width: "100%" }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <p>Loading PDF...</p>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex-grow overflow-auto w-full h-full"
        style={{ height: "100%" }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
          loading={<p>Loading PDF document...</p>}
          className="pdf-document"
        >
          {numPages &&
            containerWidth > 0 &&
            Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                width={containerWidth}
                className="pdf-page"
              />
            ))}
        </Document>
      </div>

      <style jsx global>{`
        .react-pdf__Document {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .react-pdf__Page {
          margin: 0;
          padding: 0;
          box-shadow: none;
          border: none;
          position: relative;
          width: 100% !important;
        }
        .react-pdf__Page__textContent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          opacity: 1 !important;
          letter-spacing: -0.4px !important;
          word-spacing: 0.4em !important;
          z-index: 2;
        }
        .react-pdf__Page__textContent > span {
          color: transparent;
          cursor: text;
          line-height: 1;
          word-break: break-word;
          word-wrap: break-word;
          user-select: text;
          display: inline-block;
          transform-origin: 0% 0%;
          white-space: pre-wrap !important;
          padding: 0 1px;
          margin-right: 2px;
        }
        .react-pdf__Page__textContent ::selection {
          background: rgba(0, 0, 255, 0.3);
        }
        .react-pdf__Page__annotations {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .react-pdf__Page canvas {
          width: 100% !important;
          height: auto !important;
          display: block;
        }
      `}</style>
    </div>
  );
}
