import type { baseEntity } from "../base/base.entity.js";

export interface routeEntity {
    method: string; 
    path: string;
    base: string;
    params: any;
    file_path:string,
    baseInstance:baseEntity
}