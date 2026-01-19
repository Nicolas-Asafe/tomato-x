import { ctxEntity } from "../../../../core/boot/distros_tools/entitys/ctx.entity";
import { log } from "../../../../core/shared/loggers/log.logger";
import { Base } from "../../../../core/boot/distros_tools/decorators/base.decorator";
import { IBase } from "../../../../core/boot/distros_tools/interfaces/baseClass.interface";
import { codes } from "../../../../core/shared/codes";
import { key } from "../../../../core/shared/validator_keys/key.entity";
import { validatorKeys } from "../../../../core/shared/validator_keys/validator";
import { success } from "../../../../core/shared/loggers/logger";
import { successEntity } from "../../../../core/shared/loggers/success/success.entity";

@Base("tomato:base_responsehtml")
export default class ResponseHtmlBase implements IBase {
    constructor(public readonly ctx: ctxEntity = {} as ctxEntity) {}
    exec(): log | void {
        const parsed = this.parse();
        if (!parsed.ok) return parsed;
        const logic = this.logic();
        const html = logic.details?.html;
        this.ctx.res.send(html);
        return success({code:codes.BASE_EXECUTED,ok:true,details:{where:"tomato:base_responsehtml"}});
    }
    logic(): successEntity{
        let html = ``;
        html+=`<html>`;
        html+=`<head><title>${this.ctx.params.title}</title></head>`;
        html+=`<body>`;
        html+=`<h1>${this.ctx.params.heading}</h1>`;
        html+=`<p>${this.ctx.params.message}</p>`;
        html+=`<footer><p>${this.ctx.params.footer}</p></footer>`;
        html+=`</body>`
        html+=`</html>`;
        return success({details:{html: html},ok:true,code:codes.BASE_LOGIC_EXECUTED});
    }
    parse(): log {
        const params = this.ctx.params;
        const requiredKeys:key[] = [
            {name:"title",type:"string"},
            {name:"heading",type:"string"},
            {name:"message",type:"string"},
            {name:"footer",type:"string"}
        ];
        const valid = validatorKeys(params,requiredKeys,"TomatoBaseResponseHtml");
        return valid;
    }
}