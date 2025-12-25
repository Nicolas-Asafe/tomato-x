import { boot } from "./boot/boot.js";

try {
    boot()
}catch(err){
    console.error(err)
}