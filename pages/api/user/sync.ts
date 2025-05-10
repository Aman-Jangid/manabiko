import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check if the user is authenticated
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Ensure the user is not a guest
    if (session.user.id.startsWith("guest-")) {
      return res.status(403).json({
        error:
          "Guest users cannot sync data. Please sign in with a registered account.",
      });
    }

    // Get user data from the request body
    const { guestUserId, userData } = req.body;

    if (!guestUserId || !userData) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // In a real implementation, here you would:
    // 1. Validate the data
    // 2. Store the data in your database, associated with the authenticated user
    // 3. Merge any existing data if needed

    // For this example, we'll just simulate a successful response
    // with a small delay to mimic database operations
    await new Promise((resolve) => setTimeout(resolve, 500));

    return res.status(200).json({
      success: true,
      message: "Data synchronized successfully",
      userId: session.user.id,
    });
  } catch (error) {
    console.error("Error syncing user data:", error);
    return res.status(500).json({ error: "Failed to sync data" });
  }
}
