import { codes } from "../../codes";
import { log } from "../log.logger";

export interface failEntity extends log {
    details?:any,
    code:codes
}