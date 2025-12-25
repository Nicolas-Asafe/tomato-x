import {readFileSync} from "fs"
export const readJSON = (path)=>{
    const content = readFileSync(path,"utf-8")
    return JSON.parse(content)
}