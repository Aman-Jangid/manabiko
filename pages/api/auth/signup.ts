import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const {email,password,name} = req.body;
    const rUser = {
      email: `random${Date.now()}@test.com`,
      passwordhash: "randompassword",
      name: "Random User",
    };

    const user = await prisma.user.create({
      data: {
        ...rUser,
      },
    });

    return res.status(200).json({
      user,
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({
      error: "Failed to create user",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
