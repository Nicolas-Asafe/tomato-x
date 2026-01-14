import { codes } from "../../codes";
import { log } from "../log.logger";

export interface success extends log{
    details?:any,
    code:codes
}