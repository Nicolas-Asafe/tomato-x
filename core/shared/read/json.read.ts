import fs from "fs/promises";
import { success, fail } from "../loggers/logger";
import { codes } from "../codes";

export async function jsonRead(path: string) {
  try {
    const file = await fs.readFile(path, "utf-8");

    const json = JSON.parse(file);

    return success({
      code: codes.JSON_READ_SUCCESS,
      ok: true,
      details: { json }
    });

  } catch (err) {
    return fail({
      code: codes.JSON_READ_ERROR,
      ok: false,
      details: { error: err }
    });
  }
}
