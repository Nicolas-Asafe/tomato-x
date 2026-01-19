import { deepFreeze } from "../../freeze/deepFreeze.freeze";
import { successEntity } from "./success.entity";

export function success(success_params:successEntity): successEntity{
    const finalSucess:successEntity = {
        code:success_params.code,
        ok:true,
        details:success_params.details
    }
    deepFreeze(finalSucess)
    return finalSucess
}