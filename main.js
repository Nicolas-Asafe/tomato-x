import { boot } from "./boot/boot.js";
import createProject from "./user/actions/create_project.js";

try {
    await createProject("testapi")
    await boot("testapi")
} catch (err) {
    console.error("[ERROR] Initialization failed:", err.message)
    process.exit(1)
}