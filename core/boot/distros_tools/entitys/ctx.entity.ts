import * as Express from "express";
import { manifest } from "../../loader/manifest/manifest.entity";
export interface ctxEntity {
    req: Express.Request;
    res: Express.Response;
    params: object;
    manifest: manifest;
}