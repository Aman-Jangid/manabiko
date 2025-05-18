import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Generate a unique email for the guest user
    const guestEmail = `guest-${uuidv4()}@manabiko.local`;

    // Create a new guest user in the database
    const guestUser = await prisma.user.create({
      data: {
        name: "Guest User",
        email: guestEmail,
        // No password needed for guest accounts
      },
    });

    return res.status(200).json({
      success: true,
      user: {
        id: guestUser.id.toString(),
        name: guestUser.name,
        email: guestUser.email,
        isGuest: true,
      },
    });
  } catch (error) {
    console.error("Error creating guest user:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create guest user",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
