CREATE TABLE "Chapter" (
    "id" SERIAL PRIMARY KEY,
    "documentId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "startPage" INTEGER NOT NULL,
    "endPage" INTEGER NOT NULL,
    "pdfPath" VARCHAR(512) NOT NULL,
    "htmlPath" VARCHAR(512) NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT NOW(),
    "updatedAt" TIMESTAMP(6) DEFAULT NOW(),
    CONSTRAINT "fk_chapter_document" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE
); 