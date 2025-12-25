import express from "express"
export const init_api = (manifest = {port:null,author:"you"}) => {
    if (manifest.port === null) {throw new Error("Port not found in manifest")}
    const app = express()
    if (manifest.hello_route) app.get("/hello",(req,res)=>res.json({message:"hello!"}))
    app.listen(manifest.port, () => {
        console.log(
            manifest.running_message ? 
            manifest.author+"_messages:"+manifest.running_message 
            : "tomato_messages:server running in port." + manifest.port
        )
    })
    console.log("tomato_messages:api initialized successfully.")
}