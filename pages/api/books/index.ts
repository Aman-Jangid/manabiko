import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// GET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET - Fetch all books from the database
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      console.log("Fetching books from the database...");
      const books = await prisma.document.findMany({
        where: {
          uploadedbyid: parseInt(session.user.id),
        },
        orderBy: {
          createdat: "desc",
        },
      });
      console.log("Books found:", books.length);

      return res.status(200).json({
        success: true,
        books,
        message: "Database connection successful",
      });
    } catch (error) {
      console.error("Database connection failed:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to connect to database",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST - Store a new book in the database
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { bookData } = req.body;

      if (!bookData) {
        return res.status(400).json({ error: "Missing book data." });
      }

      const existingBook = await prisma.document.findUnique({
        where: { isbn: bookData.isbn },
      });

      if (existingBook) {
        return res.status(409).json({
          success: false,
          error: "A book with this ISBN already exists.",
        });
      }

      const book = await prisma.document.create({
        data: {
          title: bookData.title,
          author: bookData.author,
          isbn: bookData.isbn,
          description: bookData.description,
          coverurl: bookData.coverurl,
          filepath: bookData.filepath,
          filehash: bookData.filehash,
          uploadedbyid: parseInt(session.user.id),
          tableofcontents: bookData.tableofcontents,
          progress: bookData.progress,
          lastopened: bookData.lastopened
            ? new Date(bookData.lastopened)
            : null,
        },
      });

      console.log("Book created:", book);

      if (!book) {
        return res.status(500).json({ error: "Failed to create book." });
      }

      return res.status(201).json({
        success: true,
        book,
        message: "Book added successfully.",
      });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({
        success: false,
        error: "Database error",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}
