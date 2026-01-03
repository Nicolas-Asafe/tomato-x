import Response from "../../../models/response.js"

export default class GenericResponses {
    constructor() {
        this.map = {
            "generic:response_responsetxt": new Response(
                "responsetxt",
                "generic",
                () => import("./response_responsetxt.js")
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