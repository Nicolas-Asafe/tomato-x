import fs from "fs/promises";
export async function verifyDistro(path, distroname) {
    try {
        await fs.access(path);
    }
    catch (err) {
        throw new Error(`the distro ${distroname} not found`);
    }
}
//# sourceMappingURL=verifyDistro.util.js.map