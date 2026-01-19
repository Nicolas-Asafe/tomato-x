import { deepFreeze } from "../../freeze/deepFreeze.freeze";
import { failEntity } from "./fail.entity";

export function fail(fail_params:failEntity): failEntity{
    const finalFail:failEntity = {
        code:fail_params.code,
        ok:false,
        details:fail_params.details
    }
    deepFreeze(finalFail)
    return finalFail
}