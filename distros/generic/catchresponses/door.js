import Response from "../../../models/response.js"

export default class GenericCatchResponses {
    constructor() {
        this.map = {
            "generic:catch_responsetxt": new Response(
                "responsetxt",
                "generic",
                () => import("./CR_responsetxt.js")
            )
        }
    }

    get(name) {
        return this.map[name]
    }

    has(name) {
        return !!this.map[name]
    }
}