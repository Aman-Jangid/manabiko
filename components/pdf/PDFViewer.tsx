"use client";
import { useEffect, useRef } from "react";

import PdfJsInitializer from "../PdfJsInitializer";

type PDFViewerProps = {
  pdfUrl: string;
  onPageChange?: (page: number) => void;
};

export default function PDFViewer({ pdfUrl, onPageChange }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPdf = async () => {
      const pdfjsLib = await import("pdfjs-dist");
      const workerSrc = `${window.location.origin}/pdf.worker.min.js`;
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      // Removed setNumPages as numPages is no longer used

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        canvas.dataset.pageNumber = String(pageNum);
        const context = canvas.getContext("2d");

        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.marginBottom = "0px";
        canvas.style.objectFit = "cover";
        canvas.style.width = "100%";
        canvas.style.height = "auto";

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        containerRef.current?.appendChild(canvas);
      }
    };
    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const canvases = Array.from(
        container.querySelectorAll("canvas")
      ) as HTMLCanvasElement[];
      let closestPage = 1;
      let minOffset = Infinity;

      canvases.forEach((canvas) => {
        const rect = canvas.getBoundingClientRect();
        const offset = Math.abs(rect.top - window.innerHeight / 2);
        if (offset < minOffset) {
          minOffset = offset;
          closestPage = Number(canvas.dataset.pageNumber);
        }
      });
      onPageChange?.(closestPage);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [onPageChange]);

  return (
    <>
      <PdfJsInitializer />

      <div ref={containerRef} className="overflow-y-auto h-screen space-y-4 " />
    </>
  );
}
