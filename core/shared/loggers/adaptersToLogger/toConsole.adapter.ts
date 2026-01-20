import { log } from "../log.logger";

export function toConsole(entry:log,where:string,message?:string){
    let finalText = `[CODE:${entry.code}][WHERE:${where}]`
    if(message) finalText += ` ${message}` 
    entry.ok ? console.log(finalText) : console.error(finalText)
}