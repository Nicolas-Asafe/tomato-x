import {
  TomatoEntitys,
  TomatoDecorators,
  TomatoUtils,
  TomatoLoggers,
  TomatoBaseReturns,
  TomatoBase
} from "tomato-contracts";

@TomatoDecorators.BaseDecorator("responsehtml.base")
export default class ResponseHtmlBase extends TomatoBase.BaseModelClass {
  constructor(public ctx: TomatoEntitys.Ctx) {
    super(ctx);
  }

  exec(): TomatoLoggers.SuccessEntity {
    const parsed = this.parse();

    if (!parsed.ok) {
      this.ctx.res.status(400).json(parsed);

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

    const logic = this.logic();
    const html = logic.details?.html;

    this.ctx.res.send(html);

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

  logic(): TomatoLoggers.SuccessEntity {
    let html = ``;
    html += `<html>`;
    html += `<head><title>${this.ctx.route.params.title}</title></head>`;
    html += `<body>`;
    html += `<h1>${this.ctx.route.params.heading}</h1>`;
    html += `<p>${this.ctx.route.params.message}</p>`;
    html += `<footer><p>${this.ctx.route.params.footer}</p></footer>`;
    html += `</body>`;
    html += `</html>`;

    return TomatoLoggers.successLogger({
      details: { html },
      ok: true,
      code: TomatoUtils.Codes.BASE_LOGIC_EXECUTED
    });
  }

  parse(): TomatoLoggers.SuccessEntity {
    const params = this.ctx.route.params;

    const requiredKeys: TomatoUtils.Key[] = [
      { name: "title", type: "string" },
      { name: "heading", type: "string" },
      { name: "message", type: "string" },
      { name: "footer", type: "string" }
    ];

    return TomatoUtils.ValidatorKeys(
      requiredKeys,
      params,
      "TomatoBaseResponseHtml"
    );
  }
}
