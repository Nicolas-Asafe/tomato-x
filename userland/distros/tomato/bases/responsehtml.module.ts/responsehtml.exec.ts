import { TomatoBaseReturns, TomatoEntitys, TomatoLoggers, TomatoUtils } from "tomato-contracts";

export function ResponseHtmlExecBase(ctx: TomatoEntitys.Ctx,parse:Function,logic:Function) {
    const parsed = parse();
    if (!parsed.ok) {
        ctx.res.status(400).json(parsed);
        const details: TomatoBaseReturns.Error = {
            error: parsed.details.error.message,
            where: "ResponseHtmlBase"
        };
        return TomatoLoggers.failLogger({
            code: TomatoUtils.Codes.BASE_ERROR,
            ok: false,
            details
        });
    }
    
    const logicRun = logic();
    const html = logicRun.details?.html;
    ctx.res.send(html);

    const details: TomatoBaseReturns.Success = {
        where: "tomato:responsehtml.base",
        message: "Base tomato:responsehtml.base executed successfully"
    };
    return TomatoLoggers.successLogger({
        code: TomatoUtils.Codes.BASE_EXECUTED,
        ok: true,
        details
    });
}