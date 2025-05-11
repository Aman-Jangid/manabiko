import crypto from "crypto";

/**
 * Calculates a SHA-256 hash of a file's contents
 * @param file The file to hash
 * @returns Promise<string> A hex-encoded SHA-256 hash
 */
export async function calculateFileHash(file: File | Buffer): Promise<string> {
  // Convert file to buffer if it's a File object
  const buffer = Buffer.isBuffer(file)
    ? file
    : Buffer.from(await file.arrayBuffer());

  // Create hash object
  const hash = crypto.createHash("sha256");

  // Update hash with file contents
  hash.update(buffer);

  // Get hex digest
  return hash.digest("hex");
}
