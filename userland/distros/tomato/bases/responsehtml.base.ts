import {
  TomatoEntitys,
  TomatoDecorators,
  TomatoLoggers,
  TomatoBase
} from "tomato-contracts";
import { ResponseHtmlLogicBase } from "./responsehtml.module.ts/responsehtml.logic";
import { ResponseHtmlExecBase } from "./responsehtml.module.ts/responsehtml.exec";
import { ResponseHtmlParseBase } from "./responsehtml.module.ts/responsehtml.parse";

@TomatoDecorators.BaseDecorator("responsehtml.base")
export default class ResponseHtmlBase extends TomatoBase.BaseModelClass {
  constructor(public ctx: TomatoEntitys.Ctx) { super(ctx); }
  exec(): TomatoLoggers.SuccessEntity {
    return ResponseHtmlExecBase(
      this.ctx,
      () => { return this.parse() },
      () => { return this.logic() },
    )
  }
  logic(): TomatoLoggers.SuccessEntity { return ResponseHtmlLogicBase(this.ctx) }
  parse(): TomatoLoggers.SuccessEntity { return ResponseHtmlParseBase(this.ctx) }
}
