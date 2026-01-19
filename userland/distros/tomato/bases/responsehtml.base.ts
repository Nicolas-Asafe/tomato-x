import { ctxEntity } from "../../../../core/boot/distros_tools/entitys/ctx.entity";
import { log } from "../../../../core/shared/loggers/log.logger";
import { Base } from "../../../../core/boot/distros_tools/decorators/base.decorator";
import { IBase } from "../../../../core/boot/distros_tools/interfaces/baseClass.interface";
import { success } from "../../../../core/shared/loggers/success/success.entity";
import { codes } from "../../../../core/shared/codes";
import { key } from "../../../../core/shared/validator_keys/key.entity";
import { validatorKeys } from "../../../../core/shared/validator_keys/validator";

@Base("tomato:base_responsehtml")
export default class ResponseHtmlBase implements IBase {
    constructor(public readonly ctx: ctxEntity = {} as ctxEntity) {}
    exec(): log | void {
        const parsed = this.parse();
        if (!parsed.ok) return parsed;
        const logic = this.logic();
        const html = logic.details.html;
        this.ctx.res.send(html);
        return {code:codes.BASE_EXECUTED,details:{where:"tomato:base_responsehtml"}} as success;
    }
    logic(): success {
        let html = ``;
        html+=`<html>`;
        html+=`<head><title>${this.ctx.params.title}</title></head>`;
        html+=`<body>`;
        html+=`<h1>${this.ctx.params.heading}</h1>`;
        html+=`<p>${this.ctx.params.message}</p>`;
        html+=`<footer><p>${this.ctx.params.footer}</p></footer>`;
        html+=`</body>`
        html+=`</html>`;
        return {details:{html: html}} as success;
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