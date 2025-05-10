import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isGuest?: boolean;
      guestId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    isGuest?: boolean;
    guestId?: string;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isGuest?: boolean;
    guestId?: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET || "YOUR_SECRET_HERE_REPLACE_IN_PRODUCTION",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          // Create a guest user if no credentials provided
          const guestId = uuidv4();
          return {
            id: guestId,
            name: "Guest User",
            isGuest: true,
            guestId: guestId,
            email: null, // Explicitly set email to null for guest users
          };
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.username },
          });

          if (!user || !user.passwordhash) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.passwordhash
          );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            isGuest: false,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isGuest = user.isGuest;
        token.guestId = user.guestId;
        // Only include email if it exists (not a guest user)
        if (user.email) {
          token.email = user.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.isGuest = token.isGuest;
        session.user.guestId = token.guestId;
        // Only include email if it exists (not a guest user)
        if (token.email) {
          session.user.email = token.email;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
