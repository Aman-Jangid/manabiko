import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isGuest?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    isGuest?: boolean;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isGuest?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET || "YOUR_SECRET_HERE_REPLACE_IN_PRODUCTION",
  session: {
    // Use JWT strategy for sessions
    strategy: "jwt",
    // Make sessions expire after 30 days of inactivity
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.username },
          });

          if (!user) {
            return null;
          }

          // For guest users (those with emails starting with "guest-")
          // we don't check the password
          const isGuestUser = user.email.startsWith("guest-");

          if (isGuestUser) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              isGuest: true,
            };
          }

          // For regular users, we check the password
          if (!credentials.password || !user.passwordhash) {
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
    async jwt({ token, user, trigger, session }) {
      // When a user signs in, update the token with user data
      if (user) {
        // Replace the entire token with just the new user data and necessary JWT fields
        // This ensures a complete reset between different users
        const newToken = {
          // Preserve only necessary JWT fields
          sub: token.sub,
          iat: token.iat,
          exp: token.exp,
          jti: token.jti,

          // Set user data explicitly
          id: user.id,
          name: user.name,
          email: user.email,
          isGuest: user.isGuest === true, // Explicit boolean check
        };

        // For debugging
        console.log(
          `JWT update: User ${user.email} signed in, isGuest=${
            user.isGuest === true
          }`
        );

        return newToken;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        // If there's explicit session data, use it to update the token
        if (session.user) {
          // For debugging
          console.log(`JWT session update: isGuest=${session.user.isGuest}`);
          Object.assign(token, session.user);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Make sure session always has the latest from token
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name as string;
        session.user.isGuest = token.isGuest === true; // Explicit boolean check
        if (token.email) {
          session.user.email = token.email as string;
        }

        // For debugging
        console.log(
          `Session update: User ${session.user.email}, isGuest=${session.user.isGuest}`
        );
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
