import { boot } from "../tx/boot/boot.main";
async function app() {
    await boot(null)
}
app()