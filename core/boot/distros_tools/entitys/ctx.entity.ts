import * as Express from "express";
import { manifestEntity} from "../../loader/manifest/manifest.entity";
export interface ctxEntity {
    req: Express.Request;
    res: Express.Response;
    params: any;
    manifest: manifestEntity;
}