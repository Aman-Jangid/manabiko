import { PDFDocument } from "pdf-lib";

// Split PDF into individual page files and return them as an array of blobs
async function splitPDF(pdfUrl: string): Promise<Blob[]> {
  try {
    // Fetch the PDF data
    const response = await fetch(pdfUrl);
    if (!response.ok) throw new Error("Failed to fetch PDF");

    const pdfArrayBuffer = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
    const totalPages = pdfDoc.getPageCount();

    const splitPages: Blob[] = [];

    const maxPagesToScan = totalPages > 40 ? 40 : totalPages;
    // Process each page
    for (let i = 0; i < maxPagesToScan; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      splitPages.push(pdfBlob);
    }

    return splitPages;
  } catch (error) {
    console.error("Error splitting PDF:", error);
    throw error;
  }
}

export default splitPDF;
