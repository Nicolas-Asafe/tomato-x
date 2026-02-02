import fs from "fs/promises";
export async function jsonRead(path) {
    try {
        const file = await fs.readFile(path, "utf-8");
        if (file.length == 0)
            throw new Error("json file is empty.");
        const json = JSON.parse(file);
        return json;
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`Error to read json: ${message}`);
    }
}
//# sourceMappingURL=json.read.js.map