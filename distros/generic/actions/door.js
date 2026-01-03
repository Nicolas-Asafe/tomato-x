import Action from "../../../models/action.js"
export default class GenericActions {
    constructor() {
        this.map = {
            "generic:action_responsetxt": new Action(
                "responsetxt",
                "generic",
                () => import("./responsetxt.js")
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