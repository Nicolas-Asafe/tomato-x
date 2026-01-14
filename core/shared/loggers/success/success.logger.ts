import { deepFreeze } from "../../freeze/deepFreeze.freeze";
import { success } from "./success.entity";

export function success(success_params:success): success{
    const finalSucess:success = {
        code:success_params.code,
        ok:true,
        details:success_params.details
    }
    deepFreeze(finalSucess)
    return finalSucess
}