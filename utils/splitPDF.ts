import { PDFDocument } from "pdf-lib";

async function fetchPDFData(pdfUrl: string): Promise<ArrayBuffer> {
  const response = await fetch(pdfUrl);
  if (!response.ok) throw new Error("Failed to fetch PDF");
  return await response.arrayBuffer();
}

async function splitPDFPages(
  pdfDoc: PDFDocument,
  maxPages: number
): Promise<Blob[]> {
  const splitPages: Blob[] = [];
  for (let i = 0; i < maxPages; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);
    const pdfBytes = await newPdf.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    splitPages.push(pdfBlob);
  }
  return splitPages;
}

// Split PDF into individual page files and return them as an array of blobs
async function splitPDF(pdfUrl: string): Promise<Blob[]> {
  try {
    const pdfArrayBuffer = await fetchPDFData(pdfUrl);
    const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
    const totalPages = pdfDoc.getPageCount();
    const maxPagesToScan = totalPages > 40 ? 40 : totalPages;
    return await splitPDFPages(pdfDoc, maxPagesToScan);
  } catch (error) {
    console.error("Error splitting PDF:", error);
    throw error;
  }
}

export default splitPDF;
