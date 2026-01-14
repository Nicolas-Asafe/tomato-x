import { deepFreeze } from "../../freeze/deepFreeze.freeze";
import { fail } from "./fail.entity";

export function fail(success_params:fail): fail{
    const finalFail:fail = {
        code:success_params.code,
        ok:false,
        details:success_params.details
    }
    deepFreeze(finalFail)
    return finalFail
}