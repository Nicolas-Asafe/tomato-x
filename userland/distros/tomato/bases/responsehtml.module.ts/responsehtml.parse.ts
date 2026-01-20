import { TomatoEntitys, TomatoUtils } from "tomato-contracts";

export function ResponseHtmlParseBase(ctx:TomatoEntitys.Ctx){
    const params = ctx.route.params;

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