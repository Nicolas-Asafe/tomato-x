import { boot } from "../tx/boot/boot.main.js";
async function app() {
    await boot(null as any)
}
app()