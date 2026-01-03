/**
 * Read JSON: Reads and parses JSON files from the file system.
 * This utility function asynchronously reads a file at a given path and parses
 * it as JSON. Used throughout the framework to load configuration files like
 * manifest.json and route index.json files that define application behavior.
 */

import fs from "fs/promises"

export const readJSON = async (path) => {
  const content = await fs.readFile(path, "utf-8")
  return JSON.parse(content)
}