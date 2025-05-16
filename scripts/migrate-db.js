#!/usr/bin/env node

/**
 * This script handles database migrations for different environments
 * Usage: node scripts/migrate-db.js
 */

import { execSync } from "child_process";

// This script is used by the build process in Vercel
// and can also be used locally for development

// Run the command and inherit stdout/stderr
console.log("Running database migrations...");

try {
  // Use Prisma migrate deploy for production to apply migrations
  execSync("npx prisma migrate deploy", { stdio: "inherit" });

  // Generate Prisma Client
  execSync("npx prisma generate", { stdio: "inherit" });

  console.log("✅ Database migrations completed successfully");
} catch (error) {
  console.error("❌ Database migration failed:", error.message);
  process.exit(1);
}
