import { codes } from "../../codes";
import { log } from "../log.logger";

export interface fail extends log{
    details?:any,
    code:codes
}