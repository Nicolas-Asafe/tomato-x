import { codes } from "../../../shared/codes";

export function Base(name: string) {
    return function (constructor: any) {
       constructor.prototype.name = name;
       constructor.prototype.exec = function(): void {
           this.ctx.log.add("Executing base: " + this.name, codes.BASE_EXECUTED);
       }
    }
}
