import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { username, email, password, guestUserId } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user with email already exists (and is not a guest)
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && !existingUser.email.startsWith("guest-")) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;

    // If a guest user ID was provided, try to upgrade that account
    if (guestUserId) {
      const guestUser = await prisma.user.findUnique({
        where: { id: parseInt(guestUserId) },
      });

      if (guestUser && guestUser.email.startsWith("guest-")) {
        // Update the guest user with the new information
        newUser = await prisma.user.update({
          where: { id: guestUser.id },
          data: {
            name: username,
            email: email,
            passwordhash: hashedPassword,
          },
        });

        // Here you would also migrate any user data from the guest account
        // Such as reading progress, preferences, etc.
      }
    }

    // If we didn't update a guest user (either no ID provided or guest not found),
    // create a new user
    if (!newUser) {
      newUser = await prisma.user.create({
        data: {
          name: username,
          email,
          passwordhash: hashedPassword,
        },
      });
    }

    // Return success but don't include password hash
    return res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdat,
        wasGuest: guestUserId ? true : false,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
}
