import Type from "../../../models/type.js"

export default class GenericTypes {
    constructor() {
        this.map = {
            "generic:type_string": new Type(
                "string",
                "generic",
                () => import("./string.js")
            ),
            "generic:type_int": new Type(
                "int",
                "generic",
                () => import("./int.js")
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
