import Response from "../../../models/response.js"

export default class GenericParams {
    constructor() {
        this.map = {
            "generic:param_responsetxt": new Response(
                "responsetxt",
                "generic",
                () => import("./params_responsetxt.js")
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