// GET table of contents of a specific book

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET - Fetch a specific book's table of contents from the database
  if (req.method === "GET") {
    const { bookId } = req.query;
    try {
      const book = await prisma.document.findUnique({
        where: {
          id: typeof bookId === "string" ? parseInt(bookId, 10) : undefined,
        },
        select: {
          tableofcontents: true,
        },
      });
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      return res.status(200).json({
        toc: book.tableofcontents,
        message: "Database connection successful",
      });
    } catch (error) {
      console.error("Database connection failed:", error);
      return res.status(500).json({
        error: "Failed to connect to database",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
