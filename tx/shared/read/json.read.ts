import fs from "fs/promises";

export async function jsonRead(path: string) {
  try {
    const file = await fs.readFile(path, "utf-8");
    if (file.length == 0) throw new Error("json file is empty.")
    const json = JSON.parse(file);
    return json;
  } catch(err) {
    throw new Error(`Error to read json: ${err.message}`)
  }
}
