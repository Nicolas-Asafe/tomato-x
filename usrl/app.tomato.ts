import { boot } from "../core/boot/boot.main";

async function app(){
    await boot("teste")
}
app()