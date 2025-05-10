import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// get progress of a user for a specific book
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET - Fetch a specific book's progress from the database
  if (req.method === "GET") {
    const { bookId } = req.query;
    try {
      const progress = await prisma.user.findMany({
        where: {
          Document: {
            some: {
              id: typeof bookId === "string" ? parseInt(bookId, 10) : undefined,
            },
          },
        },
      });
      if (!progress) {
        return res.status(404).json({ error: "Progress not found" });
      }
      return res.status(200).json({
        progress,
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
