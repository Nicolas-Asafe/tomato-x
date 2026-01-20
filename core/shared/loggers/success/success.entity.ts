import { codes } from "../../codes";
import { log } from "../log.logger";

export interface successEntity extends log{
    details?:any,
    code:codes
}