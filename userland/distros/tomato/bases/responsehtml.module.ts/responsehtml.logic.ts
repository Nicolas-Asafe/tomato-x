import { TomatoEntitys, TomatoLoggers, TomatoUtils } from "tomato-contracts";

export function ResponseHtmlLogicBase(ctx:TomatoEntitys.Ctx) {
    let html = ``;
    html += `<html>`;
    html += `<head><title>${ctx.route.params.title}</title></head>`;
    html += `<body>`;
    html += `<h1>${ctx.route.params.heading}</h1>`;
    html += `<p>${ctx.route.params.message}</p>`;
    html += `<footer><p>${ctx.route.params.footer}</p></footer>`;
    html += `</body>`;
    html += `</html>`;

    return TomatoLoggers.successLogger({
        details: { html },
        ok: true,
        code: TomatoUtils.Codes.BASE_LOGIC_EXECUTED
    });
}