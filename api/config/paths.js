/**
 * Path configuration for the Manabiko API
 * This centralizes path calculations for consistent path handling across the application
 */
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get current file's directory (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directories
const API_ROOT = path.resolve(__dirname, "..");
const PROJECT_ROOT = path.resolve(API_ROOT, "..");

// Docker volume mount points (these are the paths inside Docker containers)
const DOCKER_DATA_MOUNT = "/data";
const DOCKER_STATIC_MOUNT = "/app/static";

// Detect if running in Docker
const isDocker =
  process.env.DOCKER_ENV === "true" || fs.existsSync("/.dockerenv");

// Data directories - adjust based on environment
const dataDir = isDocker ? DOCKER_DATA_MOUNT : path.join(PROJECT_ROOT, "data");
const staticDir = isDocker
  ? DOCKER_STATIC_MOUNT
  : path.join(PROJECT_ROOT, "scripts", "static");

// Debug output for environment detection
console.log("Environment detection:");
console.log(`  - Docker environment: ${isDocker ? "Yes" : "No"}`);
console.log(`  - Data directory: ${dataDir}`);
console.log(`  - Static directory: ${staticDir}`);

/**
 * Translates a path for use with Docker volumes
 * @param {string} hostPath The path on the host filesystem or container path
 * @param {string} mountPoint The Docker volume mount point
 * @returns {string} Path relative to the Docker mount point
 */
function toDockerPath(hostPath, mountPoint = DOCKER_DATA_MOUNT) {
  // If we're already in Docker, use the path as is if it's under the mount point
  if (isDocker) {
    if (hostPath.startsWith(mountPoint)) {
      return hostPath;
    }

    // If it's a relative path to data, make it absolute to the mount point
    if (!path.isAbsolute(hostPath)) {
      return path.join(mountPoint, hostPath);
    }
  }

  // If not in Docker, translate host path to Docker path
  // Strip data dir prefix and append to mount point
  if (hostPath.startsWith(PROJECT_ROOT)) {
    const relativePath = path.relative(PROJECT_ROOT, hostPath);
    const segments = relativePath.split(path.sep);

    // If path includes /data/ folder, handle specially
    if (segments[0] === "data") {
      segments.shift(); // remove 'data'
      return path.join(mountPoint, ...segments);
    }
  }

  // Handle simple relative paths (e.g. just a filename)
  if (!path.isAbsolute(hostPath) && hostPath.indexOf(path.sep) === -1) {
    return path.join(mountPoint, hostPath);
  }

  // For other paths, warn but return a best guess
  console.warn(
    `Warning: Path ${hostPath} might not map correctly to Docker volumes`
  );
  return hostPath;
}

/**
 * Resolves a path that might be specified in different formats
 * @param {string} inputPath Path that might be specified as absolute, relative, or Docker path
 * @param {string} [subdir] Optional subdirectory within data dir if path is just an ID
 * @returns {string} Resolved absolute path on the host filesystem or in container
 */
function resolvePath(inputPath, subdir) {
  if (!inputPath) {
    throw new Error("Path cannot be empty");
  }

  // Log the input for debugging
  console.log(
    `Resolving path: '${inputPath}' with subdir: '${subdir || "none"}'`
  );

  // Case 1: Already Docker path in Docker environment
  if (isDocker && inputPath.startsWith(DOCKER_DATA_MOUNT + "/")) {
    console.log(`  - Using Docker path as is: ${inputPath}`);
    return inputPath;
  }

  // Case 2: Simple filename or relative path
  if (!path.isAbsolute(inputPath)) {
    const resolvedPath = subdir
      ? path.join(dataDir, subdir, inputPath)
      : path.join(dataDir, inputPath);
    console.log(`  - Resolved relative path to: ${resolvedPath}`);
    return resolvedPath;
  }

  // Case 3: Absolute path already in the correct data directory
  if (inputPath.startsWith(dataDir)) {
    console.log(`  - Using absolute path in data dir: ${inputPath}`);
    return inputPath;
  }

  // Case 4: External absolute path - check if it maps to our data area
  const dataDirParts = dataDir.split(path.sep).filter(Boolean);
  const inputPathParts = inputPath.split(path.sep).filter(Boolean);

  // Look for 'data' segment followed by 'input' or 'output' in the path
  let dataIndex = -1;
  for (let i = 0; i < inputPathParts.length - 1; i++) {
    if (
      inputPathParts[i] === "data" &&
      (inputPathParts[i + 1] === "input" || inputPathParts[i + 1] === "output")
    ) {
      dataIndex = i;
      break;
    }
  }

  if (dataIndex >= 0) {
    const pathFromData = inputPathParts.slice(dataIndex).join(path.sep);
    const mappedPath = path.join(dataDir, pathFromData);
    console.log(`  - Mapped external path to data dir: ${mappedPath}`);
    return mappedPath;
  }

  // Case 5: If subdir specified, assume it's a filename
  if (subdir) {
    const resolvedPath = path.join(dataDir, subdir, path.basename(inputPath));
    console.log(`  - Using basename with subdir: ${resolvedPath}`);
    return resolvedPath;
  }

  // Fallback - just use the path (but log warning)
  console.warn(
    `Warning: Path ${inputPath} is outside data directory and may not be accessible`
  );
  return inputPath;
}

/**
 * Create an output directory path from docId
 * @param {string} docId Document ID
 * @returns {string} Absolute path to output directory
 */
function resolveOutputDir(docId) {
  if (!docId) {
    throw new Error("Document ID cannot be empty");
  }

  const outputDir = path.join(dataDir, "output", docId);
  console.log(`Resolved output directory: ${outputDir}`);
  return outputDir;
}

export {
  API_ROOT,
  PROJECT_ROOT,
  dataDir,
  staticDir,
  toDockerPath,
  resolvePath,
  resolveOutputDir,
  DOCKER_DATA_MOUNT,
  DOCKER_STATIC_MOUNT,
  isDocker,
};
