import fs from "fs/promises";

export async function jsonRead(path: string) {
  try {
    const file = await fs.readFile(path, "utf-8");
    const json = JSON.parse(file);
    return json;
  } catch {
    throw new Error(`Error to read json: ${path}`)
  }
}
